import React from 'react';
import Web3 from 'web3';
import { ethers } from "ethers";
import dotenv from 'dotenv'
dotenv.config()
const web3 = new Web3(Web3.givenProvider);
const contractABI = require("../contract-abi.json");
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_TEST

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👉🏽 Awesome let's buy some stuff. 50 pieces max once",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else { 
    return {
      address: "",
      status: (
        <span>
          <p>
            {" 🦊 You must install "} 
            <a target="_blank" href={`https://metamask.io/download.html`} rel="noopener noreferrer" style={{textDecoration: 'underline'}}>
              Metamask
            </a>
            {"."}
            <br />
            {"A virtual Ethereum wallet in your browser."}
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👉🏽 Awesome let's buy some stuff. 50 pieces max once",
        };
      } else {
        return {
          address: "",
          status: "🦊 Please Connect to Metamask with the right button first.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" 🦊 You must install "} 
            <a target="_blank" href={`https://metamask.io/download.html`} rel="noopener noreferrer" style={{textDecoration: 'underline'}}>
              Metamask
            </a>
            {"."}
            <br />
            {"A virtual Ethereum wallet in your browser."}
          </p>
        </span>
      ),
    };
  }
};

export const mintNFT = async (amount, chain) => {

  function chainMap(chainID){
    if(chainID === "0x1") {
      return {
        name: "Mainnet",
        url: "https://etherscan.io/"
      }
    } else if(chainID === "0x3"){
      return {
        name: "Ropsten Test Network",
        url: "https://ropsten.etherscan.io/"
      }
    } else if(chainID === "0x4"){
      return {
        name: "Rinkeby Test Network",
        url: "https://rinkeby.etherscan.io/"
      }
    } else if(chainID === "0x5"){
      return {
        name: "Goerli Test Network",
        url: "https://goerli.etherscan.io/"
      }
    } else if(chainID === "0x2a"){
      return {
        name: "Kovan Test Network",
        url: "https://kovan.etherscan.io/"
      }
    }
  }

  if (chain !== process.env.REACT_APP_CHAIN_ID_TEST) {
    const result = chainMap(process.env.REACT_APP_CHAIN_ID_TEST);
    return {
      success: false,
      status: "😥 Something went wrong: You should be using " + result.name,
    };
  }
  const SamuraiContract = new web3.eth.Contract(contractABI, contractAddress);

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    value: ethers.utils.hexlify(ethers.utils.parseEther((parseInt(amount)*0.05).toString())).slice(2).replace(/^0+/, ''),//ethers.utils.hexlify(ethers.utils.parseEther((parseInt(amount)*0.05).toString())), // Only required to send ether to the recipient from the initiating external account.
    data: SamuraiContract.methods
      .mintSamurai(parseInt(amount))
      .encodeABI(),
    chainId: process.env.REACT_APP_CHAIN_ID_TEST,
  };
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    const result = chainMap(chain);
    return {
      success: true,
      //status: "✅ Check out your transaction on Etherscan: https://etherscan.io/tx/" + txHash + "\nYou can check it out on https://opensea.io/ after a while!" ,
      status: (
        <span>
          <p>
            {" ✅ Check out your transaction on "}
            <a target="_blank" href={result.url + 'tx/' + txHash} rel="noopener noreferrer" style={{textDecoration: 'underline'}}>
              Etherscan
            </a>
            <br />
            {"You can check it out on "}
            <a target="_blank" href={"https://opensea.io/account"} rel="noopener noreferrer" style={{textDecoration: 'underline'}}>
              Opensea
            </a>
            {" after a while!"}
          </p>
        </span>
      )
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};