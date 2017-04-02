/**
 * @project enfsaddins-promise
 * @filename addins.js
 * @description tests for enfsaddins-promise
 * @author Joao Parreira <joaofrparreira@gmail.com>
 * @copyright Copyright(c) 2016 Joao Parreira <joaofrparreira@gmail.com>
 * @licence Creative Commons Attribution 4.0 International License
 * @createdAt Created at 18-02-2016.
 * @version 0.0.1
 */

/* global describe, require, it, __filename */

"use strict";

//avoid messing with original fs module
const copyFs = require("clone")(require("fs"));

describe("enfsaddins-promise", function () {
    const fs = require("../")(copyFs);
    describe("> existStatP", function () {
        describe("> async", function () {
            function existStat(path, result) {
                return fs.existStatP(path).then(function (res) {
                    res.should.be.equal(result);
                });
            }

            it("should test true for async __filename", function () {
                return existStat(__filename, true);
            });
            it("should test false for async non-existent file", function () {
                return existStat("/not/existent/file", false);
            });
        });
    });
    describe("> existFStatP",function(){
        function existFStat(fd,result) {
            return fs.existFStatP(fd).then(function(res){
                res.should.be.equal(result);
            });
        }
        it("should test true for __filename",function(){
            return existFStat(fs.openSync(__filename,"r"),true);
        });
    });
    describe("> existAccess", function () {
        describe("> async", function () {
            function existAccess(path, result) {
                return fs.existAccessP(path).then(function (res) {
                    res.should.be.equal(result);
                });
            }

            it("should test true for async __filename", function () {
                return existAccess(__filename, true);
            });
            it("should test false for async non-existent file", function () {
                return existAccess("/not/existent/file", false);
            });
        });
    });
    describe("> multiple methods of exist and is of type", function () {
        describe("> async", function () {
            const methods = ["existStatIsDirectoryP", "existLStatIsDirectoryP",
                "existStatIsFileP", "existLStatIsFileP",
                "existIsSymlinkP"];
            it("should test methods existence", function () {
                methods.forEach(function (name) {
                    (typeof fs[name]).should.be.equal("function");
                });
            });
            it("should test stat isDirectory method and it's result", function () {
                return fs.existStatIsDirectoryP(__dirname).then(function (result) {
                    result.should.be.equal(true);
                    return fs.existStatIsDirectoryP(__filename).then(function (resultFile) {
                        resultFile.should.be.equal(false);
                    });
                });
            });
            it("should test stat isFile method and it's result", function () {
                return fs.existStatIsFileP(__filename).then(function (result) {
                    result.should.be.equal(true);
                    return fs.existStatIsFileP(__dirname).then(function (resultDir) {
                        resultDir.should.be.equal(false);
                    });
                });
            });
        });
    });
});
