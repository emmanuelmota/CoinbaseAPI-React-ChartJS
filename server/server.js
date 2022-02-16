const express = require('express');

const axios = require('axios').default;

const app = express();

app.use('/', express.static('public'));

app.get('/api', (req, res) => {
  axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2020-09-01&end=2020-09-30')
    .then((results) => {
      // console.log(results.data);
      res.status(200).send(results.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log('Mini App 2 is now listening on port 3000');
});
