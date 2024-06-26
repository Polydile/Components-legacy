const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const { JSDOM } = require('jsdom');
const codePreviews = require('./docs/_utilities/code-previews.cjs');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyVitePlugin);
  eleventyConfig.addTransform('html-transform', function (content) {
    // Parse the template and get a Document object
    const doc = new JSDOM(content, {
      // We must set a default URL so links are parsed with a hostname. Let's use a bogus TLD so we can easily
      // identify which ones are internal and which ones are external.
      url: `https://internal/`
    }).window.document;

    codePreviews(doc);
    // Serialize the Document object to an HTML string and prepend the doctype
    content = `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
    return content;
  });

  // Añadir colección personalizada
  eleventyConfig.addCollection("uncategorizedComponents", function(collectionApi) {
    return collectionApi.getFilteredByTag("components")
        .filter(item => 
          !item.data.tags.includes("forms") &&
          !item.data.tags.includes("feedback") &&
          !item.data.tags.includes("icons") &&
          item.url !== '/components/' &&
          item.data.hideLink !== true
        );
  });

  return {
    dir: {
      input: "docs",
      output: "_site",
    }
  };
};