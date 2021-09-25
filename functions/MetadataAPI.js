const formattedReturn = require('./helpers/formattedReturn');
const getMetadata = require('./MetadataHelper/getMetadata');
const createMetadata = require('./MetadataHelper/createMetadata');
const deleteMetadata = require('./MetadataHelper/deleteMetadata');
const updateMetadata = require('./MetadataHelper/updateMetadata');

exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        return await getMetadata(event);
    } else if (event.httpMethod === 'POST') {
        return await createMetadata(event);
    } else if (event.httpMethod === 'PUT') {
        return await updateMetadata(event);
    } else if (event.httpMethod === 'DELETE') {
        return await deleteMetadata(event);
    } else {
        return formattedReturn(405, {});
    }
};
