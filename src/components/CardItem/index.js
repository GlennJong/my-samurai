import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../constants/colors';
import { respondTo } from '../../utils/responsive';
import Img from '../Img';

const CardItem = ({ size, data, ...props }) => {
  const rootRef = useRef(null);
  const holderRef = useRef(null);
  const [ extend, setExtend ] = useState(false);
  const [ cardSize, setCardSize ] = useState(null);

  function handleExtendCard() {
    if (!cardSize) {
      setCardSize({
        left: rootRef.current.offsetLeft,
        width: rootRef.current.offsetWidth,
        height: rootRef.current.offsetHeight,
      })
      setTimeout(() => {
        setExtend(true);
      }, 300);
    }
    else {
      setExtend(!extend);
    }
  }

  function handleCloseCard() {
    setExtend(null);
    setTimeout(() => {
      setExtend(false);
    }, 10);
  }
  
  if (size === "lg") {
    return (
      <Root type="lg" ref={rootRef} {...props}>
        <Holder ref={holderRef} cardsize={cardSize}></Holder>
        <CardTemplate
          type="lg"
          cardsize={cardSize}
          extend={extend}
          data={data}
          onCoverClick={handleExtendCard} />
      </Root>
    )
  }
  else if (size === 'sm') {
    return (
      <Root type="sm" ref={rootRef} {...props}>
        <Holder ref={holderRef} cardsize={cardSize}></Holder>
        <CardTemplate
          type="sm"
          cardsize={cardSize}
          extend={extend}
          data={data}
          onCoverClick={handleExtendCard} />
      </Root>
    )
  }
}

const CardTemplate = ({data, type, extend, onCoverClick, cardsize, onCloseClick, ...props}) => {
  const { samurai, samurai_m, heading, heading_m, content, background, qty } = data;
  return (
    <Card cardsize={cardsize} background={background} extend={extend} type={type} {...props}>
      <Cover onClick={onCoverClick} />
      <Background type={type} extend={extend && type === 'sm'} src="/images/homepage-card-background.png" />
      <Button type={type} extend={extend} onClick={onCloseClick}><Img src="/images/homepage-button-icon.png" /></Button>
      <Heading type={type} extend={extend && type === 'sm'} src={heading} />
      <HeadingForMobile type={type} extend={extend && type === 'sm'} src={heading_m} />
      <Content type={type} extend={extend}>{content}</Content>
      <SamuraiWrapper>
        <SamuraiList extend={extend && type === 'sm'} ready={cardsize ? true : false}>
          {
            type === 'lg' &&
            <>
            <SamuraiItem extend={extend} type="lg"><Img className="image" src={samurai} /></SamuraiItem>
            <SamuraiItemMobile type="lg"><Img className="image" src={samurai_m} /></SamuraiItemMobile>
            </>
          }
          { type === 'sm' &&
            <>
            <SamuraiItem extend={extend} type="sm"><Img className="image" src={samurai} /></SamuraiItem>
            <SamuraiItemMobile type="sm"><Img className="image" src={samurai_m} /></SamuraiItemMobile>
            <SamuraiItemMirror extend={extend} type="sm"><Img className="image" src={samurai} /></SamuraiItemMirror>
            </>
          }
        </SamuraiList>
      </SamuraiWrapper>
      <Qty type={type} src={qty} extend={extend} />
    </Card>
  )
}


const Holder = styled.div`
  ${({ cardsize }) => cardsize && css`
    width: ${cardsize.width}px;
    height: ${cardsize.height}px;
  `}
`

const Root = styled.div`
  ${({ type }) => type === 'lg' && css`
    width: 100%;
  `}
  ${({ type }) => type === 'sm' && css`
    width: 33.33%;
    ${respondTo.md} {
      width: 100%;
    }
  `}
`

const Card = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  background-color: ${({ background }) => background };
  padding-top: 120px;
  overflow: hidden;
  transition: all 1s ease,
              z-index .1s ease 1s;
  box-sizing: border-box;
  ${({ cardsize }) => cardsize && css`
    position: absolute;
    left: ${cardsize.left}px;
    width: ${cardsize.width}px;
    height: ${cardsize.height}px;
    ${({ type }) => type === 'lg' && css`
      top: 0;
      z-index: 2;
    `}
    ${({ type }) => type === 'sm' && css`
      bottom: 0;
      z-index: 1;
    `}
  `}
  ${({ extend }) => extend && css`
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    transition: all 1s ease,
                z-index .1s ease;
  `}
  ${respondTo.md} {
    display: block;
    padding-top: 15px;
  }
`
const Cover = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  cursor: pointer;
  ${respondTo.md} {
    display: none;
  }
`

const Content = styled.div`
  position: absolute;
  left: 5%;
  font-size: 36px;
  font-weight: 600;
  width: 800px;
  max-width: 100%;
  color: ${colors.white};
  opacity: 0;
  transition: opacity .5s ease;
  ${({ type }) => type === 'lg' && css`
    top: 30%;
  `}
  ${({ type }) => type === 'sm' && css`
    top: 42%;
  `}
  ${({ extend }) => extend && css`
    opacity: 1;
    transition: opacity .5s ease .5s;
  `}
  ${respondTo.md} {
    position: relative;
    left: 0;
    opacity: 1;
    margin: 0 auto;
    width: 80%;
    font-size: 18px;
    text-align: center;
  }
`

const Background = styled(Img)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: opacity 1s ease;
  ${({ type }) => type === 'sm' && css`
    opacity: 0;
  `}
  ${({ extend }) => extend && css`
    opacity: 1;
  `}
  ${respondTo.md} {
    display: none;
  }
`

const SamuraiWrapper = styled.div`
  width: 100%;
`
const SamuraiList = styled.div`
  position: relative;
  width: 100%;
  white-space: nowrap;
  transition: transform 2s ease;
  ${({ extend }) => extend && css` transform: translateX(-200%); `};
`

const SamuraiItem = styled.div`
  display: inline-block;
  position: relative;
  bottom: -10px;
  width: 100%;
  .image {
    width: 50%;
    transition: width 2s ease;
    ${({ type }) => type === 'sm' && css`
      width: 80%;
      ${({ extend }) => extend && css` width: 50%`};
    `}
    ${respondTo.md} {
      width: 100%;
    }
  }
  ${respondTo.md} {
    display: none;
  }
`

const SamuraiItemMirror = styled(SamuraiItem)`
  transform: translateX(100%) scaleX(-1);
`

const SamuraiItemMobile = styled(SamuraiItem)`
  display: none;
  width: 100%;
  ${respondTo.md} {
    display: inline-block;
  }
`

const Button = styled.button`
  position: absolute;
  top: 28px;
  width: 82px;
  border: 0;
  background: transparent;
  transition: all 1s ease;
  ${({ type }) => type === 'lg' && css`width: 82px; right: 40px;`};
  ${({ type }) => type === 'sm' && css`width: 52px; right: 20px;`};
  ${({ extend }) => extend && css`width: 82px; right: 40px; transform: rotate(45deg);`}
  ${respondTo.md} {
    display: none;
  }
`

const Heading = styled(Img)`
  position: absolute;
  top: 12px;
  left: 0;
  width: 70%;
  transition: all 1s ease;
  ${({ extend }) => extend && css`
    left: 5%;
    width: 36%;
  `}
  ${respondTo.md} {
    display: none;
  }
`

const HeadingForMobile = styled(Heading)`
  display: none;
  ${respondTo.md} {
    display: block;
    position: relative;
    margin-left: 12px;
    margin-bottom: 24px;
    width: 60%;
  }
`

const Qty = styled(Img)`
  position: absolute;
  right: 32px;
  bottom: 5%;
  transition: all 1s ease;
  ${({ type }) => type === 'lg' && css`width: 160px`};
  ${({ type }) => type === 'sm' && css`width: 80px`};
  ${({ extend }) => extend && css`
    bottom: 60%;
    width: 160px;
  `};
  z-index: 2;
  ${respondTo.md} {
    top: 31px;
    bottom: auto;
    right: 20px;
    width: 80px;
  }
`


export default CardItem;