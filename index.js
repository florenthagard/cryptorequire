require.extensions['.jse'] = function (module, filename) {
    var content = __cryptorequire.decrypt(fs.readFileSync(filename));
    module._compile(content, filename);
};