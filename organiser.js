const mv = require('mv');
const fs = require('fs');
// mv('test.txt', 'text/text.txt', {mkdirp: true}, function(err) {
//
// });

//idea: make deductions about file type
var rootFolder = './'

var fileCategories = [
  {name: 'text', types: ['txt', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pps', 'ppsx', 'key', 'odp', 'ods', 'odd', 'pdf', 'rtf', 'tex', 'wks', 'wps', 'wpd']},
  {name: 'image', types: ['ai', 'img', 'ico', 'png', 'ps', 'psd', 'jpg', 'jpeg', 'gif', 'bmp', 'svg', 'tif', 'tiff']},
  {name: 'audio', types: ['aif', 'cda', 'mid', 'midi', 'mp3', 'mpa', 'ogg', 'wav', 'wma', 'wpl']},
  {name: 'video', types: ['3g2', '3gp', 'avi', 'flv', 'h264', 'm4v', 'mkv', 'mov', 'mp4', 'mpg', 'mpeg', 'rm', 'swf', 'vob', 'wmv']},
  {name: 'compressed', types: ['7z', 'arj', 'deb', 'pkg', 'rar', 'rpm', 'gz', 'z', 'zip']},
  {name: 'disc images', types: ['dmg', 'iso', 'toast', 'vcd']},
  {name: 'data and database', types: ['csv', 'dat', 'db', 'dbf', 'log', 'mdb', 'sav', 'sql', 'tar', 'xml']},
  {name: 'executable', types: ['apk', 'bat', 'bin', 'cgi', 'pl', 'com', 'exe', 'gadget', 'jar', 'py', 'wsf']},
  {name: 'system related', types: ['bak', 'cab', 'cfg', 'cpl', 'cur', 'dll', 'dmp', 'drv', 'icns', 'ico', 'ini', 'lnk', 'msi', 'sys', 'tmp']}
];


fs.readdir('./', (err, files) => {
  var selfFile = process.argv[1].split('\\');
  files.filter(file => {
    return fs.statSync(rootFolder + file).isFile() && selfFile[selfFile.length - 1] != file;
  }).forEach(file => {
    var splitted = file.split('.');
    var fileType = splitted[splitted.length - 1];
    fileCategories.forEach(category => {
      category.types.forEach(type => {
        if(fileType == type) {
          mv(rootFolder + file, rootFolder + category.name + '/' + file, {mkdirp: true}, err => {
            if(err) {
              console.log(err);
            }
          });
        }
      })
    })
  });
})
