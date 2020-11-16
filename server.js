const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs');

// request('https://123job.vn/tuyen-dung', (error, response, html) => {
//   if(!error && response.statusCode == 200) {
//     const $ = cheerio.load(html);
//     let data = []
//     $('.job__list-item').each((index, el) => {
//       const job = $(el)      .find('.job__list-item-title a')                .text();
//       const description = $(el)   .find('.job__list-item-teaser')            .text();
//       const company = $(el)  .find('.job__list-item-company span')           .text();
//       const address = $(el)  .find('.job__list-item-info').find('.address')  .text();
//       const salary = $(el)   .find('.job__list-item-info').find('.salary')   .text();

//       data.push({
//         job,description, company, address, salary
//       });
//     });

  request('https://cafef.vn', (error, response, html) => {
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    let data = []
    $('.knswli-right').each((index, el) => {
      const name = $(el).find('h3 a').text();
      const category = $(el).find('p.time_cate').find('a').text();
      const description = $(el).find('p.sapo').text();

      data.push({
        name,category, description
      });
    });

    fs.writeFileSync('data.json', JSON.stringify(data));
   // console.log(data);
  }
  else {
    console.log(error);
  }
  
});