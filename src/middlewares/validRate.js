const nullRate = (rate) => {
    if (!rate || rate === '' || rate === null) { return true; }
    return false;
};

const rateValid = (rate) => (Number.isInteger(rate) && rate >= 1 && rate <= 5);

const validRate = (request, response, next) => {
    const { talk } = request.body;
    try {
        if (!talk) throw new Error('O campo "talk" é obrigatório'); 
        if (nullRate(talk.rate)) throw new Error('O campo "rate" é obrigatório');
        if (!rateValid(talk.rate)) throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
    next();
};

module.exports = { validRate };