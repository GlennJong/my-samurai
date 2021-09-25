var Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.REACT_APP_NODE_TEST));
const contractABI = require("../helpers/contract-abi-test.json");
const formattedReturn = require('../helpers/formattedReturn');
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_TEST
const SamuraiContract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = async (event) => {
    console.log(`Function 'getShogunateCnts' invoked`);

    const ShogunateName = ["Kamakura S", "Kamakura M", "Kamakura L", "Kamakura XL", "Muromachi S", "Muromachi M", "Muromachi L", "Muromachi XL", "Edo S", "Edo M", "Edo L", "Edo XL",
    "Oda S", "Oda M", "Oda L", "Oda XL", "Imperial S", "Imperial M", "Imperial L", "Imperial XL"]

    var i = 0;
    var Kamakura = 0;
    var Muromachi = 0;
    var Edo = 0;
    var Oda = 0;
    var Imperial = 0;
    var shogunate = 0;

    for (i = 0; i < ShogunateName.length; i++){
        shogunate = await web3.eth.call({
            to: contractAddress,
            data: SamuraiContract.methods.shogunateQuantity(ShogunateName[i]).encodeABI()
        }).then(function (result){
            
            shogunate_result = parseInt(result, 16);

            //console.log(shogunate_result);
            if (i < 4){
                Kamakura = Kamakura + shogunate_result;
            }
            if (3 < i){
                if (i < 8){
                    Muromachi = Muromachi + shogunate_result;
                }	
            }
            if (7 < i){
                if (i < 12){
                    Edo = Edo + shogunate_result;
                } 	
            }
            if (12 < i){
                if (i < 16){
                    Oda = Oda + shogunate_result;
                } 	
            }
            if (15 < i){
                if (i < 20){
                    Imperial = Imperial + shogunate_result;
                } 	
            }
        });
    }

    const result = {shogunate: [
        { Kamakura: Kamakura},
        { Muromachi: Muromachi},
        { Edo: Edo},
        { Oda: Oda},
        { Imperial: Imperial},]}
    
    try {
        return formattedReturn(200, result);
    } catch (err) {
        console.log('error', err)
        return {
            statusCode: 400,
            body: JSON.stringify(err)
        }
    }
};