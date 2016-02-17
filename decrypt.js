require('./lib.js');
var prompt 		 = require('prompt');
var fs 			 = require('fs');
var path		 = require('path');

var file_context = process.argv[2];
var file_to_run  = process.argv[3];

prompt.start();
prompt.get({properties:{algorithme:{},password:{hidden:true}}},function (err,crypt){
	try{

		global.__cryptorequire = new cryptorequire(crypt.algorithme,crypt.password);
		var decrypted      	   = __cryptorequire.decrypt(fs.readFileSync(file_context+'/'+file_to_run));
			__dirname      	   = path.dirname(path.normalize(file_context+'/'+file_to_run));
			__filename     	   = path.basename(path.normalize(file_context+'/'+file_to_run));

		eval(decrypted.toString());
	} catch(e){ console.log(e) }
});
