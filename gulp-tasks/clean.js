const del = require("del");

function cleanSite() {
    return del(["./html/"]);
}

module.exports = {
    dist: cleanSite
};
