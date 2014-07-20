Buglify
======

Batch minify (uglify) javascript (with sourcemaps) including a file change listener/watcher.

## Installation

  `npm install -g buglify`
  
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
  
  > Open terminal, CD into your project directory and Run `buglify` in your terminal.
  
  You now have `buglify.min.js` and `buglify.min.js.map` in `project/frontend/js/src`.
  
###### What?

  `"Frontend Scripts"` is used as a slug for the batch process. You will see how we can add more seperate batch processes in a while.
  
    `"root"` is used as a base directory. Basically it gets prepended to the `"src"` files.
    
    `"src"` holds the files (in order) to be processed as a batch. Only top level files and directories. So this batch will be processed in the following order: `frontend/a.js`, `frontend/b.js`, `frontend/dir/c.js`.
    
    `"src_root"` is a http web link pointing to the project root (buglify.json base path). This is recommended for the source map file to work properly and should be used to avoid problems while debugging.
  
  If you need to save the minified and mapped files in a different location, you can set `min_root` (e.g. `"min_root": "frontend/js"`).
  
  To name the file, set `min` (e.g. `"min": "frontend.min.js"`).
  
### Options

  Options

### Multiple seperate source files
  
  What if we had seperate source files in our project that needed to be minified seperately? Well, just pass another one:
  
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
  
  If we take a look at our project directory structure above, we observe two seperate locations for our javascript source files, each serving its own purpose (one for the frontend of our website and one for the admin).
  
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
