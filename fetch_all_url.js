const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL of the website you want to scrape
const websiteUrl = 'https://timesofindia.indiatimes.com/india/madhya-pradesh'; 

axios.get(websiteUrl)
  .then(response => {
    const html = response.data;
    
    // Load the HTML content into Cheerio
    const $ = cheerio.load(html);

    // Extract all URLs from .main-content
    const mainContentLinks = [];
    $('.main-content a').each((index, element) => {
        const url = $(element).attr('href');
        if (url) {
            mainContentLinks.push(url);
        }
    });

    // Convert the array of URLs into CSV format
    const csvContent = mainContentLinks.join('\n');

    // Write CSV content to a file
    fs.writeFile('MainContentLinks.csv', csvContent, function(err) {
        if(err) {
            console.error('Error writing CSV file:', err);
        } else {
            console.log('CSV file has been saved!');
        }
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
