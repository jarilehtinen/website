const moment = require('moment');
 
moment.locale('en');
 
module.exports = function (eleventyConfig) {
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
