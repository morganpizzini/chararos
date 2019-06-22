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
fs.writeFileSync(dir + folder1 + node + '/test1.txt', 'ciao oo pp oop');
fs.mkdirSync(dir + folder1 + bin);
fs.writeFileSync(dir + folder1 + bin + '/test1.txt', 'ciao oooooooo oo oo');
fs.mkdirSync(dir + folder1 + obj);
fs.writeFileSync(dir + folder1 + obj + '/test1.txt', 'ciao qqqqq');
fs.mkdirSync(dir + folder1 + tmpVs);
fs.writeFileSync(dir + folder1 + tmpVs + '/test1.txt', 'ciao ttt');
fs.mkdirSync(dir + folder1 + tmpVsCode);
fs.writeFileSync(dir + folder1 + tmpVsCode + '/test1.txt', 'ciao ssssss');

// folder 2
fs.mkdirSync(dir + folder2 + node);
fs.mkdirSync(dir + folder2 + tmpVsCode);

// folder 3
fs.mkdirSync(dir + folder3 + bin);
fs.mkdirSync(dir + folder3 + obj);
fs.writeFileSync(dir + folder3 + obj + '/test1.txt', 'aaaaaaa');
fs.writeFileSync(dir + folder3 + obj + '/test2.txt', 'bbbbbbb aaaaaaa');
fs.mkdirSync(dir + folder3 + tmpVs);

// folder 4
fs.mkdirSync(dir + folder4 + tmpVs);
fs.mkdirSync(dir + folder4 + tmpVsCode);
