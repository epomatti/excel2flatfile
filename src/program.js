const fs = require('fs')
const readXlsxFile = require('read-excel-file/node')
var path = require("path");
const fileops = require('./fileops');
const { clear } = require('console');

getDistributionCenter = () => {
    dc = process.env.DISTRIBUTION_CENTER
    if (dc.toString().length === 4) {
        return dc;
    } else {
        throw Error(`Distribution center must be 4 characters long. Value was [${dc}].`);
    }
}

generateSequence = (value) => {
    minLength = 1;
    maxLength = 4;
    actualLength = value.toString().length;
    if (actualLength > maxLength || actualLength < minLength) {
        throw Error(`Sequence needs to be greater ${minLength} and maximum ${maxLength} characters long. Value was [${value}].`);
    }
    return value.padStart(maxLength, "0");
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
        convertToTxt(file);
    })
}

module.exports = {
    generateSequence: generateSequence,
    buildTxtLine: buildTxtLine,
    getDistributionCenter: getDistributionCenter,
    init: init
}