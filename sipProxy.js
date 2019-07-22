
var EventEmitter = require('events');
const SipMessage = require('drachtio-sip').SipMessage ;
const logger = require('./logger');
const util = require('./myUtil');
const url = require('url');
var fs = require('fs')
var ini = require('ini')
var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'))


/** UDP SIP PROXY SERVER */
module.exports = class SipProxy extends EventEmitter{
    /// udp 메시지 수신 -> message 이벤트 -> proc_recv -> proc_application (rtpengine_client) -> proc_done 실행.
    
    constructor(server, application){ 
        super();
        this.server = server;
        this.application = application;
        /** UDP Listener*/
        this.udpEvent = ['listening', 'message', 'error']
        this.udpEvent.forEach((event) => {
            this.on(event, this.__proto__[event + '_Handler']);
            server.on(event, (...args) => {
                this.emit(event, ...args);
            })
        });
    }
    start(port){
        this.server.bind(port);
    }
    

    proc_recv(sipMsg, rinfo){
        return new Promise((resolve, reject) => {
            var name = sipMsg.method != null ? sipMsg.method : sipMsg.reason;
            if(name == undefined ){
                console.log('undefined name');
                return reject(sipMsg.raw);
            }
            if(name == 'Request terminated'){
                console.log(name);
            }
            name += ` Of { ${sipMsg.headers['cseq']} } `
            if(sipMsg.method == 'PUBLISH') reject('[PUBLISH] Ignored PUBLISH ');
            
            console.log(`[Recv]${name}===============================`);
            logger.info(`[Recv][${name}] ======== ${rinfo.address}:${rinfo.port} =========== \n${sipMsg.toString()}==============================================\n`);
            return resolve(sipMsg);
        })
    }
    proc_application(sipMsg){
        return new Promise(async (resolve, reject) => {
            
            var event = this.getNameOfSipMsg(sipMsg);
            if(typeof this.application.events[event] === 'function'){
                var SipOfApp = await this.application.events[event](sipMsg)
                .catch((err) => {
                    return reject('[RTPENCLINT_CLINT_ERR] .. ' + err );
                });
                
                return resolve(SipOfApp);
            }
            return resolve(sipMsg);
        })
    }
    proc_done(sipMsg, rinfo){
        return new Promise(async (resolve, reject) => {
                            
            if(sipMsg.type == 'request'){
                sipMsg = util.addReceivedTopVia(sipMsg);
                if(sipMsg.method == 'INVITE' || sipMsg.method == 'CANCEL'){
                    if(sipMsg.has('route') == true && sipMsg.getParsedHeader('route').length == 2){
                        sipMsg.headers['route'] = sipMsg.headers['route'].split(',')[1];
                        sipMsg.headers['route'] = sipMsg.headers['route'].replace('orig', 'term');
                    }
                }
                if(sipMsg.method == 'INVITE'){
                    // console.log('record..route..');
                    // var curRoute = sipMsg.headers['record-route'].replace('<', '').replace('>', '')
                    // sipMsg.headers['record-route'] = 'SIP/2.0/UDP 192.168.0.166:5060;lr' + ',' + curRoute;
                }
            }
            else if(sipMsg.type == 'response'){
                sipMsg = util.removeTopVia(sipMsg);
            }
            
            /** proxy route */
            var sendAddress = {};
            if (sipMsg.type == 'request') {
                var sendUrl = '';
                sendUrl = sipMsg.uri;
                sendAddress = url.parse(sendUrl);
            }
            else if (sipMsg.type == 'response') {
                sendAddress['hostname'] = sipMsg.getParsedHeader('via')[0].host
                sendAddress['port'] = sipMsg.getParsedHeader('via')[0].port
            }
            /**  send */
            if(sendAddress.port == null) sendAddress.port = 5060;
            var name = sipMsg.method != null ? sipMsg.method : sipMsg.reason;
            logger.info(`[Send][${name}] ======== ${rinfo.address}:${rinfo.port} =========== \n${sipMsg.toString}==============================================\n`);

            var finmsg = '';
            if(sipMsg.method == 'INVITE'){
                finmsg = sipMsg.toString();
                var rr = 'record-route: <sip:auser@192.168.0.166:5060;lr>' + '\r\n' + finmsg.match(/Record-Route: .*/gi)[0];
                finmsg = finmsg.replace(finmsg.match(/Record-Route: .*/gi)[0], rr);
            }
            else{
                finmsg = sipMsg.toString();
            }
            this.server.send(finmsg, sendAddress.port , sendAddress.hostname, async (err) => {
                if(err) return rejecct(err);
                console.log(`[Send] ${name} to ${rinfo.address}:${rinfo.port}`);
                if (sipMsg.type == 'request'){
                    if(sipMsg.method == 'INVITE'){
                        return await this.sendResponse( rinfo, '100 Trying', sipMsg);                
                    }
                    if(sipMsg.method == 'CANCEL'){
                        return await this.sendResponse( rinfo, '200 OK', sipMsg);                
                    }
                }
            });
        })
    }
    

    async message_Handler(msg , rinfo){
        var data = msg.toString('utf-8');
        var sipMsg = new SipMessage(data);
        var name = sipMsg.method != null ? sipMsg.method : sipMsg.reason;
        if(name == undefined && msg.toString('utf-8') == '\r\n\r\n'){
            return;
        }
        if(name == undefined ){
            console.log('undefined name');
        }
        try {
            sipMsg = await this.proc_recv(sipMsg, rinfo) // 받은 후 실행
            sipMsg = await this.proc_application(sipMsg) // App 이벤트 있는경우 실행
            var result = await this.proc_done(sipMsg, rinfo); // 보내기 전 실행
            console.log(result);
        }
        catch(err){
            console.log(err);
        }
    }


    sendResponse(rinfo, code_method, sipMsg) {
        new Promise((resolve, reject) => {
            //200 OK
            //100 Trying
            var msg = `SIP/2.0 ${code_method}\r\n`;
            var v = sipMsg.getParsedHeader('via')
            if (v[0].host == config.ip) {
                var vias = sipMsg.headers['via'].split(',')
                msg += 'Via: ' + sipMsg.headers['via'].replace(`${vias[0]},`, '') + `\r\n`

            }
            else {
                msg += sipMsg.headers['via'] != null ? `Via: ${sipMsg.headers['via']}\r\n` : ''
            }

            msg += sipMsg.headers['to'] != null ? `To: ${sipMsg.headers['to']}\r\n` : ''
            msg += sipMsg.headers['from'] != null ? `From: ${sipMsg.headers['from']}\r\n` : ''
            msg += sipMsg.headers['call-id'] != null ? `Call-ID: ${sipMsg.headers['call-id']}\r\n` : ''
            msg += sipMsg.headers['cseq'] != null ? `CSeq: ${sipMsg.headers['cseq']}\r\n` : ''
            msg += `Content-Length: 0\r\n`
            msg += `\r\n`

            var name = code_method
            logger.info(`[Send][${name}] ======== ${rinfo.address}:${rinfo.port} =========== \n${sipMsg.raw}==============================================\n`);
            this.server.send(msg, rinfo.port, rinfo.address, (err) => {
                if (err) console.log('send err = ' + err);
                else console.log(`[Send] response ${name}`);
                return resolve();//응답 실패시? 성공시? 등등...
            })
        })
    }
    



    sendProxy(sock, rinfo, sipMsg, isAck){
        sipMsg.raw = sipMsg.raw.replace(/Via:.*\r\n/, "");
       /** proxy route */
       var sendAddress = '';
       if (sipMsg.type == 'request') {
           var sendUrl = '';
           sendUrl = sipMsg.uri;
           sendAddress = url.parse(sendUrl);
       }
       else if (sipMsg.type == 'response') {
           var sendUrl = '';
           sendUrl = sipMsg.headers['from'].match(util.findUrl);
           sendAddress = url.parse(sendUrl[0].replace('<', "").replace('>', ""));
       }
       /**  send */
       if(sendAddress.port == null) sendAddress.port = 5060;
       var name = sipMsg.method != null ? sipMsg.method : sipMsg.reason;
       logger.info(`[Send][${name}] ======== ${rinfo.address}:${rinfo.port} =========== \n${sipMsg.raw}==============================================\n`);
       sock.send(sipMsg.raw, sendAddress.port , sendAddress.hostname, (err) => {
           if(err) console.log('send err = ' + err);
           else if(sipMsg.type == 'request' && sipMsg.method == 'INVITE') sendResponse(server, rinfo, 100, originalSipMsg);
       });
    }

    listening_Handler(){
        const address = this.server.address();
        console.log(`server listening ${address.address}:${address.port}`);
    }
    error_Handler(err){
        console.log(`server error:\n${err.stack}`);
        server.close();
    }
    getNameOfSipMsg(sipMsg){
        var name = sipMsg.method;
        if(name == null) name = sipMsg.reason;
        if(typeof name == 'string') return name.toUpperCase();
        return name;
    }
}




