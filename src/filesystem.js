const fs = require('fs')
var glob = require("glob")

deleteAllFiles = (path) => {
    txtFiles = glob.sync(path);
    txtFiles.forEach(deleteFile => {
        if (fs.existsSync(deleteFile)) {
            fs.unlinkSync(deleteFile);
        }
    })
}

readAllFiles = (path) => {
    return glob.sync(path);
}

module.exports = {
    deleteAllFiles: deleteAllFiles,
    readAllFiles: readAllFiles
}