const express = require('express');
const path = require('path');
require('dotenv').config();
const { apiRouter } = require('./api');

const app = express();

const PORT = process.env.RDS_PORT || 8080;
const CLIENT_PATH = path.join(__dirname, '../client/dist');

app.use(express.static(CLIENT_PATH));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Listening on :${PORT} 🚀`);
});

module.exports = {
  app,
};