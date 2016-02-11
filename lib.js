global.prompt 	= require('prompt');
global.fs 		= require('fs');
global.path		= require('path');
global.crypto 	= require('crypto');

Object.defineProperty(Array.prototype, "padl", {
	enumerable   : false,
	configurable : true,
	writable	 : true,
	value        : function(padnb,pad){
		var paddArray  = [];
		var wordLength = 0;
		for (el in this){
			if(this[el].length > wordLength){wordLength = this[el].length;}
		}

		for (el in this){
			paddArray.push(Array((padnb||wordLength+1)-this[el].length+1).join(pad||' ')+this[el])
		}

		return paddArray
	}
})

Object.defineProperty(Array.prototype, "pagination", {
	enumerable   : false,
	configurable : true,
	writable	 : true,
	value        : function(modulo){
		var original = this;
		var edited = [];
		while (original.length > 0){
			edited.push(original.splice(0,modulo||1));
		}
		return edited
	}
})

Object.defineProperty(Array.prototype, "padr", {
	enumerable   : false,
	configurable : true,
	writable	 : true,
	value        : function(padnb,pad){
		var paddArray  = [];
		var wordLength = 0;
		for (el in this){
			if(this[el].length > wordLength){wordLength = this[el].length;}
		}

		for (el in this){
			paddArray.push(this[el]+Array((padnb||wordLength)-this[el].length+1).join(pad||' '))
		}

		return paddArray
	}
})


global.__envSecure = function(algorithmes,passwd){
    var data 		= {};
    this.setAlgo 	= function(s) { data['algo']   = s; }
    this.setPasswd 	= function(s) { data['passwd'] = s; }
    this.getAlgo 	= function()  { return data['algo']; }
    this.getPasswd	= function()  { return data['passwd']; }

    this.setAlgo(algorithmes || 'test');
    this.setPasswd(passwd    || 'blowfish');

	this.algo 	= algorithmes|| 'blowfish';
	this.passwd = passwd 	 || 'test';
}

global.__envSecure.prototype.showCiphersAlgo = function(){
	var ciphers = crypto.getCiphers().padl();
		ciphers = ciphers.pagination(Math.floor((process.stdout.columns-18) / (ciphers[0].length)));

		console.log("Voicis une listes des algorithmes disponible : ");
	for (page in ciphers){
		console.log(ciphers[page].join("").yellow);
	}
}
global.__envSecure.prototype.encrypt = function(buffer){
	try{
		console.log(this.getAlgo() == this.algo,this.getPasswd() == this.passwd);
		var ect = crypto.createCipher(this.getAlgo(),this.getPasswd());
		return Buffer.concat([ect.update(buffer),ect.final()]);
	} catch(e){ this.showCiphersAlgo(); }
}
global.__envSecure.prototype.decrypt = function (buffer){
	try{
		console.log(this.getAlgo()  ,this.algo  ,this.getAlgo()   == this.algo);
		console.log(this.getPasswd(),this.passwd,this.getPasswd() == this.passwd);
		var dct = crypto.createDecipher(this.getAlgo(),this.getPasswd());
		return Buffer.concat([dct.update(buffer),dct.final()]).toString('utf8');
	} catch(e){ this.showCiphersAlgo(); }
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
		if(!dstStats){ fs.writeFileSync(dst+'e',__envSecure.encrypt(fs.readFileSync(src))); }
	}
}