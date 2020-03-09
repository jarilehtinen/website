const browsersync = require("browser-sync").create();

function init(done) {
    browsersync.init({
        server: {
            baseDir: "./html/"
        },
        files: [
            "./html/**/*"
        ],
        port: 3000,
        open: true
    });

    done();
}

function reload(done) {
    browsersync.reload();
    done();
}

module.exports = {
    init: init,
    reload: reload
};
