import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../constants/colors';
import { respondTo } from '../../../utils/responsive';

const Component = ({ title, icon, background, onClose, children }) => {

  return (
    <Root>
      <Wrapper>
        <CloseButton onClick={onClose}><img src="/images/icon-cross.png" alt="" /></CloseButton>
        <Title>{ icon() }{ title }</Title>
        <ContentBox>
          { children }
        </ContentBox>
        <Background><img src={background} alt="" /></Background>
      </Wrapper>
    </Root>
  )
}

export const ModalItem = ({ title, content }) => {
  return (
    <ModalItemRoot>
      <img src="/images/icon-flower.svg" alt="" />
      <div className="content">
        { title && <p>{ title }</p> }
        { content && <p>{ content }</p> }
      </div>
    </ModalItemRoot>
  )
}

const Root = styled.div`
  border: 2px solid ${colors.white};
  width: 750px;
  height: 480px;
  padding: 10px;
  background: ${colors.black};
  box-sizing: border-box;
  ${respondTo.md} {
    border: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }
`

const Wrapper = styled.div`
  position: relative;
  border: 1px solid ${colors.white};
  padding: 24px;
  height: 100%;
  box-sizing: border-box;
  ${respondTo.md} {
    border: 0;
    padding: 40px;
    overflow: auto;
  }
`

const CloseButton = styled.button`
  position: absolute;
  right: 12px;
  top: 12px;
  width: 60px;
  height: 60px;
  border: 0;
  background: transparent;
  ${respondTo.md} {
    display: none;
  }
  img {
    width: 100%;
    height: auto;
    transform: rotate(45deg);
  }
`

const Title = styled.div`
  font-size: 24px;
  svg {
    margin-right: 8px;
  }
  ${respondTo.md} {
    margin-bottom: 40px;
  }
`

const Background = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  ${respondTo.md} {
    position: relative;
    width: 100%;
  }
  img {
    width: 100%;
  }
`

const ContentBox = styled.div`
  padding: 48px 24px;
  height: 100%;
  box-sizing: border-box;
  ${respondTo.md} {
    padding: 0;
    height: auto;
  }
`

const ModalItemRoot = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  overflow: hidden;
  img {
    margin-top: 4px;
    margin-right: 4px;
  }
  > .label {
    
  }
  > .content {
    white-space: break-spaces;
  }
`


export default Component;