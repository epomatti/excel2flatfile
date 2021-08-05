const fs = require('fs')
const readXlsxFile = require('read-excel-file/node')
var glob = require("glob")
require('dotenv').config()
var path = require("path");

readFiles = (folder) => {
    return glob.sync(`${folder}/**.xlsx`);
}

buildTxtLine = (row) => {
    return `${row[1]}          ${row[2]}                                           0${row[3]}                               BRFJ\r\n`;
}

convertToTxt = (file) => {
    readXlsxFile(file).then((rows) => {
        first = true;
        rows.forEach(row => {
            if (first) {
                first = false;
            } else {
                line = buildTxtLine(row);
                fs.appendFileSync(`${process.env.INPUT_FOLDER}/${path.parse(file).name}.txt`, line);
            }
        })
    });
}

files = readFiles(process.env.INPUT_FOLDER);

files.forEach(file => {
    fs.readFile(file, 'utf8', (err, data) => {
        convertToTxt(file);
    })
})
