require('./lib.js');

var source_path = process.argv[3];
var export_path = process.argv[5];

prompt.start();
prompt.get({properties:{algorithme:{},password:{hidden:true}}},function (err,crypt){
	try{ 
		global.__envSecure = new __envSecure(crypt.algorithme,crypt.password);
		clone(source_path,export_path,crypt);
	} catch(e){ console.log(e) }
});