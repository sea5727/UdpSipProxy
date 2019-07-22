
module.exports = function(method, opts) {

	return msg[method] ;
} ;


var msg = {
	'invite': 
				'INVITE sip:5753606;context=private@10.1.10.1 SIP/2.0\r\n' +
				'Via: SIP/2.0/UDP 10.1.10.101;branch=z9hG4bKac619477600\r\n' +
				'Via: SIP/2.0/UDP 10.1.10.103;branch=z9hG4bKac6194382828\r\n' +
				'Max-Forwards: 70\r\n' +
				'From: "anonymous" <sip:anonymous@anonymous.invalid>;tag=1c619456422\r\n' +
				'To: <sip:5753606@10.1.10.1>\r\n' +
				'Call-ID: 619455480112200022407@10.1.10.101\r\n' +
				'CSeq: 1 INVITE\r\n' +
				'Contact: <sip:1047@10.1.10.101:5060>\r\n' +
				'Supported: em,timer,replaces,path,resource-priority,sdp-anat\r\n' +
				'Allow: REGISTER,OPTIONS,INVITE,ACK,CANCEL,BYE,NOTIFY,PRACK,REFER,INFO,SUBSCRIBE,UPDATE\r\n' +
				'User-Agent: Audiocodes-Sip-Gateway-Mediant 1000/v.5.80A.055.002\r\n' +
				'P-Asserted-Identity: "Dave Horton<sip:4083084809;context=private>@10.1.0.2\r\n' +
				'Content-Type: application/sdp\r\n' +
				'Content-Length: 173\r\n' +
				'\r\n' +
				'v=0\r\n' +
				'o=AudiocodesGW 619440176 619439848 IN IP4 10.1.10.101\r\n' +
				's=Phone-Call\r\n' +
				'c=IN IP4 10.1.10.101\r\n' +
				't=0 0\r\n' +
				'm=audio 6010 RTP/AVP 0\r\n' +
				'a=rtpmap:0 PCMU/8000\r\n' +
				'a=ptime:20\r\n' +
				'a=sendrecv', 

	'invite-compact': 
				'INVITE sip:5753606@10.1.10.1 SIP/2.0\r\n' +
				'v: SIP/2.0/UDP 10.1.10.101;branch=z9hG4bKac619477600\r\n' +
				'v: SIP/2.0/UDP 10.1.10.103;branch=z9hG4bKac6194382828\r\n' +
				'Max-Forwards: 70\r\n' +
				'f: "anonymous" <sip:anonymous@anonymous.invalid>;tag=1c619456422\r\n' +
				't: <sip:5753606@10.1.10.1>\r\n' +
				'i: 619455480112200022407@10.1.10.101\r\n' +
				'CSeq: 1 INVITE\r\n' +
				'm: <sip:1047@10.1.10.101:5060>\r\n' +
				'k: em,timer,replaces,path,resource-priority,sdp-anat\r\n' +
				'Allow: REGISTER,OPTIONS,INVITE,ACK,CANCEL,BYE,NOTIFY,PRACK,REFER,INFO,SUBSCRIBE,UPDATE\r\n' +
				'User-Agent: Audiocodes-Sip-Gateway-Mediant 1000/v.5.80A.055.002\r\n' +
				'c: application/sdp\r\n' +
				'l: 173\r\n' +
				'\r\n' +
				'v=0\r\n' +
				'o=AudiocodesGW 619440176 619439848 IN IP4 10.1.10.101\r\n' +
				's=Phone-Call\r\n' +
				'c=IN IP4 10.1.10.101\r\n' +
				't=0 0\r\n' +
				'm=audio 6010 RTP/AVP 0\r\n' +
				'a=rtpmap:0 PCMU/8000\r\n' +
				'a=ptime:20\r\n' +
				'a=sendrecv', 
			
	'200ok': 'SIP/2.0 200 OK\r\n'+
	      'Via: SIP/2.0/UDP 10.1.10.3;rport;branch=z9hG4bK94U4tm2DStvvH;received=10.1.10.3\r\n' +
				'Call-ID: 5eb456f6-7ea4-122f-8785-001143e3cdf2\r\n' +
				'From: "5083084809" <sip:5083084809@10.1.10.3>;tag=6jce33ZK01Zgc\r\n' +
				'To: <sip:16173333456@10.1.10.200>;tag=a94c095b773be1dd6e8d668a785a9c84fac73504\r\n' +
				'Contact: <sip:16173333456@10.1.10.200:5060>\r\n' +
				'CSeq: 19710956 INVITE\r\n' +
				'Server: Dialogic-SIP/10.5.3.304 Raytheon_N0 0\r\n' +
				'Allow: INVITE, BYE, REGISTER, ACK, OPTIONS, CANCEL, SUBSCRIBE, NOTIFY, INFO, REFER, UPDATE\r\n' +
				'Supported: path, replaces, timer, tdialog\r\n' +
				'Accept: application/sdp, application/dtmf-relay, text/plain\r\n' +
				'Content-Type: application/sdp\r\n' +
				'Content-Length: 176\r\n' +
				'\r\n' +
				'v=0\r\n' +
				'o=Dialogic_SDP 143 0 IN IP4 10.1.10.200\r\n' +
				's=Dialogic-SIP\r\n' +
				'c=IN IP4 10.1.10.201\r\n' +
				't=0 0\r\n' +
				'm=audio 8108 RTP/AVP 0\r\n' +
				'a=rtpmap:0 PCMU/8000\r\n' +
				'a=silenceSupp:off - - - -\r\n' +
				'a=ptime:20',

		'siprec': 
				'INVITE sip:SIPREC-SRS@172.16.193.134:5030 SIP/2.0\r\n' +
				'Via: SIP/2.0/UDP 172.16.169.181:5060;branch=z9hG4bK04B0013f3db3e67f3b7\r\n' +
				'From: "SIPREC-SRC" <sip:SIPREC-SRC@172.16.169.181>;tag=gK040028ac\r\n' +
				'To: "SIPREC-SRS" <sip:SIPREC-SRS@172.16.193.134>\r\n' +
				'Call-ID: 241467418_28680544@172.16.169.181\r\n' +
				'CSeq: 100008 INVITE\r\n' +
				'Max-Forwards: 70\r\n' +
				'Allow: INVITE,ACK,CANCEL,BYE,REGISTER,REFER,INFO,SUBSCRIBE,NOTIFY,PRACK,UPDATE,OPTIONS,MESSAGE,PUBLISH\r\n' +
				'Accept: application/sdp, application/rs-metadata-request\r\n' +
				'Contact: "SIPREC-SRC" <sip:SIPREC-SRC@172.16.169.181:5060>;+sip.src\r\n' +
				'Require: siprec\r\n' +
				'Supported: timer,100rel\r\n' +
				'Session-Expires: 1800\r\n' +
				'Min-SE: 90\r\n' +
				'Content-Length:  3304\r\n' +
				'Content-Type: multipart/mixed;boundary=sonus-content-delim\r\n' +
				'MIME-Version: 1.0\r\n' +
				'\r\n' +
				'--sonus-content-delim\r\n' +
				'Content-Disposition: session; handling=required\r\n' +
				'Content-Type: application/sdp\r\n' +
				'\r\n' +
				'v=0\r\n' +
				'o=Sonus_UAC 513085 921039 IN IP4 172.16.169.181\r\n' +
				's=SIP Media Capabilities\r\n' +
				't=0 0\r\n' +
				'm=audio 49222 RTP/AVP 0\r\n' +
				'c=IN IP4 172.16.169.132\r\n' +
				'a=label:1\r\n' +
				'a=rtpmap:0 PCMU/8000\r\n' +
				'a=sendonly\r\n' +
				'a=maxptime:20\r\n' +
				'm=audio 49196 RTP/AVP 0\r\n' +
				'c=IN IP4 172.16.169.132\r\n' +
				'a=label:2\r\n' +
				'a=rtpmap:0 PCMU/8000\r\n' +
				'a=sendonly\r\n' +
				'a=maxptime:20\r\n' +
				'\r\n' +
				'--sonus-content-delim\r\n' +
				'Content-Disposition: recording-session\r\n' +
				'Content-Type: application/rs-metadata+xml\r\n' +
				'\r\n' +
				'<?xml version="1.0" encoding="UTF-8"?>\r\n' +
				'<tns:recording xmlns:tns=\'urn:ietf:params:xml:ns:recording\'>\r\n' +
				'<tns:datamode>complete</tns:datamode>\r\n' +
				'<tns:group group_id="ZjExNDNiMDAtNjk1MS0xMA==">\r\n' +
				'<tns:associate-time>1970-05-15T00:41:05Z</tns:associate-time>\r\n' +
				'<callData xmlns=\'urn:ietf:params:xml:ns:callData\'>\r\n' +
				'<fromhdr>"5083084809" &lt;sip:5083084809@172.16.198.55&gt;;tag=BKH9F7r61c3Fj</fromhdr>\r\n' +
				'<tohdr>&lt;sip:2245096042@172.16.195.72&gt;;tag=gK04802798</tohdr>\r\n' +
				'<callid>0a5a5f62-a606-1235-d6a2-5254003a4988</callid>\r\n' +
				'<gcid>241467418</gcid>\r\n' +
				'</callData>\r\n' +
				'</tns:group>\r\n' +
				'<tns:session session_id="ZjExNDNiMDEtNjk1MS0xMA==">\r\n' +
				'<tns:group-ref>ZjExNDNiMDAtNjk1MS0xMA==</tns:group-ref>\r\n' +
				'<tns:start-time>1970-05-15T00:41:05Z</tns:start-time>\r\n' +
				'</tns:session>\r\n' +
				'<tns:participant participant_id="ZjExNDNiMDItNjk1MS0xMA==">\r\n' +
				'<tns:nameID aor="5083084809@172.16.198.55">\r\n' +
				'<tns:name xml:lang="en">5083084809</tns:name>\r\n' +
				'</tns:nameID>\r\n' +
				'</tns:participant>\r\n' +
				'<tns:participant participant_id="ZjExNDNiMDMtNjk1MS0xMA==">\r\n' +
				'<tns:nameID aor="2245096042@172.16.195.72">\r\n' +
				'<tns:name xml:lang="en"> </tns:name>\r\n' +
				'</tns:nameID>\r\n' +
				'</tns:participant>\r\n' +
				'<tns:stream stream_id="ZjExNDNiMDQtNjk1MS0xMA==" session_id="ZjExNDNiMDEtNjk1MS0xMA==">\r\n' +
				'<tns:label>1</tns:label>\r\n' +
				'<tns:associate-time>1970-05-15T00:41:05Z</tns:associate-time>\r\n' +
				'</tns:stream>\r\n' +
				'<tns:stream stream_id="ZjExNDNiMDUtNjk1MS0xMA==" session_id="ZjExNDNiMDEtNjk1MS0xMA==">\r\n' +
				'<tns:label>2</tns:label>\r\n' +
				'<tns:associate-time>1970-05-15T00:41:05Z</tns:associate-time>\r\n' +
				'</tns:stream>\r\n' +
				'<tns:sessionrecordingassoc session_id="ZjExNDNiMDEtNjk1MS0xMA==">\r\n' +
				'<tns:associate-time>1970-05-15T00:41:05Z</tns:associate-time>\r\n' +
				'</tns:sessionrecordingassoc>\r\n' +
				'<tns:participantsessionassoc participant_id="ZjExNDNiMDItNjk1MS0xMA==" session_id="ZjExNDNiMDEtNjk1MS0xMA==">\r\n' +
				'<tns:associate-time>1970-05-15T00:41:05Z</tns:associate-time>\r\n' +
				'</tns:participantsessionassoc>\r\n' +
				'<tns:participantsessionassoc participant_id="ZjExNDNiMDMtNjk1MS0xMA==" session_id="ZjExNDNiMDEtNjk1MS0xMA==">\r\n' +
				'<tns:associate-time>1970-05-15T00:41:05Z</tns:associate-time>\r\n' +
				'</tns:participantsessionassoc>\r\n' +
				'<tns:participantstreamassoc participant_id="ZjExNDNiMDItNjk1MS0xMA==">\r\n' +
				'<tns:send>ZjExNDNiMDUtNjk1MS0xMA==</tns:send>\r\n' +
				'<tns:recv>ZjExNDNiMDQtNjk1MS0xMA==</tns:recv>\r\n' +
				'</tns:participantstreamassoc>\r\n' +
				'<tns:participantstreamassoc participant_id="ZjExNDNiMDMtNjk1MS0xMA==">\r\n' +
				'<tns:send>ZjExNDNiMDQtNjk1MS0xMA==</tns:send>\r\n' +
				'<tns:recv>ZjExNDNiMDUtNjk1MS0xMA==</tns:recv>\r\n' +
				'</tns:participantstreamassoc>\r\n' +
        '</tns:recording>',

        'siprec2': 
				'INVITE sip:SIPREC-SRS@172.16.193.134:5030 SIP/2.0\r\n' +
				'Via: SIP/2.0/UDP 172.16.169.181:5060;branch=z9hG4bK04B0013f3db3e67f3b7\r\n' +
				'From: "SIPREC-SRC" <sip:SIPREC-SRC@172.16.169.181>;tag=gK040028ac\r\n' +
				'To: "SIPREC-SRS" <sip:SIPREC-SRS@172.16.193.134>\r\n' +
				'Call-ID: 241467418_28680544@172.16.169.181\r\n' +
				'CSeq: 100008 INVITE\r\n' +
				'Max-Forwards: 70\r\n' +
				'Allow: INVITE,ACK,CANCEL,BYE,REGISTER,REFER,INFO,SUBSCRIBE,NOTIFY,PRACK,UPDATE,OPTIONS,MESSAGE,PUBLISH\r\n' +
				'Accept: application/sdp, application/rs-metadata-request\r\n' +
				'Contact: "SIPREC-SRC" <sip:SIPREC-SRC@172.16.169.181:5060>;+sip.src\r\n' +
				'Require: siprec\r\n' +
				'Supported: timer,100rel\r\n' +
				'Session-Expires: 1800\r\n' +
				'Min-SE: 90\r\n' +
				'Content-Length:  3304\r\n' +
				'Content-Type: multipart/mixed; boundary=sonus-content-delim\r\n' +
				'MIME-Version: 1.0\r\n' +
				'\r\n' +
				'--sonus-content-delim\r\n' +
				'Content-Disposition: session; handling=required\r\n' +
				'Content-Type: application/sdp\r\n' +
				'\r\n' +
				'v=0\r\n' +
				'o=Sonus_UAC 513085 921039 IN IP4 172.16.169.181\r\n' +
				's=SIP Media Capabilities\r\n' +
				't=0 0\r\n' +
				'm=audio 49222 RTP/AVP 0\r\n' +
				'c=IN IP4 172.16.169.132\r\n' +
				'a=label:1\r\n' +
				'a=rtpmap:0 PCMU/8000\r\n' +
				'a=sendonly\r\n' +
				'a=maxptime:20\r\n' +
				'm=audio 49196 RTP/AVP 0\r\n' +
				'c=IN IP4 172.16.169.132\r\n' +
				'a=label:2\r\n' +
				'a=rtpmap:0 PCMU/8000\r\n' +
				'a=sendonly\r\n' +
				'a=maxptime:20\r\n' +
				'\r\n' +
				'--sonus-content-delim\r\n' +
				'Content-Disposition: recording-session\r\n' +
				'Content-Type: application/rs-metadata+xml\r\n' +
				'\r\n' +
				'<?xml version="1.0" encoding="UTF-8"?>\r\n' +
				'<tns:recording xmlns:tns=\'urn:ietf:params:xml:ns:recording\'>\r\n' +
				'<tns:datamode>complete</tns:datamode>\r\n' +
				'<tns:group group_id="ZjExNDNiMDAtNjk1MS0xMA==">\r\n' +
				'<tns:associate-time>1970-05-15T00:41:05Z</tns:associate-time>\r\n' +
				'<callData xmlns=\'urn:ietf:params:xml:ns:callData\'>\r\n' +
				'<fromhdr>"5083084809" &lt;sip:5083084809@172.16.198.55&gt;;tag=BKH9F7r61c3Fj</fromhdr>\r\n' +
				'<tohdr>&lt;sip:2245096042@172.16.195.72&gt;;tag=gK04802798</tohdr>\r\n' +
				'<callid>0a5a5f62-a606-1235-d6a2-5254003a4988</callid>\r\n' +
				'<gcid>241467418</gcid>\r\n' +
				'</callData>\r\n' +
				'</tns:group>\r\n' +
				'<tns:session session_id="ZjExNDNiMDEtNjk1MS0xMA==">\r\n' +
				'<tns:group-ref>ZjExNDNiMDAtNjk1MS0xMA==</tns:group-ref>\r\n' +
				'<tns:start-time>1970-05-15T00:41:05Z</tns:start-time>\r\n' +
				'</tns:session>\r\n' +
				'<tns:participant participant_id="ZjExNDNiMDItNjk1MS0xMA==">\r\n' +
				'<tns:nameID aor="5083084809@172.16.198.55">\r\n' +
				'<tns:name xml:lang="en">5083084809</tns:name>\r\n' +
				'</tns:nameID>\r\n' +
				'</tns:participant>\r\n' +
				'<tns:participant participant_id="ZjExNDNiMDMtNjk1MS0xMA==">\r\n' +
				'<tns:nameID aor="2245096042@172.16.195.72">\r\n' +
				'<tns:name xml:lang="en"> </tns:name>\r\n' +
				'</tns:nameID>\r\n' +
				'</tns:participant>\r\n' +
				'<tns:stream stream_id="ZjExNDNiMDQtNjk1MS0xMA==" session_id="ZjExNDNiMDEtNjk1MS0xMA==">\r\n' +
				'<tns:label>1</tns:label>\r\n' +
				'<tns:associate-time>1970-05-15T00:41:05Z</tns:associate-time>\r\n' +
				'</tns:stream>\r\n' +
				'<tns:stream stream_id="ZjExNDNiMDUtNjk1MS0xMA==" session_id="ZjExNDNiMDEtNjk1MS0xMA==">\r\n' +
				'<tns:label>2</tns:label>\r\n' +
				'<tns:associate-time>1970-05-15T00:41:05Z</tns:associate-time>\r\n' +
				'</tns:stream>\r\n' +
				'<tns:sessionrecordingassoc session_id="ZjExNDNiMDEtNjk1MS0xMA==">\r\n' +
				'<tns:associate-time>1970-05-15T00:41:05Z</tns:associate-time>\r\n' +
				'</tns:sessionrecordingassoc>\r\n' +
				'<tns:participantsessionassoc participant_id="ZjExNDNiMDItNjk1MS0xMA==" session_id="ZjExNDNiMDEtNjk1MS0xMA==">\r\n' +
				'<tns:associate-time>1970-05-15T00:41:05Z</tns:associate-time>\r\n' +
				'</tns:participantsessionassoc>\r\n' +
				'<tns:participantsessionassoc participant_id="ZjExNDNiMDMtNjk1MS0xMA==" session_id="ZjExNDNiMDEtNjk1MS0xMA==">\r\n' +
				'<tns:associate-time>1970-05-15T00:41:05Z</tns:associate-time>\r\n' +
				'</tns:participantsessionassoc>\r\n' +
				'<tns:participantstreamassoc participant_id="ZjExNDNiMDItNjk1MS0xMA==">\r\n' +
				'<tns:send>ZjExNDNiMDUtNjk1MS0xMA==</tns:send>\r\n' +
				'<tns:recv>ZjExNDNiMDQtNjk1MS0xMA==</tns:recv>\r\n' +
				'</tns:participantstreamassoc>\r\n' +
				'<tns:participantstreamassoc participant_id="ZjExNDNiMDMtNjk1MS0xMA==">\r\n' +
				'<tns:send>ZjExNDNiMDQtNjk1MS0xMA==</tns:send>\r\n' +
				'<tns:recv>ZjExNDNiMDUtNjk1MS0xMA==</tns:recv>\r\n' +
				'</tns:participantstreamassoc>\r\n' +
				'</tns:recording>'
} ;