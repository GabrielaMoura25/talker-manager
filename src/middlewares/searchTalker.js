const { getTalkers } = require('../functions/getTalkers');

const searchTalker = async (request, response) => {
    const dataBaseTalker = await getTalkers();
    const { q } = request.query;
    const filteredTalker = dataBaseTalker.filter((talker) =>
     String(talker.name).includes(q));
     if (!q) { return response.status(200).json(dataBaseTalker); }
    return response.status(200).json(filteredTalker);
};

module.exports = { searchTalker };