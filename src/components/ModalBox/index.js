import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../constants/colors';
import { lockWindow } from '../../utils/methods';
import { respondTo } from '../../utils/responsive';

const ModalBox = ({ open, onClose, children, ...props }) => {
  useEffect(() => {
    lockWindow(open);
  }, [open]);

  return (
    <Root open={open} {...props}>
      <CloseButton onClick={onClose}>
        <img src="/images/icon-cross.png" alt="" />
      </CloseButton>
      <Mask onClick={onClose} />
      <Box open={open} >{ children }</Box>
    </Root>
  )
}

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  z-index: -1;
  transition: .3s ease;
  ${({ open }) => open && css`
    z-index: 5;
    opacity: 1;
  `};
`

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${colors.black};
  opacity: 0.75;
  z-index: 0;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`

const CloseButton = styled.button`
  position: absolute;
  right: 12px;
  top: 12px;
  width: 60px;
  height: 60px;
  border: 0;
  background: transparent;
  display: none;
  z-index: 2;
  ${respondTo.md} {
    display: block;
  }
  img {
    width: 100%;
    height: auto;
    transform: rotate(45deg);
  }
`

export default ModalBox;
