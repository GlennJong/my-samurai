const formattedReturn = require('./helpers/formattedReturn');
const getShogunateCnts = require('./ShogunateCntsHelper/getShogunateCnts.js');

exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        return await getShogunateCnts(event);
    } else {
        return formattedReturn(405, {});
    }
};
