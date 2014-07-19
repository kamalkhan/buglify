var path = require('path');
var fs   = require('fs');
var _    = require('underscore');

module.exports = function(dir, includes, excludes){
    var files  = fs.readdirSync(dir);
    var filtered = [];
    if(!includes && !excludes) filtered = files;
    else {
        for(var i = 0; i < files.length; i++)
        {
            var add = false;
            if(includes)
            {
                if(excludes) includes = _.difference(includes, excludes);
                for(var j = 0; j < includes.length; j++)
                {
                    var re = includes[j];
                    if(re.test(files[i])) add = true;
                }
            }
            if(add || !includes) filtered.push(path.join(dir, files[i]));
        }
    }
    return filtered;
};