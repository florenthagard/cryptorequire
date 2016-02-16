global.prompt 	= require('prompt');
global.fs 		= require('fs');
global.path		= require('path');
global.crypto 	= require('crypto');
global.util 	= require('util');

global.cryptorequire = function(algorithmes,passwd){
    var data 		= {};
    this.setAlgo 	= function(s) { data['algo']   = s; }
    this.setPasswd 	= function(s) { data['passwd'] = s; }
    this.getAlgo 	= function()  { return data['algo']; }
    this.getPasswd	= function()  { return data['passwd']; }

    this.setAlgo(algorithmes || 'blowfish');
    this.setPasswd(passwd    || 'test');
}

global.cryptorequire.prototype.encrypt = function(buffer){
	try{
		var ect = crypto.createCipher(this.getAlgo(),this.getPasswd());
		return Buffer.concat([ect.update(buffer),ect.final()]);
	} catch(e){ console.log(e); }
}
global.cryptorequire.prototype.decrypt = function (buffer){
	try{
		var dct = crypto.createDecipher(this.getAlgo(),this.getPasswd());
		return Buffer.concat([dct.update(buffer),dct.final()]).toString('utf8');
	} catch(e){ console.log(e); }
}

global.getStat = function(path){
	try		 { return fs.statSync(path); }
	catch(e) { return false; }
}

global.clone = function(src, dst) {
	var srcStats = getStat(src);
	var dstStats = getStat(dst);

	if (srcStats.isDirectory()) {
		if(!dstStats){ fs.mkdirSync(dst); }
		fs.readdirSync(src).forEach(function(childItemName) {
			clone(path.join(src, childItemName),
		          path.join(dst, childItemName));
		});
	} else { 
		if(!dstStats){ fs.writeFileSync(dst,cryptorequire.encrypt(fs.readFileSync(src))); }
	}
}