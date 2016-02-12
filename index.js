require('./lib.js');
module.exports = function(){
	console.log("cryptorequire");
	var crequire = global.__envSecure;
		  delete   global.__envSecure;

	return {
		decrypt : function(p){
			console.log(p,p.match(/\.jse$/gi));
		}
	}
}();