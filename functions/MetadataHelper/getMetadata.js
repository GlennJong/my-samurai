const formattedReturn = require('../helpers/formattedReturn');
const faunadb = require('faunadb')
const q = faunadb.query

module.exports = async (event) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.REACT_APP_FAUNA_KEY
  }) 
  const id =  event.path.match(/([^\/]*)\/*$/)[0]
  console.log(`Function 'getMetadata' invoked. Read id: ${id}`)
  return await client.query(q.Get(q.Ref(q.Collection('Metadata'), id)))
    .then((response) => {
      //console.log('success', response.data)
      return formattedReturn(200, response.data);
    }).catch((error) => {
      console.log('error', error)
      return formattedReturn(400, error);
    })
}