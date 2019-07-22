var rand = require('crypto-random-string');
var fs = require('fs')
var ini = require('ini')
var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'))


function makeTag(){
    return rand({length: 17, type: 'base64'}) 
}

exports.findUrl = new RegExp("\<.+?\>");


exports.addReceivedTopVia = (sipMsg) => {
    var vias = sipMsg.getParsedHeader('via')
    if (vias[0].host == config.ip ) return sipMsg;
    var topVia = sipMsg.headers['via'].split(',')[0];
    const branch = makeTag()
    var receivedVia = sipMsg.headers['via'].replace(topVia, topVia + `;received=${config.ip};rport=${config.port}`);
    sipMsg.headers['via'] = `SIP/2.0/UDP ${config.ip}:${config.port};branch=${branch}`
    sipMsg.set('via', receivedVia);
    return sipMsg;
}
exports.removeTopVia = (sipMsg) => {
    var v = sipMsg.getParsedHeader('via') 
    if(v[0].host != config.ip) return sipMsg

    var vias =  sipMsg.headers['via'].split(',')
    sipMsg.headers['via'] = sipMsg.headers['via'].replace(`${vias[0]},`, '')       
    return sipMsg;
}


exports.rand = makeTag