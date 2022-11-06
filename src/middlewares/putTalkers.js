const fs = require('fs').promises;
const path = require('path');
const { getTalkers } = require('../functions/getTalkers');

const TALKERS_FILE = path.resolve(__dirname, '..', 'talker.json');

// Middleware para inclusão de um novo talker
const updateTalker = async (request, response) => {
    const dataToUpdate = request.body; // Carrega os dados da requisição
    delete dataToUpdate.id; // A paga a propriedade id, caso ela venha na requisição
    const { id } = request.params; // id da URL
    const talkersDatabase = await getTalkers(); // Carrega a base de dados atual

    const index = talkersDatabase.findIndex((talker) => talker.id === parseInt(id, 10)); // Descobre o indice do talker baseado no valor da chave id
    const propertiesToUpdate = Object.keys(dataToUpdate); // array com as chaves que serão alteradas

    propertiesToUpdate.forEach((key) => { // altera as propriedades
      talkersDatabase[index][key] = dataToUpdate[key];
    });

    await fs.writeFile(TALKERS_FILE, JSON.stringify(talkersDatabase)); // Grava os dados no arquivo
    return response.status(200).json(talkersDatabase[index]).end(); // Envia a confirmação
};

module.exports = { updateTalker };