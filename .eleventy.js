const moment = require('moment');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

moment.locale('en');
 
module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addFilter('capitalize', s => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    });


    eleventyConfig.addFilter('dateReadable', date => {
        return moment(date).format('LL');
    });

    eleventyConfig.addFilter('dateISO', date => {
        return moment(date).format('YYYY-MM-DD');
    });

    return {
        dir: {
            input: "src",
            output: "html"
        }
    }
};
