require('colors');
var fs = require('fs');
var _  = require('underscore');

module.exports = function watch(cb, root, files, title, log){
    console.log('҉ Watching for file changes %s'.yellow, title ? 'in' : '');
    if(title) console.log(title);
    console.log('Hit ^c to quit.'.grey);
    _.each(files, function(file){
        file = root ? ((root + '/') + file) : file;
        fs.watch(file, {persistent: true}, function watcher(event, filename){
            // don't know why filename is null all the time :(
            //if(log) console.log('☺ %s %s'.green, filename, event);
            if(typeof cb === 'function') cb();
        });
    });
};