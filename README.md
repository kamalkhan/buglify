Buglify
======

Batch minify (uglify) javascript (with sourcemaps) including a file change listener/watcher.

## Installation

Buglify is a [http://nodejs.org/download/](nodejs) project, so make sure you have that installed. Use npm in your terminal and install (globally):

  ```
npm install -g buglify
  ```
  
  Buglify is a global utility, so -g installation will help.

## Usage

  Create a `buglify.json` file somewhere (at the root of a project is recommended).
  
  > For illustration, consider the following directory structure as your project:
  
  ```
project
  ├ buglify.json
  ├ ...
  ├ frontend
    ├ ...
    ├ js
      ├ src
        ├ a.js
        ├ dir
          ├ c.js 
        └ b.js
    ├ ...
  └ ...
  ```
  
### Bear minimum
  
  Lets fill the `buglify.json` file in order to batch uglify/minify the scripts as a single file including a source map.
  
  ```
{
    "Frontend Scripts": {
        "root": "frontend/js/src",
        "src": ["a.js","b.js", "dir"],
        "src_root": "http://web.dev/project"
    }
}
  ```
  
  > Now open up terminal if you haven't already (CD into your project directory), and run:
  
  ```
buglify
  ```
  
  You now have `buglify.min.js` and `buglify.min.js.map` in `project/frontend/js/src`.
  
  > To watch files for changes and uglify on the go, run:
  
  ```
buglify -w
  ```
  
#### What?

  `"Frontend Scripts"` is used as a slug for the batch process. You will see how we can add more [separate batch processes](https://github.com/kamalkhan/buglify/blob/master/README.md#separate-batch-processes).
  
  `"root"` is used as a base directory. Basically it gets prepended to the `"src"` files.
    
  `"src"` holds the files (in order) to be processed as a batch. Only top level files and directories. So this batch will be processed in the following order: `frontend/a.js`, `frontend/b.js`, `frontend/dir/c.js`.
    
  `"src_root"` is a http web link pointing to the project root (buglify.json base path). This is recommended for the source map file to work properly and should be used to avoid problems while debugging.
  
  If you need to save the minified and mapped files in a different location, you can set `min_root` (e.g. `"min_root": "frontend/js"`).
  
  To name the file, set `min` (e.g. `"min": "frontend.min.js"`).
  
### Options

  There are three ways (prioritized) to set some useful options.
  
  * Command line arguments (has priority 0)
  * Locally, or (has priority 1)
  * Globally (has priority 2)
  
  1. Providing options as command line arguments in terminal.
  
  ```
Usage: buglify [options]

  Options:

    -h, --help      output usage information
    -V, --version   output the version number
    -w, --watch     Watch & Uglify on the go
    -c, --comments  Preserve multiline comments
    -l, --length    Max length per line
    -v, --verbose   Verbose logging
  ```

  Example usage: `buglify -w -c -l 80` to watch for changes, preserve multiline comments and restrict lines to 80 characters.
  
  Command line arguments have the highest priority and beats global, local options.
  
  2. Providing options locally in `buglify.json`.
  
  ```
{
    "Frontend Scripts": {
        ...
        "options": {
            "comments": true,
            "length": 80,
            "watch": true,
            "verbose": false
        }
    }
    ...
}
  ```

  Here, local options will apply to its own batch process, overriding the global options but overriden by the command line options.
  
  3. Providing options globally in `buglify.json`.
  
  ```
{
    "options": {
        "comments": true,
        "length": 80,
        "watch": true,
        "verbose": false
    },
    "Frontend Scripts": {
        ...
    }
    ...
}
  ```

  Global options have least priority. That is, they take effect when neither local nor cli argmuents are given.
  
  * Defaults
  
  `"comments": false`
  `"length": 32000`
  `"watch": false`
  `"verbose": false`
  

### Separate batch processes
  
  What if we had seperate source files in our project that needed to be minified separately? Well, just pass another one:
  
  ```
project
  ├ buglify.json
  ├ ...
  ├ frontend
    ├ ...
    ├ js
      ├ src
        ├ a.js
        ├ dir
          ├ c.js 
        └ b.js
    ├ ...
  ├ ...
  ├ admin
    ├ ...
    ├ js
      ├ src
        ├ dir
          ├ a.js 
          ├ b.js 
        └ c.js
    ├ ...
  └ ...
  ```
  
  If we take a look at our project directory structure above, we observe two separate locations for our javascript source files, each serving its own purpose (one for the frontend of our website and one for the admin).
  
  A sample `buglify.json` file for the above structure:
  
  ```
{
    "frontend/js": {
        "root": "frontend/js/src",
        "src": ["a.js","b.js", "dir"],
        "min_root: "frontend/js",
        "min": "frontend.min.js",
        "src_root": "http://web.dev/project"
    },
    "admin/js": {
        "root": "admin/js/src",
        "src": ["dir","c.js"],
        "min_root: "admin/js",
        "min": "admin.min.js",
        "src_root": "http://web.dev/project"
    }
}
  ```
  
## Release History

* 0.1.1 Fix and allow source root as option
* 0.1.0 Initial tag
* 0.0.1 Initial release
