const fs = require('fs').promises;
const path = require('path');

const TALKERS_FILE = path.resolve(__dirname, '..', 'talker.json');
const { getTalkers } = require('../functions/getTalkers');

const validTalker = async (request, response) => {
    const requestTalker = request.body;
    const talkerDataBase = await getTalkers();
    const oldId = talkerDataBase[talkerDataBase.length - 1].id + 1;
    const newId = { id: oldId, ...requestTalker };

    talkerDataBase.push(newId);
   
    await fs.writeFile(TALKERS_FILE, JSON.stringify(talkerDataBase, null, 2));
    return response.status(201).json(newId);
};

module.exports = { validTalker };