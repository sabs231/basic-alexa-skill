const express = require('express');
const bodyParser = require('body-parser');
const context = require('aws-lambda-mock-context');

const app = express();
const PORT = 4001;

const lambda = require('./lambda');

app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) => {
  res.send('Try POSTing to /alexa');
});

app.get('/alexa', (req, res) => {
  res.send('Try with POST');
});

app.post('/alexa', (req, res) => {
  const ctx = context();
  lambda.handler(req.body, ctx);
  ctx.Promise
  .then(resp => { return res.status(200).json(resp); })
  .catch(err => { console.log(err); });
});

const server = app.listen(PORT, (err) => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('=> Server starting on http://%s:%s', host, port);
});
