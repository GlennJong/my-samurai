const formattedReturn = require('./helpers/formattedReturn');
const getTokensofOwner = require('./TokensofOwnerHelper/getTokensofOwner.js');

exports.handler = async (event) => {
    if (event.httpMethod === 'PUT') {
        return await getTokensofOwner(event);
    } else {
        return formattedReturn(405, {});
    }
};
