const fs = require('fs').promises;
const path = require('path');

const { readFile } = fs;
const TALKERS_FILE = path.resolve(__dirname, '..', 'talker.json');

const getTalkers = async () => {
    try {
        const talkers = await readFile(TALKERS_FILE, 'utf8');
        const parseTalkers = JSON.parse(talkers);
        return parseTalkers;
    } catch (error) {
        return ({ message: error.message });
    }
};

module.exports = { getTalkers };