const axios = require('axios');
const cheerio = require('cheerio');
const request = require ("request");
const fs = require('fs');

// URL of the website you want to scrape
const websiteUrl = 'https://timesofindia.indiatimes.com/india/madhya-pradesh';

console.log("before");

request(websiteUrl, cb);

function cb(error, response, html) {
    if (error) {
        console.error('error:', error);
    } else {
        extractHTML(html);
    }
}

function extractHTML(html) {
    let $ = cheerio.load(html);
    let elementArr = $(".main-content");
    let text = $(elementArr[0]).text();   // fetch data in any element
    console.log("text data in body", text);
   


    fs.writeFile('webscrap.csv', text, function(err) {
      if (err) {
        //rama
          console.error('Error writing CSV file:', err);
      } else {
          console.log('CSV file has been saved!');
      }
  });
}


