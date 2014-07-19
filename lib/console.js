var program = require('commander');
module.exports = function(){
    program
      .version('0.0.1')
      .option('-w, --watch', 'Watch & Uglify on the go')
      .option('-c, --comments', 'Preserve multiline comments')
      .option('-l, --length', 'Max length per line')
      .option('-v, --verbose', 'Verbose logging')
      .parse(process.argv);

    var args = {};
    if(program.comments) args.comments = program.comments;
    if(program.length)   args.length   = program.length;
    if(program.watch)    args.watch    = program.watch;
    if(program.verbose)  args.verbose  = program.verbose;
    return args;
}();