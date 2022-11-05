const filterById = async (array, idRequest) => {
    try {
        const filtered = array.find((talker) => talker.id === parseInt(idRequest, 10));
        return filtered;
    } catch (error) {
        return ({ message: error });
    }
};

module.exports = { filterById };