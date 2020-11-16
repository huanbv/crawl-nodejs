const express = require('express');
const logger = require('morgan');
const crawler = require('./crawler');

const app = express();
app.use(logger('dev'));


const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`\nServer listening on port: ${PORT} - http://localhost:${PORT}`);
});


// route gốc của server
app.get('/', (req, res) => {
  res.status(200).send('Server running Ok.');
});


// route để đánh thức server
app.get('/wakeup', (req, res) => {

  // thực hiện cào dữ liệu
  crawler.start('https://cafef.vn');

  res.status(200).send('Ok');
});