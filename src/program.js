const fs = require('fs')
const readXlsxFile = require('read-excel-file/node')
var path = require("path");
const fileops = require('./fileops');

getDistributionCenter = () => {
    dc = process.env.DISTRIBUTION_CENTER
    if (dc.toString().length === 4) {
        return dc;
    } else {
        throw Error(`Distribution center must be 4 characters long. Value was [${dc}].`);
    }
}

generateSequence = (value) => {
    length = value.toString().length;
    if (length === 4) {
        return value;
    } else if (length === 3) {
        return `0${value}`;
    } else {
        throw Error(`Sequence is neither 3 or 4 characters long. Value was [${value}].`);
    }
}

buildTxtLine = (row) => {
    delivery = row[1];
    car = row[2];
    sequence = generateSequence(row[3]);
    dc = getDistributionCenter();
    return `${delivery}          ${car}                                           ${sequence}                               ${dc}\r\n`;
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

init = () => {
    fileops.deleteAllTextFiles();
    files = fileops.readAllExcelFiles();
    files.forEach(file => {
        fs.readFileSync(file, 'utf8', (err, data) => {
            convertToTxt(file);
        })
    })
}

module.exports = {
    generateSequence: generateSequence,
    buildTxtLine: buildTxtLine,
    getDistributionCenter: getDistributionCenter,
    init: init
}