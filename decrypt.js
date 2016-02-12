require('./lib.js');

var file_context = process.argv[2];
var file_to_run  = process.argv[3];

prompt.start();
prompt.get({properties:{algorithme:{},password:{hidden:true}}},function (err,crypt){
	try{ 
		global.__envSecure = new __envSecure(crypt.algorithme,crypt.password);
		var decrypted      = __envSecure.decrypt(fs.readFileSync(file_context+'/'+file_to_run));
		global.__dirname   = path.dirname(path.normalize(file_context+'/'+file_to_run));
		global.__filename  = path.basename(path.normalize(file_context+'/'+file_to_run));

		console.log(__dirname,__filename);
		console.log(path.dirname(path.normalize(file_context+'/'+file_to_run));,path.basename(path.normalize(file_context+'/'+file_to_run)));

		//eval(decrypted.toString());
	} catch(e){ console.log(e) }
});
