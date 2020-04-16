const fs = require('fs');

/**
 *
 * @param {string} dirPath
 * @param {Array<string>} arrayOfFiles
 * @returns {Array<string>}
 */
const getAllFilesFromDir = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFilesFromDir(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push((dirPath + '/' + file).split(__dirname + '/').pop());
    }
  });

  return arrayOfFiles;
};

module.exports = getAllFilesFromDir;
