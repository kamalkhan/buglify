require('colors');
var fs   = require('fs');

module.exports = function write(code, output, desc, verbose){
    fs.writeFile(output, code, function written(err){
        if (err) throw err;
        if(!verbose) return -1;
        console.log('✔ %s'.green, desc);
    });
};