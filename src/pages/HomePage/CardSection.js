import React from 'react';
import styled from 'styled-components';
import Img from '../../components/Img';
import CardItem from '../../components/CardItem';
import { colors } from '../../constants/colors';
import { nl2br } from '../../utils/wordingSystem';
import { respondTo } from '../../utils/responsive';

const CardSection = ({ wording, ...props }) => {
  return (
    <Root {...props}>
      <Heading>
        <Cloud className="cloud -right" src="/images/homepage-news-cloud-1.png" />
        <Cloud className="cloud -left" src="/images/homepage-news-cloud-2.png" />
        <div className="title">{ nl2br(wording.heading) }</div>
      </Heading>
      <CardWrapper id="social-class">
        { wording.cards.map((card, i) =>
          <CardItem key={i} size={i===0 ? 'lg' : 'sm'} data={card} />
        ) }
      </CardWrapper>
    </Root>
  )
}

const Root = styled.div`

`

const Heading = styled.div`
  position: relative;
  padding: 124px 0;
  font-size: 36px;
  font-weight: 500;
  text-align: center;
  color: ${colors.white};
  background-color: ${colors.black};
  overflow: hidden;
  ${respondTo.md} {
    padding: 90px 0;
    font-size: 18px;
  }
  .cloud {
    position: absolute;
    &.-left {
      left: -30%;
      bottom: -70%;
      ${respondTo.md} {
        bottom: -20%;
      }
    }
    &.-right {
      right: -30%;
      top: -70%;
      ${respondTo.md} {
        top: -20%;
      }
    }
  }
`
const Cloud = styled(Img)`
  width: 70%;
  height: auto;
`

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
`

export default CardSection;