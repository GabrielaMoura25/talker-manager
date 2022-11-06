const nullName = (name) => {
    if (!name || name === '' || name === null) { return true; }
    return false;
};

const nameValid = (name) => {
    if (name.length >= 3 && typeof name === 'string') { return true; }
    return false;
};

const validName = (request, response, next) => {
    const { name } = request.body;
    try {
        if (nullName(name)) throw new Error('O campo "name" é obrigatório');
        if (!nameValid(name)) throw new Error('O "name" deve ter pelo menos 3 caracteres');
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
    next();
};

module.exports = { validName };