import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Img from '../../components/Img';
import { colors } from '../../constants/colors';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import { detectMob } from '../../utils/methods';
import { respondTo } from '../../utils/responsive';

const StorySection = ({ wording, ...props }) => {
  const decorationRef = useRef(null);
  const [ active, setActive ] = useState(false);
  useIntersectionObserver(decorationRef, handleActiveAnimation, {
    root: null,
    rootMargin: '-30% 0%',
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
  return (
    <Root {...props}>
      <Wrapper>
        <DecorationList ref={decorationRef}>
          <DecorationItem active={active} bottom={-10} right={20} to={`50px, 100px`} src="/images/homepage-wall-1.png" />
          <DecorationItem active={active} left={-5} top={30} to={`-100px, -50px`} src="/images/homepage-wall-2.png" />
          <DecorationItem active={active} right={-5} top={30} to={`80px, 20px`} src="/images/homepage-wall-3.png" />
          <DecorationItem active={active} left={-3} top={45} to={`-100px, 25px`} src="/images/homepage-wall-4.png" />
          <DecorationItem active={active} right={3} bottom={10} to={`80px, 80px`} src="/images/homepage-wall-5.png" />
          <DecorationItem active={active} left={10} bottom={-3} to={`-120px, 90px`} src="/images/homepage-wall-6.png" />
          <DecorationItem active={active} left={35} top={2} to={`0px, -80px`} src="/images/homepage-wall-7.png" />
          <DecorationItem active={active} left={1} top={1} to={`-80px, -30px`} src="/images/homepage-wall-8.png" />
          <DecorationItem active={active} right={1} top={-3} to={`120px, -40px`} src="/images/homepage-wall-9.png" />
        </DecorationList>
        <DecorationGroup src="/images/homepage-wall-mobile-1.png" />
        <Title>{ wording.title }</Title>
        <Line src="/images/homepage-wall-line.svg" />
        <Title>{ wording.subtitle }</Title>
        <DecorationGroup src="/images/homepage-wall-mobile-2.png" />
      </Wrapper>
    </Root>
  )
}

const Root = styled.div`
  background: ${colors.black};
  ${respondTo.md} {
    padding: 0 36px;
    box-sizing: border-box;
  }
`

const Wrapper = styled.div`
  position: relative;
  padding: 370px 0;
  color: ${colors.white};
  font-size: 36px;
  font-weight: 600;
  ${respondTo.md} {
    padding: 40px 0;
    font-size: 18px;
  }
`

const Line = styled(Img)`
  margin: 55px auto;
  width: 570px;
  max-width: 100%;
`
const Title = styled.div`
  margin: 0 auto;
  width: 800px;
  max-width: 100%;
  text-align: center;
`

const DecorationList = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  ${respondTo.md} {
    display: none;
  }
`
const DecorationItem = styled(Img)`
  position: absolute;
  width: 450px;
  opacity: 0;
  transition: transform 1s ease,
              opacity 1s ease;
  ${({ to }) => to && css`transform: translate(${to});`}
  ${({ active }) => active && css`
    opacity: 1;
    transform: translate(0%, 0%)`}
  ;

  ${({ left }) => left && css`left: ${left}%`};
  ${({ right }) => right && css`right: ${right}%`};
  ${({ top }) => top && css`top: ${top}%`};
  ${({ bottom }) => bottom && css`bottom: ${bottom}%`};
`

const DecorationGroup = styled(Img)`
  display: none;
  width: 100%;
  ${respondTo.md} {
    display: block;
  }
`

export default StorySection;