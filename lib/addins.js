/**
 * @project enfsaddins-promise
 * @filename addins.js
 * @description Add functions to the fs module with promises
 * @author Joao Parreira <joaofrparreira@gmail.com>
 * @copyright Copyright(c) 2017 Joao Parreira <joaofrparreira@gmail.com>
 * @licence Creative Commons Attribution 4.0 International License
 * @createdAt Created at 24-02-2017.
 * @version 0.0.1
 */

"use strict";


function promisify(fs) {
    const fnsStat = [["existStatP", "stat"], ["existLStatP", "lstat"], ["existFStatP", "fstat"]];
    fnsStat.forEach((fnStat) => {
        fs[fnStat[0]] = (arg) => new Promise((resolve) => fs[fnStat[1]](arg, (err) => resolve(!err)));
    });
    fs.existAccessP = (path, mode) => new Promise((resolve) => fs.access(path, mode, (err) => resolve(!err)));
    fs.existsP = (path) => new Promise((resolve) => fs.exists ? fs.exists(path, (err) => resolve(!err)) : fs.existStatP(path));

    const fnsAsync = [
        {name: "existStatIsDirectoryP", fsFn: "stat", statType: "isDirectory"},
        {name: "existLStatIsDirectoryP", fsFn: "lstat", statType: "isDirectory"},
        {name: "existStatIsFileP", fsFn: "stat", statType: "isFile"},
        {name: "existLStatIsFileP", fsFn: "lstat", statType: "isFile"},
        {name: "existIsSymlinkP", fsFn: "lstat", statType: "isSymbolicLink"}
    ];

    fnsAsync.forEach((fn) => {
        fs[fn.name] = (path) => new Promise((resolve) => fs[fn.fsFn](path, (err, stat) => resolve(err ? false : !!stat[fn.statType]())));
    });

    return fs;
}

module.exports = promisify;
