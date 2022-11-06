const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { getTalkers } = require('./functions/getTalkers');
const { filterById } = require('./functions/filterById');
const { validEmail, validPassword } = require('./functions/validateLogin');
const { validAge } = require('./middlewares/validAge');
const { validName } = require('./middlewares/validName');
const { validRate } = require('./middlewares/validRate');
const { validWatchedAt } = require('./middlewares/validWatchedAt');
const { validToken } = require('./middlewares/validToken');
const { validTalker } = require('./middlewares/validTalker');
const { updateTalker } = require('./middlewares/putTalkers');

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

// rota para acessar o contéudo de talkers.json filtrando por id
app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await getTalkers();
  const filterTalker = await filterById(talkers, id);
  if (!filterTalker || filterTalker.length === 0) {
    return response.status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(200).json(filterTalker);
});

// rota para validar login e gerar um token
app.post('/login', validEmail, validPassword, (_request, response) => {
  const token = crypto.randomBytes(8).toString('hex');
  return response.status(200).json({ token: `${token}` });
});

app.use(validToken);

// rota para cadastrar novo palestrante
app.post('/talker', validToken, validName, validAge,
validRate, validWatchedAt, validTalker, async () => {});

// rota para alterar palestrante
app.put('/talker/:id', validToken, validName, validAge, 
validRate, validWatchedAt, updateTalker, async () => {});