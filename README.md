[![Travis Status](https://travis-ci.org/n3okill/enfsaddins-promise.svg)](https://travis-ci.org/n3okill/enfsaddins-promise)
[![Appveyor status](https://ci.appveyor.com/api/projects/status/jc3x9pl2sbenrl20?svg=true)](https://ci.appveyor.com/project/n3okill/enfsaddins-promise)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/435e5bdb9c1f4e0b9e6614b25367b448)](https://www.codacy.com/app/n3okill/enfsaddins-promise)
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=64PYTCDH5UNZ6)

[![NPM](https://nodei.co/npm/enfsaddins-promise.png)](https://nodei.co/npm/enfsaddins-promise/)


enfsaddins-promise
==================
Additional methods for node fs module with promises

**enfs** stands for [E]asy [N]ode [fs]

This module is intended to work as a sub-module of [enfspatch-promise](https://www.npmjs.com/package/enfspatch-promise)

Description
-----------
This module will add promises to [enfsaddins](http://www.npmjs.com/package/enfsaddins) for async methods
All `async` methods will have their name + 'P' (ex: exists => existsP)
  
Usage
-----
`enfsaddins-promise`


Valid usage but not the better:

```js
    const fs = require("fs");
    const enfs = require("enfsaddins-promise")(fs);
```

It's better to use

```js
    const enfs = require("enfspatch-promise");
```

this will use [enfspatch-promise](https://www.npmjs.com/package/enfspatch-promise) module that implements this module
and allows access to all it's methods



Errors
------
All the methods follows the node culture.
- Async: Every async method returns an Error in the first callback parameter
- Sync: Every sync method throws an Error.


Additional Methods
------------------
- [existsP](#existsp)
- [existAccessP](#existaccessp)
- [existStatP](#existstatp)
- [existLStatP](#existlstatp)
- [existFStatP](#existfstatp)
- [existStatIsDirectoryP](#existstatisdirectoryp)
- [existLStatIsDirectoryP](#existstatisdirectoryp)
- [existStatIsFileP](#existstatisfilep)
- [existLStatIsFileP](#existstatisfilep)
- [existIsSymlinkP](#existissymlinkp)


### existsp
  - **existsP(path)**

> Change the natural behaviour of fs.exists to the node culture, it will return an error 
in the first callback parameter.
As exists is deprecated if it cease to exist then exists will use (#existStat) instead


```js
    enfs.existsP("/etc/passwd").then(function(itemExists){
        console.log(itemExists ? 'it\'s there' : 'no passwd!');
    });
```
check: [fs.exists](https://nodejs.org/api/fs.html#fs_fs_exists_path_callback)

### existAccessP
  - **existAccessP(path, [mode])**

> Will use fs.access to check if the item exists in the file system and if the process
as access to the item.


```js
    enfs.existAccessP("/etc/passwd").then(function(itemExists){
        console.log(itemExists ? "it\'s there and have access" : "don\'t exist or don\'t have access");
    });
```
check: [fs.access](https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback)

### existStatP 
### existLStatP
- **existStatP(path)**
- **existLStatP(path)**

> Will use fs.stat to check if the item exists in the file system.

```js
    enfs.existStatP("/etc/passwd").then(function(itemExists){
        console.log(itemExists ? "it\'s there" : "don\'t exist");
    });
```
check: [fs.stat](https://nodejs.org/api/fs.html#fs_fs_stat_path_callback)

```js
    enfs.existLStatP("/etc/passwd").then(function(itemExists){
        console.log(itemExists ? "it\'s there" : "don\'t exist");
    });
```
check: [fs.lstat](https://nodejs.org/api/fs.html#fs_fs_lstat_path_callback)

### existFStatP
  - **existFStatP(fd)**

> Will use fs.fstat to check if the item exists in the file system.

```js
    enfs.existFStatP(fs.openSync("/etc/passwd","r")).then(function(itemExists){
        console.log(itemExists ? "it\'s there" : "don\'t exist");
    });
```
check: [fs.fstat](https://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback)


### existStatIsDirectoryP 
### existLStatIsDirectoryP
- **existStatIsDirectoryP(path)**
- **existLStatIsDirectoryP(path)**

> Will use fs.stat or fs.lstat or fs.fstat to check if the item exists in the file system,
and if it's a directory.
This method is just a shortcut to check if an item exists in the file system and it's type

```js
    enfs.existStatIsDirectoryP("/etc").then(function(isDirectory){
        console.log(isDirectory ? "it's a directory" : "don\'t exist or it's not a directory.");
    });
```
check: 
[fs.stat](https://nodejs.org/api/fs.html#fs_fs_stat_path_callback)
[fs.lstat](https://nodejs.org/api/fs.html#fs_fs_lstat_path_callback)
[fs.fstat](https://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback)


### existStatIsFileP 
### existLStatIsFileP
- **existStatIsFileP(path)**
- **existLStatIsFileP(path)**

> Will use fs.stat or fs.lstat or fs.fstat to check if the item exists in the file system,
and if it's a file.
This method is just a shortcut to check if an item exists in the file system and it's type

```js
    enfs.existStatIsFileP("/etc/passwd").then(function(isFile){
        console.log(isFile ? "it's a file" : "don\'t exist or it's not a file.");
    });
```
check: 
[fs.stat](https://nodejs.org/api/fs.html#fs_fs_stat_path_callback)
[fs.lstat](https://nodejs.org/api/fs.html#fs_fs_lstat_path_callback)
[fs.fstat](https://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback)


### existIsSymlinkP 
- **existIsSymlinkP(path)**

> Will use fs.lstat to check if the item exists in the file system,
and if it's a symbolic link.
This method is just a shortcut to check if an item exists in the file system and it's type

```js
    enfs.existIsSymlinkP("/etc/symlink").then(function(isSymlink){
        console.log(isSymlink ? "it's a symlink" : "don\'t exist or it's not a symlink.");
    });
```
check: 
[fs.lstat](https://nodejs.org/api/fs.html#fs_fs_lstat_path_callback)




License
-------

Creative Commons Attribution 4.0 International License

Copyright (c) 2017 Joao Parreira <joaofrparreira@gmail.com> [GitHub](https://github.com/n3okill)

This work is licensed under the Creative Commons Attribution 4.0 International License. 
To view a copy of this license, visit [CCA4](http://creativecommons.org/licenses/by/4.0/).


