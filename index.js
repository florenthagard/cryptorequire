require.extensions['.jse'] = function (module, filename) {
	var fs 		= require('fs');
	var content = __cryptorequire.decrypt(fs.readFileSync(filename));
	module._compile(content, filename);
};