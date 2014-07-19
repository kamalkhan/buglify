require('colors');
var path   = require('path');
var fs     = require('fs');
var _      = require('underscore');
var uglify = require('uglify-js');
var read   = require('./read');
var write  = require('./write');

module.exports = function minify(buglify, args){
    buglify.min = buglify.min || 'buglify.min.js';
    var root   = buglify.root || '';
    var min_root  = buglify.min_root || root;
    var min = (min_root ? path.join(min_root, buglify.min) : buglify.min);
    var map = min + '.map';
    var _files = buglify.src || [];
    var files  = [];
    _.each(_files, function(file){
        file = (root ? path.join(root, file) : file);
        if(!fs.lstatSync(file).isDirectory())
        {
            files.push(file);
            return -1;
        }
        // its a directory
        _.each(read(file, [/\.js$/i]), function(f){
            files.push(f);
        });
    });

    var options = {};
    if(args.length) options['max_line_len'] = args.length;
    if(args.comments) options['comments'] = function(node, token){
        if(token.type == 'comment2')
        return true;
    };

    var ugly = uglify.minify(files, {
        outSourceMap: buglify.min + '.map',
        output: options,
        compress: {
            sequences     : true,  // join consecutive statemets with the “comma operator”
            properties    : true,  // optimize property access: a["foo"] → a.foo
            dead_code     : true,  // discard unreachable code
            drop_debugger : true,  // discard “debugger” statements
            unsafe        : false, // some unsafe optimizations (see below)
            conditionals  : true,  // optimize if-s and conditional expressions
            comparisons   : true,  // optimize comparisons
            evaluate      : true,  // evaluate constant expressions
            booleans      : true,  // optimize boolean expressions
            loops         : true,  // optimize loops
            unused        : true,  // drop unused variables/functions
            hoist_funs    : true,  // hoist function declarations
            hoist_vars    : false, // hoist variable declarations
            if_return     : true,  // optimize if-s followed by return/continue
            join_vars     : true,  // join var declarations
            cascade       : true,  // try to cascade `right` into `left` in sequences
            side_effects  : true,  // drop side-effect-free statements
        }
    });
    write(ugly.code, min, 'Minified', args.verbose);
    write(ugly.map, map, 'Mapped', args.verbose);
};