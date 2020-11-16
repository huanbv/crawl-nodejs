const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs');
const importer = require('./import');

module.exports = {start};


function start(siteUrl) {
    console.log('\nCrawling from:', siteUrl, '...');

    request(siteUrl, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            let data = [];
        
            $('.knswli-right').each((index, el) => {
                const name = $(el).find('h3 a').text();
                const category = $(el).find('p.time_cate').find('a').text();
                const description = $(el).find('p.sapo').text();
        
                data.push({
                name,category, description
                });
            });
        
            // lưu dữ liệu vào data.json
            fs.writeFile('data.json', JSON.stringify({users: data}), (err) => {
                if (!err) {

                    // đẩy dữ liệu lên FireStore
                    importer.jsonToFirestore()
                        .then(() => {
                            console.log('Upload Success');
                        })
                        .catch(err => {
                            console.log('\n', err);
                        });
                }
            });
        }
        else {
            console.log(error);
        }
  });
}
