require('./lib.js');

module.exports = function(){
	var __envSecure;
	prompt.start();
	prompt.get({properties:{algorithme:{},password:{hidden:true}}},function (err,crypt){
		try{ 
			__envSecure = new __envSecure(crypt.algorithme,crypt.password);
			var decrypted = __envSecure.decrypt(fs.readFileSync(file_context+'/'+file_to_run));
			eval(decrypted.toString());
		} catch(e){ console.log(e) }
	});

	return __envSecure
}();