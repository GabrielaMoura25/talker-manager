const nullEmail = (email) => {
    if (!email || email === '' || email === null) { return true; }
    return false;
};

const validatedEmail = (email) => {
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const validEmail = regex.test(email);
    return validEmail;
};

const validEmail = (request, response, next) => {
    const { email } = request.body;
    try {
        if (nullEmail(email)) throw new Error('O campo "email" é obrigatório');
        if (!validatedEmail(email)) {
            throw new Error('O "email" deve ter o formato "email@email.com"');
        }
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
    next();
};

const nullPassword = (password) => {
    if (!password || password === '' || password === null) { return true; }
    return false;
};

const validatedPassword = (password) => {
    if (password.length >= 6) { return true; }
    return false;
};

const validPassword = (request, response, next) => {
    const { password } = request.body;
    try {
        if (nullPassword(password)) throw new Error('O campo "password" é obrigatório');
        if (!validatedPassword(password)) {
            throw new Error('O "password" deve ter pelo menos 6 caracteres');
        }
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
    next();
};

module.exports = { validEmail, validPassword };