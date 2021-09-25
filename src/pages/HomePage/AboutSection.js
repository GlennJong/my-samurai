import React from 'react';
import styled, { css } from 'styled-components';
import Img from '../../components/Img';
import { colors } from '../../constants/colors';
import { nl2br } from '../../utils/wordingSystem';
import { Twitter, Medium, Discord } from '../../components/Icons';
import { respondTo } from '../../utils/responsive';
import SocialsList from '../../components/SocialList';

const AboutSection = ({ wording, ...props }) => {
  return (
    <Root {...props}>
      <Background left src="/images/homepage-about-background-1.png" />
      <Background right src="/images/homepage-about-background-2.png" />
      <Container>
        <Heading>
          <Img className="icon" src="/images/icon-ecoin.png" />
          <Img className="heading" src="/images/homepage-about-heading.png" />
          <Img className="icon" src="/images/icon-ecoin.png" />
        </Heading>
        <Title>{ wording.title }</Title>
        <Line src="/images/icon-line.svg" />
        <Subtitle>
          <div className="content" dangerouslySetInnerHTML={{__html: wording.subtitle}}></div>
        </Subtitle>
        <Article>
          <div className="title">{ wording.article.title }</div>
          <div className="content">{ nl2br(wording.article.content) }</div>
        </Article>
        <Contact>
          <div className="samurai-list">
            <Img src="/images/homepage-about-samurai-1.png" />
            <Img src="/images/homepage-about-samurai-2.png" />
            <Img src="/images/homepage-about-samurai-3.png" />
          </div>
          <div className="link">
            <p>MEET THE TEAM</p>
            <SocialsList data={wording.socials} />
          </div>
        </Contact>
      </Container>
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  padding-top: 120px;
  padding-bottom: 120px;
  background: ${colors.black};
  color: ${colors.white};
  overflow: hidden;
  z-index: 1;
  ${respondTo.md} {
    padding: 36px;
    box-sizing: border-box;
  }
`

const Background = styled(Img)`
  position: absolute;
  z-index: -1;
  ${({ left }) => left && css`
    width: 840px;
    top: 40%;
    left: -32%;
    ${respondTo.md} {
      top: 500px;
      left: -55%;
      width: 400px;
    }
  `}
  ${({ right }) => right && css`
    width: 480px;
    top: 50%;
    right: -10%;
    ${respondTo.md} {
      top: 500px;
      right: -10%;
      width: 200px;
    }
  `}
`

const Container = styled.div`
  margin: 0 auto;
  width: 800px;
  max-width: 100%;
`

const Heading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
  .icon {
    width: 85px;
  }
  .heading {
    width: 600px;
  }
`

const Title = styled.div`
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  ${respondTo.md} {
    font-size: 18px;
  }
`
const Line = styled(Img)`
  margin: 56px auto;
  width: 580px;
  max-width: 100%;
  ${respondTo.md} {
    margin: 36px auto;
  }
`
const Subtitle = styled.div`
  margin-bottom: 280px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  ${respondTo.md} {
    margin-bottom: 200px;
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

const Article = styled.div`
  margin-bottom: 120px;
  font-weight: 600;
  ${respondTo.md} {
    margin-bottom: 100px;
  }
  .title {
    margin-bottom: 60px;
    font-size: 36px;
    ${respondTo.md} {
      margin-bottom: 36px;
      font-size: 18px;
    }
  }
  .content {
    font-size: 18px;
    br:nth-child(2n) {
      display: none;
      ${respondTo.md} {
        display: block;
      }
    }
  }

`

const Contact = styled.div`
  text-align: center;
  .samurai-list {
    display: flex;
    justify-content: center;
    margin-bottom: 70px;
    ${respondTo.md} {
      justify-content: space-between;
      margin-bottom: 28px;
    }
    > * {
      margin: 0 14px;
      width: 180px;
      ${respondTo.md} {
        margin: 0;
        width: 90px;
      }
    }
  }
  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    ${respondTo.md} {
      display: block;
      text-align: center;
      margin-bottom: 60px;
    }
    p {
      margin-right: 40px;
      font-size: 30px;
      font-weight: 600;
      ${respondTo.md} {
        margin: 0;
        margin-bottom: 30px;
      }
    }
    a {
      display: inline-block;
    }
  }
`

export default AboutSection;