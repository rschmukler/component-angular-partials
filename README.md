# Component-Angular-Partials
A component plugin for adding partials to your assets directory. Support for compiling languages too.

Specify the partials under `partials` in `component.json`.

# Usage Example

    var angularPlugin = module.exports.angularPlugin = require('component-angular-partials');

    // Specify the extensions you want to be able to compile. By default it is undefined and the plugin will crash.

    angularPlugin.compileDefinitions = {
      jade: function(path, string) {
              return jade.compile(string, {filename: path})();
            }
    };
    builder.use(angularPlugin);
