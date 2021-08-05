const fs = require('fs')
const readXlsxFile = require('read-excel-file/node')
var glob = require("glob")
require('dotenv').config()
var path = require("path");

txtFiles = glob.sync(`${process.env.OUTPUT_FOLDER}/**.txt`);
txtFiles.forEach(deleteFile => {
    if (fs.existsSync(deleteFile)) {
        fs.unlinkSync(deleteFile);
    }
})

readFiles = (folder) => {
    return glob.sync(`${folder}/**.xlsx`);
}

generateSequence = (value) => {
    length = value.toString().length;
    if (length === 4) {
        return value;
    } else if (length === 3) {
        return `0${value}`;
    } else {
        throw Error("Sequence is neither 3 or 4 characters long");
    }
}

buildTxtLine = (row) => {
    delivery = row[1]
    car = row[2]
    sequence = generateSequence(row[3])
    return `${delivery}          ${car}                                           ${sequence}                               BRFJ\r\n`;
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
