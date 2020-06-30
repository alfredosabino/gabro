const messages = require('../config/messeges.json');

const getMessage = (path) => {
    return messages[path] || null;
};

module.exports = { getMessage };