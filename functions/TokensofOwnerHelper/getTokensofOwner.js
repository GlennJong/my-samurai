var Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.REACT_APP_NODE_TEST));
const contractABI = require("../helpers/contract-abi.json");
const formattedReturn = require('../helpers/formattedReturn');
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_TEST
const SamuraiContract = new web3.eth.Contract(contractABI, contractAddress);
const faunadb = require('faunadb')
const q = faunadb.query

module.exports = async (event) => {
    console.log(event.body);
    const { walletAddress } = JSON.parse(event.body);
    console.log(`Function 'getTokensofOwner' invoked. Read id: ${walletAddress}`);
    const client = new faunadb.Client({secret: process.env.REACT_APP_FAUNA_KEY});
    const tokens = {allTokens: []};
    
    if (walletAddress.length>0){
        var result = await web3.eth.call({
            to: contractAddress, // contract address
            data: SamuraiContract.methods.tokensOfOwner("0xbd42a2035d41b450ee7106c9f9c0c736fb546226").encodeABI()
        }).then(async function(result){
            // console.log(`Result: ${result}`);

            for (var i = 0; i < (result.length - 130) / 64; i++){
                var tokenID = 0;
                var body;
                tokenID = parseInt(result.substr(130 + 64 * i, 64), 16)
                //console.log(`Result: ${tokenID}`);
                var Metadata = await client.query(q.Get(q.Ref(q.Collection('Metadata'), tokenID)))
                .then((response) => {
                    body = {id: response.data.tokenId, ranking: response.data.attributes[0].value, image: response.data.image};
                    tokens.allTokens.push(body);
                }).catch((error) => {
                    console.log('error', error)
                })
            }
        });
    }

    const test = {allTokens: [
        { id: 98, ranking: 31, image: 'http://placehold.it/300x300?text=98' },
        { id: 82, ranking: 43, image: 'http://placehold.it/300x300?text=82' },
        { id: 22, ranking: 42, image: 'http://placehold.it/300x300?text=22' },]}
    //console.log(test);

    try {
        console.log('success', walletAddress);
        console.log('success', tokens);
        return formattedReturn(200, tokens);
    } catch (err) {
        console.log('error', err)
        return formattedReturn(400, err);
    }
};