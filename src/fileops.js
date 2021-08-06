const filesystem = require('./filesystem');
var glob = require("glob")

deleteAllTextFiles = () => {
    path = `${process.env.OUTPUT_FOLDER}/**.txt`;
    filesystem.deleteAllFiles(path);
}

readAllExcelFiles = () => {
    path = `${process.env.INPUT_FOLDER}/**.xlsx`
    return filesystem.readAllFiles(path)
}

module.exports = {
    deleteAllTextFiles: deleteAllTextFiles,
    readAllExcelFiles: readAllExcelFiles
}