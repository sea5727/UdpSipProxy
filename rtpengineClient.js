const EventEmitter = require('events');
const Rtpengine = require('rtpengine-client').Client;
const logger = require('./logger');


var rtpengine_ip;
var rtpengine_port;
var rtpengine;
module.exports = class rtpengineClient extends EventEmitter{
    //this.events 의 SipProxy 의 Message Method로 이벤트 매핑하여 사용.
    constructor(ip, port) {
        super();
        rtpengine_ip = ip;
        rtpengine_port = port;
        rtpengine = new Rtpengine({ localPort : rtpengine_port , host : rtpengine_ip});
        this.events = {
            'INVITE' : this.OFFER,
            'OK' : this.ANSWER,
            'BYE' : this.DELETE,
        }
    }
    PING(){

    }
    OFFER(sipMsg){
        return new Promise(async (resolve, reject) => {
            /** proc rtpengine client  */
            var fromTagValue = sipMsg.getParsedHeader('from').params.tag
            var toTagValue = sipMsg.getParsedHeader('to').params.tag
    
            var opt = {
                'call-id' : sipMsg.headers['call-id'],
                'sdp' : sipMsg.body,
                'from-tag' : fromTagValue,
                'to-tag' : toTagValue,
                'label' : 'caller',
                'ICE' : 'remove',
                'flags' : ['codec-transcode-PCMU' , 'codec-transcode-PCMA'],
                'supports' : ['load lmit'],
            };
            
            var data = await rtpengine.offer({ port: rtpengine_port, host: rtpengine_ip }, opt);
            if(data.result == null)
                return reject('rtpengine offer no data');
            //검사 체크 필요.
            console.log('OFFER rtpengine receive.. : ' + data.result);
            sipMsg.body = data.sdp;
            return resolve(sipMsg);
        })
    }
    ANSWER(sipMsg){
        return new Promise(async (resolve, reject) => {
            if(sipMsg.getParsedHeader('cseq').method != 'INVITE'){
                return resolve(sipMsg);
            }
            /** proc rtpengine client  */
            
            var fromTagValue = sipMsg.getParsedHeader('from').params.tag
            var toTagValue = sipMsg.getParsedHeader('to').params.tag

            var opt = {
                'call-id': sipMsg.headers['call-id'],
                'sdp': sipMsg.body,
                'from-tag': fromTagValue,
                'to-tag': toTagValue,
                'label' : 'callee',
                'ICE' : 'remove',
                'flags' : ['codec-transcode-PCMU' , 'codec-transcode-PCMA'],
                'supports' : ['load lmit'],
            };
            var data = await rtpengine.answer({ port: rtpengine_port, host: rtpengine_ip }, opt);
            if (data.result == null)
                return reject('rtpengine answer no data');
            //검사 체크 필요.
            console.log('ANSWER rtpengine receive.. : ' + data.result);
            sipMsg.body = data.sdp;
            return resolve(sipMsg);
        })
    }
    DELETE(sipMsg){
        return new Promise(async (resolve, reject) => {
            var fromTagValue = sipMsg.getParsedHeader('from').params.tag
            var toTagValue = sipMsg.getParsedHeader('to').params.tag
            var opt = {
                'call-id': sipMsg.headers['call-id'],
                'from-tag': fromTagValue,
                'to-tag': toTagValue,
            };
            var data = await rtpengine.delete({ port: rtpengine_port, host: rtpengine_ip }, opt);
            if (data.result == null)
                return reject('rtpengine delete no data');
            logger.debug(JSON.stringify(data, null, '\t'));
            console.log('DELETE rtpengine receive.. : ' + data.result);
            return resolve(sipMsg);
        })
    }
    
}

