const express = require('express');
const router = express.Router();
const { SitemapStream, streamToPromise } = require('sitemap');

router.get('/sitemap.xml', async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: 'https://bizpro-taipei.com',
      cacheTime: 600000, // 600 sec - cache purge period
    });

    // Add your URLs to the sitemap
    smStream.write({ url: '/home', changefreq: 'daily', priority: 0.8 });

    // End the stream
    smStream.end();

    // Return the sitemap
    const sitemap = await streamToPromise(smStream);
    res.header('Content-Type', 'application/xml');
    res.send(sitemap.toString());
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

module.exports = router;
