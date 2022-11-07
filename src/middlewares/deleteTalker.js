const fs = require('fs').promises;
const path = require('path');
const { getTalkers } = require('../functions/getTalkers');

const TALKERS_FILE = path.resolve(__dirname, '..', 'talker.json');

const deleteTalker = async (request, response) => {
    const removeId = request.params.id;

    let dataBaseTalker = await getTalkers();
    dataBaseTalker = dataBaseTalker.filter((talker) => talker.id !== parseInt(removeId, 10));

    await fs.writeFile(TALKERS_FILE, JSON.stringify(dataBaseTalker));
    return response.status(204).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = { deleteTalker };