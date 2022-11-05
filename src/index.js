const express = require('express');
const bodyParser = require('body-parser');
const { getTalkers } = require('./functions/getTalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// rota talkers.json
app.get('/talker', async (_request, response) => {
  const talkers = await getTalkers();
  return response.status(200).json(talkers);
});
