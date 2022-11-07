const fs = require('fs').promises;
const path = require('path');
const { getTalkers } = require('../functions/getTalkers');

const TALKERS_FILE = path.resolve(__dirname, '..', 'talker.json');

const updateTalker = async (request, response) => {
    const { name, age, talk } = request.body;
    const { id } = request.params;
    const talkersDatabase = await getTalkers();

    const index = talkersDatabase.findIndex((talker) => talker.id === parseInt(id, 10));
   
    talkersDatabase[index].name = name;
    talkersDatabase[index].age = age;
    talkersDatabase[index].talk = talk;

    await fs.writeFile(TALKERS_FILE, JSON.stringify(talkersDatabase));
    return response.status(200).json(talkersDatabase[index]);
};

module.exports = { updateTalker };