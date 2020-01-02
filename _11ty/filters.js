const { DateTime } = require("luxon");
const MarkdownIt = require('markdown-it');
module.exports = {
  // Date formatting (machine readable)
  machineDate: dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-ddT00:00:00+00:00");
  },

  // Date formatting (human readable)
  readableDate: dateObj => {
    let date = DateTime.fromJSDate(dateObj);

    if (typeof dateObj === 'string') {
      date = DateTime.fromFormat(dateObj.split(" GMT")[0], "ccc LLL dd y hh:mm:ss");
    }

    return date.toFormat("LLLL d., yyyy");
  },

  // Date formatting (human readable)
  readableMonth: dateObj => {
    let date = DateTime.fromJSDate(dateObj);

    date = DateTime.fromFormat(dateObj.split(" GMT")[0], "ccc LLL dd y hh:mm:ss");


    return date.toFormat("LLLL, yyyy");
  },

  // input to string
  stringify: input => {
    return input + "";
  },

  // Cache-busting for external css and js
  cacheBuster: value => {
    let milliseconds = Date.now();
    return value + "?rev=" + milliseconds;
  },

  md: value => {
    const md = new MarkdownIt();
    return md.render(value);
  } 
}
