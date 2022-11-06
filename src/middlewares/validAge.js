const nullAge = (age) => {
    if (!age || age === '' || age === null) { return true; }
    return false;
};

const ageValid = (age) => (age >= 18);

const validAge = (request, response, next) => {
    const { age } = request.body;
    if (nullAge(age)) {
        return response.status(400).json({ message: 'O campo "age" é obrigatório',
        });
    }
    if (!ageValid(age)) {
        return response.status(400)
        .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

module.exports = { validAge };