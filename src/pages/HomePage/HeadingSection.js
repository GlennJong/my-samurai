import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../constants/colors';
import Img from '../../components/Img';
import { scrollTo } from '../../utils/scrollTo';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import { respondTo } from '../../utils/responsive';
import { detectMob } from '../../utils/methods';

const HeadingSection = ({ ...props }) => {
  const rootRef = useRef(null);
  const [ active, setActive ] = useState(false);
  useIntersectionObserver(rootRef, handleActiveAnimation, {
    root: null,
    rootMargin: '-400px 0px 0px 0px',
    threshold: 0
  });

  function handleActiveAnimation(e) {
    if (e[0].isIntersecting) {
      setActive(true);
    }
    else {
      setActive(false);
    }
  }
  
  function handleScrollScreen() {
    scrollTo(2, window.innerHeight);
  }
  
  return (
    <Root ref={rootRef} {...props}>
      <Wrapper>
        <div className="logo">
          <Logo active={active} src="/images/homepage-heading-logo-2.png" alt="" />
        </div>
        <div className="background">
          <Background active={active} fill={detectMob() ? "height" : "cover"} src="/images/homepage-heading-background.png" alt="" />
        </div>
        <div className="samurai left">
          <Samurai active={active} left src="/images/homepage-heading-1.png" alt="" />
        </div>
        <div className="samurai right">
          <Samurai active={active} right src="/images/homepage-heading-3.png" alt="" />
        </div>
        <div className="start">
          <Start active={active} src="/images/homepage-heading-start.png" alt="" onClick={handleScrollScreen} />
        </div>
      </Wrapper>
      <ScrollHint active={active}>
        <p>START</p>
        <Img className="icon" src="/images/homepage-heading-hint.png" />
      </ScrollHint>
    </Root>
  )
}


const Root = styled.div`
  padding-top: 72px;
  ${respondTo.md} {
    padding-top: 48px;
  }
`

const ScrollHint = styled.div`
  display: none;
  ${'' /* background: ${colors.black}; */}
  padding: 12px 0;
  height: 72px;
  color: ${colors.white};
  text-align: center;
  box-sizing: border-box;
  > p {
    font-size: 18px;
    font-weight: 600;

  }
  > .icon {
    display: inline-block;
    width: 26px;
  }
  opacity: 0;
  transform: translateY(-10%);
  transition: all 2s cubic-bezier(.79,.01,.42,1.81);
  ${({ active }) => active && css`
    opacity: 1;
    transform: translateY(0);
  `}
  ${respondTo.md} {
    display: block;
  }
`

const Wrapper = styled.div`
  position: relative;
  height: calc(100vh - 72px);
  background: ${colors.black};
  overflow: hidden;
  box-sizing: border-box;
  ${respondTo.md} {
    height: calc(100vh - 120px);
  }
  .logo {
    position: absolute;
    left: 50%;
    top: 45%;
    width: 1084px;
    transform: translate(-50%, -50%);
    z-index: 1;
    ${respondTo.md} {
      top: 20%;
      width: 80%;
    }
  }
  .background {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${respondTo.md} {
      height: 80%;
    }
  }
  .samurai {
    position: absolute;
    bottom: 0;
    &.left { left: -5%; }
    &.right { right: -5%; }
    z-index: 2;
  }
  .start {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }
`

const Background = styled(Img)`
  height: 100%;
  width: auto;
  opacity: 0;
  transform: translateY(10%);
  transition: all 2s cubic-bezier(.79,.01,.42,1.81);
  ${({ active }) => active && css`
    opacity: 1;
    transform: translateY(0);
  `}
`

const Logo = styled(Img)`
  margin: auto;
  max-width: 60vw;
  transform: scale(0.3);
  transition: transform 2s cubic-bezier(.79,.01,.42,1.81);
  pointer-events: none;
  ${({ active }) => active && css`
    transform: scale(1);
  `}
`

const Samurai = styled(Img)`
  width: 600px;
  max-width: 40vw;
  ${({ left }) => left && css` transform: translateX(-5%); `}
  ${({ right }) => right && css` transform: translateX(5%); `}
  opacity: 0;
  transition: all 2s cubic-bezier(.79,.01,.42,1.81);
  pointer-events: none;
  ${({ active }) => active && css`
    opacity: 1;
    transform: translateY(0);
  `}
  ${respondTo.md} {
    max-width: 100vw;
    ${({ right }) => right && css` display: none; `}
    ${({ left }) => left && css` width: 100%; `}
  }
`

const Start = styled(Img)`
  width: 214px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10%);
  transition: all 2s cubic-bezier(.79,.01,.42,1.81);
  ${({ active }) => active && css`
    opacity: 1;
    transform: translateY(0);
  `}
  ${respondTo.md} {
    display: none;
  }
`


export default HeadingSection;