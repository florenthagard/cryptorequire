require('./lib.js');
module.exports = function(src, filename) {
	var getStat = function(path){
		try		 { return fs.statSync(path); }
		catch(e) { return false; }
	}

	var srcStats = getStat(src);

	if (srcStats.isDirectory()){
		var Module = module.constructor;
		var list   = fs.readdirSync(src);
		for(f in list){
			if (list[f].match(/\.jse$/gi)) {
				var string = __cryptorequire.decrypt(fs.readFileSync(src+'/'+list[f]));
				var m      = new Module();
					m._compile(string, filename);
				return m.exports;
			} else if (list[f].match(/\.js$/gi)) {
				return require(src+'/'+list[f]);
			}
		}
	}else{
		if (src.match(/\.jse$/gi)) {
			var string = __cryptorequire.decrypt(fs.readFileSync(src));
			var m      = new Module();
				m._compile(string, filename);
			return m.exports;
		} else if (src.match(/\.js$/gi)) {
			return require(src);
		}
	}
}