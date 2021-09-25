import React, { useState } from 'react';
import styled from 'styled-components';
import Img from '../../components/Img';
import ModalBox from '../../components/ModalBox';
import { colors } from '../../constants/colors';
import { respondTo } from '../../utils/responsive';
import { detectMob } from '../../utils/methods';

const GallerySection = ({ wording, qty=45, ...props }) => {
  const [ currentSamurai, setCurrentSamurai ] = useState(null);
  const [ openModal, setOpenModal ] = useState(false);
  const samuraiItems = detectMob() ? wording.mobile : wording.desktop;
  let secret;

  const zeroTransfer = (num) => {
    let str = num + "";
    const count = 4 - str.length; 
    for (let i = 0; i < count; i++) {
      str = "0" + str
    }
    return str;
  }
  
  function handleOpenModalBox(e) {
    const { samurai } = e.currentTarget.dataset;
    setCurrentSamurai(samurai);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  if (currentSamurai==5870) {
    secret = "#????";
  } else {
    secret = "#????";
  }
  
  return (
    <Root {...props}>
      <ModalBox open={openModal} onClose={handleCloseModal}>
        <ModalContent>
          <ModalImg fill="contain" src={`/images/samurai/samurai${currentSamurai}.jpg`} />
          <p>{secret}</p>
        </ModalContent>
      </ModalBox>
      <Wrapper>
        { samuraiItems.map((item, i) =>
          <WallItem key={i} data-samurai={item} onClick={handleOpenModalBox}>
            <Img src={`/images/samurai/samurai${item}.jpg`} />
            <p>{secret}</p>
          </WallItem>
        ) }
      </Wrapper>
    </Root>
  )
}



const Root = styled.div`
`
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const WallItem = styled.div`
  position: relative;
  width: calc(100% / 9);
  height: auto;
  cursor: pointer;
  ${respondTo.md} {
    width: calc(100% / 3);
    &:nth-child(10n) {
      width: 100%;
    }
  }
  img {
    position: relative;
    z-index: 0;
    transition: opacity .3s ease;
  }
  p {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    font-size: 36px;
    font-weight: 900;
    color: ${colors.white};
    text-align: center;
    transform: translateY(-50%);
    transition: opacity .3s ease;
    opacity: 0;
    z-index: 1;
  }
  &:hover {
    img {
      opacity: .25;
    }
    p {
      opacity: 1;
    }
  }
`

const ModalContent = styled.div`
  ${respondTo.md} {
    width: 100vw;
  }
  p {
    display: none;
    margin-top: 12px;
    color: ${colors.white};
    text-align: center;
    font-size: 36px;
    font-weight: 900;
    ${respondTo.md} {
      display: block;
    }
  }
`

const ModalImg = styled(Img)`
  ${respondTo.md} {
    width: 100%;
  }
`

export default GallerySection;