
var fs = require('fs')
var ini = require('ini')
var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'))


const logger = require('./logger');
logger.info('==================================== START ============================= ');


var SipProxy = require('./sipProxy');
var RtpengineClient = require('./rtpengineClient');
var rtpengineClient = new RtpengineClient(config.RTPENGINE.ip, parseInt(config.RTPENGINE.port));


const dgram = require('dgram');
const UdpServer = dgram.createSocket('udp4');
var sipServer = new SipProxy(UdpServer, rtpengineClient);
sipServer.start(config.port);

