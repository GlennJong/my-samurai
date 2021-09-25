import React, { useRef } from 'react';
import Slick from 'react-slick';
import styled from 'styled-components';
import { colors } from '../../constants/colors';

const Carousel = ({ className='', children }) => {
  const carouselRef = useRef(null);
  const slickSettings = {
    infinite: true,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  function handleClickArrowButton(e) {
    if (carouselRef.current) {
      const { direction } = e.currentTarget.dataset;
      if (direction === 'prev') carouselRef.current.slickPrev();
      if (direction === 'next') carouselRef.current.slickNext();
    }
  }


  return (
    <Root>
      <NavContainer>
        <button data-direction="prev" onClick={handleClickArrowButton}/>
        <button data-direction="next" onClick={handleClickArrowButton}/>
      </NavContainer>
      <CarouselBody>
        <Slick className={className} ref={carouselRef} {...slickSettings}>
          { children.map((child, i) => <div key={i}>{ child }</div>) }
        </Slick>
      </CarouselBody>
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  .slick-dots {
    position: relative;
    bottom: 0;
    z-index: 1;
    button:before {
      color: ${colors.white};
    }
    .slick-active button:before {
      color: ${colors.white};
    }
  }
`

const CarouselBody = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
`

const NavContainer = styled.div`
  > button {
    position: absolute;
    top: 0;
    width: 20%;
    height: 100%;
    border: 0;
    background: transparent;
    z-index: 2;
    &:first-child {
      left: 0;
    }
    &:last-child {
      right: 0;
    }
  }
`
export default Carousel;
