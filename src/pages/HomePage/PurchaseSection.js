import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Img from '../../components/Img';
import { colors } from '../../constants/colors';
import { nl2br } from '../../utils/wordingSystem';
import { Plus, Minus } from '../../components/Icons';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import { detectMob } from '../../utils/methods';
import { respondTo } from '../../utils/responsive';
import walletStatus from '../../store/walletStatus';
import { connectWallet, getCurrentWalletConnected, mintNFT} from "../../utils/Interact.js";
// import dotenv from 'dotenv'
// import Web3 from 'web3';
import { isAndroid, isIOS } from "react-device-detect";
import { mode } from '../../constants/mode';

// dotenv.config()

// let web3;
// if (mode !== 'dev') {
//   web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.REACT_APP_NODE_TEST));
// }

// const contractABI = require("../../contract-abi.json");
// const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_TEST

const PurchaseSection = ({ wording, ...props }) => {
  const [ qty, setQty ] = useState(1);
  const [ active, setActive ] = useState(false);
  const soldWrapperRef = useRef(null);

  const [status, setStatus] = useState("");
  const [cursells,setCurSells]=useState(0);
  const [curRemain,setCurRemain]=useState(10000);
  const [curPhase,setCurPhase]=useState("");
  const [curChain,setCurChain]=useState("");
  const { connectId } = useSelector(state => state.walletStatus);

  const dispatch = useDispatch(walletStatus);
  const { status:currentWalletStatus, hint:hint } = useSelector(state => state.walletStatus);

  useEffect(() => {

    if (currentWalletStatus === 'connect') {
      // do somthing for connection
      //dispatch(walletStatus.actions.setConnectId(""));
    }
    else if (currentWalletStatus === 'disconnect') {
      // do something for disconnection
      //dispatch(walletStatus.actions.setConnectId(""));
    }
  }, [currentWalletStatus])

  useEffect(() => {
    async function fetchWalletAPI() {
      if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setCurChain(chainId);
        //console.log(chainId);
      }
      CurChainListener();
    }
    fetchWalletAPI()
  }, []);

  function CurChainListener(){
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (ChainId) => {
        setCurChain(ChainId);
        //console.log(ChainId);
      });
    }
  }

  const onMintPressed = async (amount, chain) => {
    // eslint-disable-next-line
    const { success, status } = await mintNFT(amount, chain);
    setStatus(status);
  };

  // useEffect(() => {
  //   if (mode !== 'dev') {
  //     const SamuraiContract = new web3.eth.Contract(contractABI, contractAddress);
  //     SamuraiContract.events.mintEvent({
  //         filter:{},
  //         fromBlock: 13022222,
  //       }, function(error, event){/*console.log(event);*/}).on("data", function(event) {
  //         setCurSells(event.returnValues.totalSupply);
  //         if(parseInt(event.returnValues.totalSupply) < 1000){
  //           setCurRemain(1000-parseInt(event.returnValues.totalSupply))
  //           setCurPhase("ONE")
  //         } else if (parseInt(cursells) < 2000){
  //           setCurRemain(2000-parseInt(event.returnValues.totalSupply))
  //           setCurPhase("TWO")
  //         } else if (parseInt(cursells) < 3000){
  //           setCurRemain(3000-parseInt(event.returnValues.totalSupply))
  //           setCurPhase("THREE")
  //         } else if (parseInt(cursells) < 4000){
  //           setCurRemain(4000-parseInt(event.returnValues.totalSupply))
  //           setCurPhase("FOUR")
  //         } else if (parseInt(cursells) < 5000){
  //           setCurRemain(5000-parseInt(event.returnValues.totalSupply))
  //           setCurPhase("FIVE")
  //         } else if (parseInt(cursells) < 6000){
  //           setCurRemain(6000-parseInt(event.returnValues.totalSupply))
  //           setCurPhase("SIX")
  //         } else if (parseInt(cursells) < 7000){
  //           setCurRemain(7000-parseInt(event.returnValues.totalSupply))
  //           setCurPhase("SEVEN")
  //         } else if (parseInt(cursells) < 8000){
  //           setCurRemain(8000-parseInt(event.returnValues.totalSupply))
  //           setCurPhase("EIGHT")
  //         } else if (parseInt(cursells) < 9000){
  //           setCurRemain(9000-parseInt(event.returnValues.totalSupply))
  //           setCurPhase("NINE")
  //         } else if (parseInt(cursells) < 10000){
  //           setCurRemain(10000-parseInt(event.returnValues.totalSupply))
  //           setCurPhase("TEN")
  //         }
  //       }).on('error', console.error);
  //   }
  // }, [])

  //console.log(cursells)

  useIntersectionObserver(soldWrapperRef, handleActiveAnimation, {
    root: null,
    rootMargin: '0px  0px -200px 0px',
    threshold: 0
  });

  function handleActiveAnimation(e) {
    if (e[0].isIntersecting && !detectMob()) {
      setActive(true);
    }
    else {
      setActive(false);
    }
  }

  function handleAddQty() {
    if (qty<=49){
      let currentQty = Math.max(qty+1, 1);
      setQty(currentQty);
    }
  }

  function handleDecreaseQty() {
    let currentQty = Math.max(qty-1, 1);
    setQty(currentQty);
  }
  
  function handleSetQty(value) {
    if (value<=50){
      setQty(value);
    } else {
      setQty(50);
    }
  }

  const handleClickWalletButton = async() => {

    if (isAndroid || isIOS){
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        window.location = "https://metamask.app.link/dapp/www.samuraipunks.com";
      } else {
        const walletResponse = await connectWallet();
        if (walletResponse.address.length > 0){
          dispatch(walletStatus.actions.connectWallet());
          dispatch(walletStatus.actions.setConnectId('🦊 : ' + walletResponse.address.slice(0,6) + '...' + walletResponse.address.slice(-4)));
          dispatch(walletStatus.actions.setHint("👉🏽 Awesome let's buy some stuff. 50 pieces max once"));
        }
      }
    } else {
      const walletResponse = await connectWallet();
      if (walletResponse.address.length > 0){
        dispatch(walletStatus.actions.connectWallet());
        dispatch(walletStatus.actions.setConnectId('🦊 : ' + walletResponse.address.slice(0,6) + '...' + walletResponse.address.slice(-4)));
        dispatch(walletStatus.actions.setHint("👉🏽 Awesome let's buy some stuff. 50 pieces max once"));
      }
    }
  }

  //10000-parseInt(cursells)

  return (
    <Root {...props}>
      <BuyWrapper id="purchase">
        <Container>
          <Cover src="/images/homepage-purchase-cover.png" />
          <Purchase>
            <Img className="logo" src="/images/homepage-purchase-logo-2.png" />
            <Display> BUY 3 GET 1 </Display>
            <p className="info">{ nl2br(wording.title) }</p>
            { wording.items.map((item, i) => 
              <p className="info" key={i}>{item.title} : {item.percent}%</p>
            ) }
            <Price>
              <div className="title">PRICE</div>
              <div className="amount">
                <Img className="icon" src="/images/icon-coin.svg" />
                <p className="price">{ (wording.price * qty).toFixed(2) }</p>
              </div>
            </Price>
            <Qty>
              <div className="title">QUANTITY</div>
              <div className="buy">
                <QtySelector qty={qty} 
                  onPlusClick={handleAddQty}
                  onMinusClick={handleDecreaseQty}
                  onQtyInput={handleSetQty}
                />
                <p className="hint"> PHASE {curPhase} <br></br> {curRemain} REMAINING</p>
              </div>
            </Qty>
            <Container>
              <BuyButton onClick={() => onMintPressed(qty, curChain)}> PURCHASE </BuyButton>
              <ConnectButton onClick={handleClickWalletButton}> { connectId || 'CONNECT WALLET' } </ConnectButton>
            </Container>
            <Hint>{ status || hint }</Hint>
          </Purchase>
        </Container>
      </BuyWrapper>
      <SoldWrapper ref={soldWrapperRef} id="road-map">
        <Container>
          <SoldList active={active}>
            { wording.sold.map((item, i) =>
              <SoldItem key={i}>
                <div className="percent">
                  <p className="value"><span>{item.percent}</span><span className="unit">%</span></p>
                  <p className="sold">SOLD</p>
                </div>
                <div className="content" dangerouslySetInnerHTML={{__html: item.content}}></div>
              </SoldItem>
            ) }
          </SoldList>
        </Container>
        <SideSamurai active={active} src="/images/home-purchase-samurai.png" />
      </SoldWrapper>
    </Root>
  )
}

const QtySelector = ({ qty, onPlusClick, onMinusClick, onQtyInput }) => {

  function handleChangeQty(e) {
    const value = Number(e.currentTarget.value);
    (value !== NaN && value >= 0) && onQtyInput(value);
  }

  return (
    <Selector>
      <QtyButton disabled={qty <= 1} onClick={onMinusClick}><Minus /></QtyButton>
      <input className="qty" type="text" value={qty} onChange={handleChangeQty} />
      <QtyButton disabled={false} onClick={onPlusClick}><Plus /></QtyButton>
    </Selector>
  )
}

const Root = styled.div`
  background: ${colors.black};
`
const Container = styled.div`
  display: flex;
  margin: 0 auto;
  width: 980px;
  max-width: 100%;
  ${respondTo.md} {
    display: block;
  }
`
const BuyWrapper = styled.div`
  position: relative;
  padding-top: 250px;
  padding-bottom: 280px;
  z-index: 0;
  overflow: hidden;
  ${respondTo.md} {
    padding: 0 42px;
    box-sizing: border-box;
    padding-top: 110px;
    padding-bottom: 120px;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: -25%;
    width: 750px;
    height: 420px;
    background-image: url('/images/cloud-1.png');
    background-size: contain;
    background-repeat: no-repeat;
    z-index: -1;
    ${respondTo.md} {
      top: 0;
      right: -40%;
      width: 350px;
      height: 300px;
    }
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -10%;
    width: 750px;
    height: 420px;
    background-image: url('/images/cloud-1.png');
    background-size: contain;
    background-repeat: no-repeat;
    z-index: -1;
    ${respondTo.md} {
      bottom: auto;
      top: 34%;
      left: -40%;
      width: 350px;
      height: 300px;
      transform: scaleX(-1);
    }
  }
`

const Cover = styled(Img)`
  width: 55%;
  ${respondTo.md} {
    margin-bottom: 60px;
    width: 100%;
  }
`

const Purchase = styled.div`
  padding-left: 140px;
  width: 45%;
  color: ${colors.white};
  box-sizing: border-box;
  ${respondTo.md} {
    padding-left: 0;
    width: 100%;
  }
  .logo {
    margin-bottom: 6px;
  }
  .info {
    margin-left: 4px;
    font-size: 18px;
  }
`

const Hint = styled.div`
  margin-top: 8px;
  word-wrap: break-word;
  width: 400px;
`

const Price = styled.div`
  margin-top: 30px;
  margin-bottom: 8px;
  .title {
    font-size: 18px;
  }
  .amount {
    .icon {
      display: inline-block;
      vertical-align: baseline;
      margin-right: 12px;
      width: 26px;
    }
    .price {
      display: inline-block;
      vertical-align: baseline;
      margin-right: 8px;
      font-size: 48px;
      font-weight: 900;
    }
    .hint {
      display: inline-block;
      position: relative;
      top: -2px;
      vertical-align: baseline;
      font-size: 18px;
    }
  }
`

const Qty = styled.div`
  margin-top: 30px;
  .title {
    margin-bottom: 14px;
    font-size: 18px;
  }
  .buy {
    display: flex;
    .hint {
      margin-left: 12px;
      font-size: 18px;
    }
  }
`

const BuyButton = styled.button`
  border: 0;
  margin-top: 72px;
  width: 180px;
  height: 60px;
  border: 1px solid ${colors.white};
  background: ${colors.white};
  color: ${colors.black};
  font-size: 20px;
  font-weight: 900;
  &:active {
    background: transparent;
    color: ${colors.white};
  }
`

const ConnectButton = styled.button`
  border: 0;
  margin-top: 72px;
  margin-left: 15px;
  width: 180px;
  height: 60px;
  border: 1px solid ${colors.white};
  background: ${colors.white};
  color: ${colors.black};
  font-size: 15.5px;
  font-weight: 900;
  &:active {
    background: transparent;
    color: ${colors.white};
  }
`

const Display = styled.div`
  border: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 180px;
  height: 35px;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
  border: 1px solid ${colors.white};
  background: ${colors.white};
  color: ${colors.black};
`

const Selector = styled.div`
  display: flex;
  .qty {
    border: 0;
    border-top: 1px solid ${colors.white};
    border-bottom: 1px solid ${colors.white};
    height: 28px;
    width: 60px;
    line-height: 30px;
    font-size: 24px;
    font-weight: 900;
    color: ${colors.white};
    background: transparent;
    text-align: center;
  }
`

const QtyButton = styled.button`
  border: 1px solid ${colors.white};
  padding: 0;
  width: 32px;
  height: 32px;
  line-height: 1;
  font-size: 12px;
  background: ${colors.white};
  color: ${colors.black};
  &:disabled {
    background: transparent;
    color: ${colors.white};
  }
`

const SoldWrapper = styled.div`
  position: relative;
  padding-bottom: 100px;
  z-index: 0;
  background-image: url('/images/homepage-purchase-background.png');
  background-position: left bottom;
  background-repeat: no-repeat;
  background-size: 640px;
  overflow: hidden;
  ${respondTo.md} {
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
    background-size: 80%;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 10%;
    right: 0%;
    width: 750px;
    height: 420px;
    background-image: url('/images/cloud-1.png');
    background-size: contain;
    background-repeat: no-repeat;
    z-index: -1;
    ${respondTo.md} {
      display: none;
    }
  }
`
const SideSamurai = styled(Img)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 600px;
  opacity: 0;
  transform: translateX(50%);
  transition: all 1s ease .3s;
  ${({ active }) => active && css`
    opacity: 1;
    transform: translateX(0);
  `}
  ${respondTo.md} {
    position: relative;
    margin-left: auto;
    width: 80%;
    opacity: 1;
    transform: translateX(20px);
  }
`

const SoldList = styled.div`
  width: 360px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease .3s;
  ${({ active }) => active && css`
    opacity: 1;
    transform: translateY(0);
  `}
  ${respondTo.md} {
    width: 100%;
    opacity: 1;
    transform: translateX(0);
  }
`
const SoldItem = styled.div`
  display: flex;
  margin-bottom: 24px;
  color: ${colors.white};
  ${respondTo.md} {
    margin-bottom: 20px;
  }
  .percent {
    margin-right: 24px;
    ${respondTo.md} {
      margin-right: 10px;
    }
    .value {
      white-space: nowrap;
      span:first-child {
        display: inline-block;
        vertical-align: baseline;
        margin-right: 2px;
        font-size: 40px;
        line-height: 40px;
        font-weight: 900;
      }
      span:nth-child(2) {
        display: inline-block;
        vertical-align: baseline;
        font-size: 12px;
        font-weight: 900;
      }
    }
    .sold {
      font-size: 12px;
      font-weight: 900;
    }
  }
  .content {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.33;
    b {
      font-weight: normal;
      color: ${colors.highlight};
    }
  }
`

export default PurchaseSection;