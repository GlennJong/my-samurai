import React from 'react';
import styled from 'styled-components';
import Img from '../../components/Img';
import { colors } from '../../constants/colors';
import { respondTo } from '../../utils/responsive';

const DescriptionSection = ({ wording, ...props }) => {
  return (
    <Root {...props}>
      <Background><Img src="/images/homepage-map-alt.png" /></Background>
      <Content>
        <div className="wrap">
          <Icon src="/images/icon-lock.svg" />
          <p>{ wording.title }</p>
          <p>{ wording.subtitle }</p>
        </div>
      </Content>
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/images/homepage-map-alt.png');
    background-position: center center;
    background-size: cover;
    opacity: 0.5;
    z-index: -1;
  }
`

const Icon = styled(Img)`
  margin: 0 auto;
  margin-bottom: 16px;
  width: 75px;
  ${respondTo.md} {
    width: 52px;
    margin-bottom: 25px;
  }
`

const Background = styled.div`
  position: relative;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${colors.black};
    opacity: .5;
    z-index: 1;
  }
  ${respondTo.md} {
    display: none;
  }
`

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  z-index: 1;
  ${respondTo.md} {
    position: relative;
    top: 0;
    transform: translateY(0);
  }
  .wrap {
    margin: 0 auto;
    width: 880px;
    max-width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: ${colors.white};
    ${respondTo.lg} {
      font-size: 24px;
    }
    ${respondTo.md} {
      padding: 0 36px;
      padding-top: 60px;
      padding-bottom: 70px;
      font-size: 18px;
      box-sizing: border-box;
    }
    p + p {
      margin-top: 60px;
      ${respondTo.lg} {
        margin-top: 40px;
      }
      ${respondTo.md} {
        margin-top: 36px;
      }
    }
  }
`

export default DescriptionSection;