var debug = require('debug')('component:angular-partials-plugin'),
    path = require('path'),
    Batch = require('batch'),
    fs = require('fs'),
    read = fs.readFile,
    write = fs.writeFile;

var plugin = module.exports = function (builder) {
  builder.hook('before scripts', compilePartials);
};

function compilePartials(pkg, next) {
  var partials = pkg.config.partials;
  if(!partials) return next();
  if(!plugin.compileDefinitions) return next();
  var batch = new Batch();
  batch.concurrency(10);
  partials.forEach(function(file) {
    var extension = path.extname(file).slice(1);
    var compile = plugin.compileDefinitions[extension];
    if(!compile)
      return;

    batch.push(function(done) {
      debug("Compiling file: " + file);

      var fullPath = pkg.path(file);

      // Read and compile our Jade.
      read(fullPath, {encoding: 'utf8'}, function(err, string) {
        debugger;
        compiled = compile(fullPath, string);

        // Rename to the HTML version
        pkg.removeFile('partials', file);
        file = file.slice(0, file.length - extension.length - 1) + '.html';
        var writePath = pkg.assetsDest + '/' + pkg.basename + '/' + file;
        write(writePath, compiled, {encoding: 'utf8'}, done);
      });
    });
  });
  return batch.end(next);
}
