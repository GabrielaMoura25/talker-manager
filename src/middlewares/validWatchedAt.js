const nullWatchedAt = (watchedAt) => {
    if (!watchedAt || watchedAt === '' || watchedAt === null) { return true; }
    return false;
};

const watchedAtValid = (watchedAt) => {
    const regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    return regex.test(watchedAt);
};

const validWatchedAt = (request, response, next) => {
    const { talk: { watchedAt } } = request.body;
    try {
        if (nullWatchedAt(watchedAt)) throw new Error('O campo "watchedAt" é obrigatório');
        if (!watchedAtValid(watchedAt)) {
            throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
        }
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
    next();
};

module.exports = { validWatchedAt };