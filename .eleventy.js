const filters = require('./_11ty/filters.js');
const collections = require('./_11ty/collections.js');
const transforms = require('./_11ty/transforms.js');

const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
var escape = require('escape-html');
const cssBrowserSupport = require("@11tyrocks/eleventy-plugin-css-browser-support");

module.exports = function (eleventyConfig) {
  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Collections
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });

  // Transforms
  Object.keys(transforms).forEach((transformName) => {
    eleventyConfig.addTransform(transformName, transforms[transformName]);
  });

  eleventyConfig.addPairedShortcode('escape', function (content) {
    return escape(content);
  });

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(cssBrowserSupport, {
    includePanelJS: false,
    browserList: ["chrome", "firefox", "safari", "safari_ios", "chrome_android"],
  });

  eleventyConfig.addPassthroughCopy('./src/static/img');
  eleventyConfig.addPassthroughCopy('./src/static/min');
  eleventyConfig.addPassthroughCopy('./src/images');
  eleventyConfig.addPassthroughCopy('admin');
  eleventyConfig.addPassthroughCopy('_redirects');
  eleventyConfig.addPassthroughCopy({
    './src/static/favicon': '/',
    './src/static/css': '/assets',
  });

  return {
    templateFormats: ['md', 'njk'],

    pathPrefix: '/',

    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
  };
};
