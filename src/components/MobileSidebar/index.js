import React from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../constants/colors';
import { respondTo } from '../../utils/responsive';

const MobileSidebar = ({ open=true, title, children, onPrev, ...props }) => {

  return (
    <Root open={open} {...props}>
      <Head>
        <Left>
          <PrevButton onClick={onPrev}>
            <img src="/images/icon-arrow-left.svg" alt="" />
          </PrevButton>
          { title }
        </Left>
      </Head>
      { children }
    </Root>
  )
}

const Root = styled.div`
  ${respondTo.md} {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    padding-top: 66px;
    background: ${colors.black};
    overflow: scroll;
    z-index: 5;
    visibility: hidden;
    left: 100%;
    opacity: 0;
    transition: all .3s ease;
    ${({ open }) => open && css`
      visibility: visible;
      opacity: 1;
      left: 0;
    `}
  }
`

const Head = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 18px 14px;
  color: ${colors.white};
  background: ${colors.black};
  box-sizing: border-box;
  z-index: 2;
`
const Left = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
`
const PrevButton = styled.div`
  margin-right: 8px;
  background: transparent;
  img {
    display: block;
  }
`

export default MobileSidebar;