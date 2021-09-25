import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Img from '../Img';
import { colors } from '../../constants/colors';
import { respondTo } from '../../utils/responsive';

const CartButton = ({...props}) => {
  return (
    <Root to="/?to=purchase" {...props}>
      <Img className="icon" src="/images/cart-icon.png" />
    </Root>
  )
}

const Root = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 45px;
  right: 45px;
  border: 0;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background: ${colors.black};
  z-index: 2;
  color: ${colors.white};
  ${respondTo.md} {
    width: 48px;
    height: 48px;
    bottom: 20px;
    right: 12px;
  }
  .icon {
    width: 36px;
    margin-left: -6px;
    ${respondTo.md} {
      margin-left: -4px;
      width: 22px;
    }
  }
`

export default CartButton;