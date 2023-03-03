require('babel-register')({
  presets: ['es2015'],
});

const router = require('./sitemap-routes').default;
const Sitemap = require('react-router-sitemap').default;

function generateSitemap() {
  console.log('generate sitemap');
  return new Sitemap(router)
    .build('https://bizpro-taipei.com')
    .save('./sitemap.xml');
}
generateSitemap();
