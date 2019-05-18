var fs = require('fs');
var rimraf = require('rimraf');
var dir = './char-tests';

if (fs.existsSync(dir)) {
  rimraf.sync(dir);
}
fs.mkdirSync(dir);

// 1: all opt dir
var folder1 = '/sample1';
// 2: node dir
var folder2 = '/sample2';
// 3: vs dir
var folder3 = '/sample3';
// 4 tmp files dir
var folder4 = '/sample4';

var node = '/node_modules';
var bin = '/bin';
var obj = '/obj';
var tmpVs = '/.vs';
var tmpVsCode = '/.vscode';

// folders
fs.mkdirSync(dir + folder1)
fs.mkdirSync(dir + folder2)
fs.mkdirSync(dir + folder3)
fs.mkdirSync(dir + folder4)

// folder 1
fs.mkdirSync(dir + folder1 + node);
fs.mkdirSync(dir + folder1 + bin);
fs.mkdirSync(dir + folder1 + obj);
fs.mkdirSync(dir + folder1 + tmpVs);
fs.mkdirSync(dir + folder1 + tmpVsCode);

// folder 2
fs.mkdirSync(dir + folder2 + node);
fs.mkdirSync(dir + folder2 + tmpVsCode);

// folder 3
fs.mkdirSync(dir + folder3 + bin);
fs.mkdirSync(dir + folder3 + obj);
fs.mkdirSync(dir + folder3 + tmpVs);

// folder 4
fs.mkdirSync(dir + folder4 + tmpVs);
fs.mkdirSync(dir + folder4 + tmpVsCode);
