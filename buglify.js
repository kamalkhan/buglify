require('colors');
var fs      = require('fs');
var _       = require('underscore');

var args    = require('./lib/console');
var minify  = require('./lib/minify');
var watch    = require('./lib/watch');

jsbuglify = 'buglify.json';
if(!fs.existsSync(jsbuglify))
{
    console.log('Sorry, I need a buglify.json file to proceed.'.red);
    return -1;
}

// Parse the buglify.json file
var buglifies = JSON.parse(fs.readFileSync(jsbuglify));
// default options < global options
var options   = _.extend({
    comments : false,
    length   : 32000,
    watch    : false,
    verbose  : false
}, buglifies.options || {});
if(buglifies.options) delete buglifies.options;

// buglify
_.each(buglifies, function(buglify, title){
    // default < global < local < console
    options = _.extend(options, buglify.options || {}, args);
    // minify local
    minify(buglify, options);
    // watch local
    if(options.watch)
        watch(function(){
            minify(buglify, options);
        }, buglify.root, buglify.src, title, args.verbose);
});