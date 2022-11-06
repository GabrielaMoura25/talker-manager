const nullToken = (authorization) => {
    if (!authorization || authorization === '' || authorization === null) { return true; }
    return false;
};

const tokenValid = (authorization) => {
    if (authorization.length >= 16 && typeof authorization === 'string') { return true; }
    return false;
};

const validToken = (request, response, next) => {
    const { authorization } = request.headers;
    try {
        if (nullToken(authorization)) throw new Error('Token não encontrado');
        if (!tokenValid(authorization)) throw new Error('Token inválido');
    } catch (error) {
        return response.status(401).json({ message: error.message });
    }
    next();
};

module.exports = { validToken };