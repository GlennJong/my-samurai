import React from 'react';
import styled from 'styled-components';

const Img = ({ fill='width', src='', alt='', ...props}) => {
  return (
    <Root fill={fill} {...props}>
      <img src={src} alt={alt} />
    </Root>
  )
}

const Root = styled.div`
  img {
    display: block;
    ${({fill}) => fill === 'width' && `
      width: 100%;
      height: auto;
    `}
    ${({fill}) => fill === 'height' && `
      width: auto;
      height: 100%;
    `}
    ${({fill}) => fill === 'cover' && `
      object-fit: cover;
      width: 100%;
      height: 100%;
    `}
    ${({fill}) => fill === 'contain' && `
      object-fit: contain;
      width: 100%;
      height: 100%;
    `}
  }
`

export default Img;