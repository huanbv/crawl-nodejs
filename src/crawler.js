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
        
            $('.tlitem').each((index, el) => {
                const thumbnailUrl = $(el).find('a.avatar > img').attr('src');
                const detailUrl = $(el).find('a.avatar').attr('href');
                const name = $(el).find('.knswli-right h3 a').text();
                const category = $(el).find('.knswli-right .time_cate').find('a').text();
                const time = $(el).find('.knswli-right .time_cate .gachngoai > span > .time').attr('title');
                const description = $(el).find('.knswli-right .sapo').text();
        
                let currentData = {
                    thumbnailUrl, 
                    detailUrl,
                    name,
                    category, 
                    date: time.split('T')[0],
                    time: time.split('T')[1],
                    description
                };

                data.push(currentData);
            });
        
            // lưu dữ liệu vào data.json
            fs.writeFile('data.json', JSON.stringify({news: data}), (err) => {
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
