require('./lib.js');

var file_context = process.argv[2];
var file_to_run  = process.argv[3];

prompt.start();
prompt.get({properties:{algorithme:{},password:{hidden:true}}},function (err,crypt){
	try{ 
		global.__envSecure = new __envSecure(crypt.algorithme,crypt.password);
		__require(file_context+'/'+file_to_run);
	} catch(e){ console.log(e) }
});
