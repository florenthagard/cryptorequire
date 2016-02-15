require('./lib.js');
module.exports = function(src, filename) {
	var Module = module.constructor;
	var list   = fs.readdirSync(src);
	for(f in list){
		if(list[f].split(".")[0] === "index"){
			if (list[f].match(/\.jse$/gi)) {

				//var string = crequire.decrypt(fs.readFileSync(p+'/'+list[f]));
				var m      = new Module();
					m._compile(string, filename);
				return m.exports;
			} else{ return require(src); }
		}
	}
}