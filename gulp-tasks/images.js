const fs = require("fs");
const glob = require("glob");
const path = require("path");

function copyImages(done) {
    let sourceDir = "./images/";
    let distDir = "./html/images/";

    // Get files
    let files = glob.sync(`${sourceDir}/**/*`, { nodir: true });

    // Copy files
    files.forEach(function(file) {
        let srcFile = file;
        let distFile = srcFile.replace(sourceDir, distDir);
        let distDirname = path.dirname(distFile);

        if (!fs.existsSync(distDirname)) {
            fs.mkdirSync(distDirname, { recursive: true });
        }

        if (!fs.existsSync(distFile)) {
            fs.copyFile(srcFile, distFile, err => {
              if (err) {
                  throw err;
              }
            });
        }
    });

    done();
}

module.exports = {
    copy: copyImages
};
