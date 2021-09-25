import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MobileSidebar from '../../components/MobileSidebar';
import SamuraiGalleryScreen from './SamuraiGalleryScreen'
import SamuraiDataScreen from './SamuraiDataScreen'
import ShogunateScreen from './ShogunateScreen'
import DesignScreen from './DesignScreen'
import { connectWallet, getCurrentWalletConnected, mintNFT} from "../../utils/Interact.js";
import { respondTo } from '../../utils/responsive';
import { zeroTransfer } from '../../utils/methods';

// 單一 NFT 資訊
const nftDataDemo = {"tokenId":79,"name":"Katana N' Samurai #0079","image":"https://gateway.pinata.cloud/ipfs/QmRFcV8QuCrNwbpjEsU6Q5EZKQGFoqZep2X8LnhWSQT8q2","description":"I used to kill an alien wearing a knitted cap.","attributes":[{"trait_type":"Rankings","value":8178,"max_value":10000},{"trait_type":"Ryoku","value":21,"max_value":66},{"trait_type":"Location","value":"夜の東京湾 Tokyo Wan at Night"},{"trait_type":"Clothes","value":"くまいささぐるま Kuma i-sa saguru ma"},{"trait_type":"Type","value":"人々 Human"},{"trait_type":"Eyes","value":"仁 Compassion"},{"trait_type":"Hats and Hairstyles","value":"カラフルのビーニー Beanie"},{"trait_type":"Accesories","value":"チェーンのめがね＋ペロ Glasses with Chain and Tongue Out"},{"trait_type":"Bushi Ranku","value":"Kashira"},{"trait_type":"Shogunate","value":"oda"}]}

const allDataDemo = [
  { id: 98, ranking: 31, image: 'http://placehold.it/300x300?text=98' },
  { id: 82, ranking: 43, image: 'http://placehold.it/300x300?text=82' },
  { id: 22, ranking: 42, image: 'http://placehold.it/300x300?text=22' },
  { id: 7,  ranking: 40, image: 'http://placehold.it/300x300?text=7' },
  { id: 77, ranking: 29, image: 'http://placehold.it/300x300?text=77' },
  { id: 78, ranking: 14, image: 'http://placehold.it/300x300?text=78' },
  { id: 34, ranking: 76, image: 'http://placehold.it/300x300?text=34' },
  { id: 96, ranking: 46, image: 'http://placehold.it/300x300?text=96' },
  { id: 10, ranking: 72, image: 'http://placehold.it/300x300?text=10' },
  { id: 8,  ranking: 22, image: 'http://placehold.it/300x300?text=8' },
  { id: 52, ranking: 47, image: 'http://placehold.it/300x300?text=52' },
  { id: 95, ranking: 85, image: 'http://placehold.it/300x300?text=95' },
  { id: 49, ranking: 3,  image: 'http://placehold.it/300x300?text=49' },
  { id: 79, ranking: 26, image: 'http://placehold.it/300x300?text=79' },
]

const id = 10;

const MySamuraiPage = () => {

  const [ nftData, setNftData ] = useState(nftDataDemo);
  const [ allData, setAllData ] = useState(null);
  const [ openDataScreen, setOpenDataScreen ] = useState(false);
  const [ currentSection, setCurrentSection ] = useState('samurai');
  const [ currentShogunate, setCurrentShogunate ] = useState(null);

  const [Metadata, setMetadata] = useState([]);
  const [ShogunateCnts, setShogunateCnts] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");
  const [tokensofOwner, setTokensofOwner] = useState([]);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress("");
        }
      });
    }
  }

  useEffect(() => {
    async function fetchWalletAPI() {
      const { address } = await getCurrentWalletConnected();
      setWalletAddress(address);
      addWalletListener();
    }
    fetchWalletAPI()
  }, []);

  const loadMetadata = async (nftID) => {
    try {
        const res = await fetch(`/api/MetadataAPI/${nftID}`);
        const Metadata = await res.json();
        setMetadata(Metadata);
        console.log(Metadata);
        
    } catch (error) {
        console.error(error);
    }
  };

  const getTokensofOwner = async (walletAddress) => {
    try {
        const res = await fetch('/api/TokensofOwnerAPI', {
                                method: 'PUT',
                                body: JSON.stringify({walletAddress}),
                                });
        const tokens = await res.json();
        setTokensofOwner(tokens);
        setAllData(tokens.allTokens);
        console.log(tokens.allTokens);

    } catch (err) {
        console.error(err);
    }
  };

  const getShogunateCnts = async() => {
    try {
      const res = await fetch(`/api/ShogunateCntsAPI`);
      const ShogunateCnts = await res.json();
      setShogunateCnts(ShogunateCnts);
      console.log(ShogunateCnts);
      
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    // 第一次請求所有 NFT
    // fetch().then(res => setAllData(res));
    loadMetadata(id);
    getTokensofOwner(walletAddress);
    getShogunateCnts();
  }, [walletAddress])

  console.log(allDataDemo);
  console.log(allData);

  useEffect(() => {
    // 請求所有 NFT 後，預設請求第一個 NFT
    // fetch().then(res => setNftData(res));
  }, [])
  
  function handleOpenDataScreen() {

    // 點擊下方 NFT 列表後，請求該 NFT
    // fetch().then(res => setNftData(res));
    
    setOpenDataScreen(true);
  }
  function handleCloseDataScreen() {
    setOpenDataScreen(false);
  }

  function handleEnterSamurai() {
    setCurrentSection('samurai');
  }

  function handleEnterShogunate() {
    setCurrentSection('shogunate');
  }
  
  function handleEnterDesign() {
    setCurrentSection('design');
  }

  function handleSelectedShogunate(shogunate) {
    setCurrentShogunate(shogunate)
  }
  
  return (
    <Root>
      { currentSection === 'samurai' &&
        <SamuraiScreen>
          <MobileSidebar
            title={`MY SAMURAI / #${zeroTransfer(nftData.tokenId)}`}
            onPrev={handleCloseDataScreen}
            open={openDataScreen}>
            { nftData && <SamuraiDataScreen data={nftData} onNext={handleEnterShogunate} /> }
          </MobileSidebar>
          { allData && <SamuraiGalleryScreen data={allData} onSelected={handleOpenDataScreen} />}
        </SamuraiScreen>
      }
      { currentSection === 'shogunate' && 
        <MobileSidebar
          title={`#${zeroTransfer(nftData.tokenId)} / SHOGUNATE`}
          onPrev={handleEnterSamurai}>
          { nftData &&
            <ShogunateScreen data={nftData} 
              onSelected={handleSelectedShogunate}
              onPrev={handleEnterSamurai}
              onNext={handleEnterDesign} />
          }
        </MobileSidebar>
      }
      { currentSection === 'design' && 
        <MobileSidebar
          title={`#${zeroTransfer(nftData.tokenId)} / DESIGN`}
          onPrev={handleEnterShogunate}>
          { nftData && 
            <DesignScreen
            shogunate={currentShogunate}
            data={nftData}
            onPrev={handleEnterShogunate} /> }
        </MobileSidebar>
      }
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: -30%;
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
    top: 400px;
    left: -30%;
    width: 750px;
    height: 420px;
    background-image: url('/images/cloud-2.png');
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

const SamuraiScreen = styled.div`
`

export default MySamuraiPage;