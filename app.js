require('dotenv').config();
const addy = require('./utils/address');
const nem = require('./utils/nem');
const bodyParser = require('body-parser');
const express = require('express');
const { processTransaction } = require('./controllers/transactionController');

const app = express();

const port = process.env.PORT;
const depositAddressList = addy.getAddressList('nem');
const nemServer = nem.getNEMServer();
const updateUrl = process.env.NEM_UPDATE_URL;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  const name = process.env.HEROKU_APP_NAME;
  const version = process.env.HEROKU_RELEASE_VERSION;
  res.json({ "name": name, "version": version });
});

app.post('/transaction/update', async function (req, res) {
  let count = 0;
  let total = 0;
  const allErrors = [];

  try {
    if (!depositAddressList || !nemServer || !updateUrl) {
      throw new Error('Missing required configuration values');
    }

    const promises = depositAddressList.map(async (address) => {
      const errors = await processTransaction(address, nemServer, updateUrl);
      allErrors.push(...errors);
    });

    await Promise.all(promises);

    if (allErrors.length > 0) {
      res.status(500).send({ status: 500, error: allErrors });
    } else {
      res.status(200).send({ status: 200, error: allErrors });
    }
  } catch (error) {
    res.status(500).send({ status: 500, error: `An error occurred: ${error}` });
  }
});
app.listen
