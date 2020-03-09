const cp = require("child_process");

function eleventyBuild() {
    return cp.spawn("npx", ["eleventy", "--quiet"], { stdio: "inherit" });
}

module.exports = {
    build: eleventyBuild
};
