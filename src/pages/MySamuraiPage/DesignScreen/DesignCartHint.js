import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../constants/colors';
import { respondTo } from '../../../utils/responsive';
import { _w } from '../../../utils/wordingSystem';

const DesignHint = ({ data, show, onClick, ...props }) => {

  return (
    <>
      { data.some((item) => item.edit) &&
        <Root onClick={onClick} {...props}>
          { show && <img className="cross" src="/images/icon-cross.png" alt="" /> }
          { !show &&
            <>
            <img src="/images/icon-cart.svg" alt="" />
            { data.filter((item) => item.edit).length }
            </>
          }
        </Root>
      }
    </>
  )
}

const Root = styled.button`
  display: flex;
  align-items: flex-start;
  position: fixed;
  top: 20px;
  right: 16px;
  padding: 0;
  border: 0;
  background: transparent;
  z-index: 2;
  font-size: 20px;
  color: ${colors.white};
  visibility: hidden;
  ${respondTo.md} {
    visibility: visible;
  }
  .cross {
    width: 30px;
    transform: rotate(45deg);
  }
  img {
    display: block;
    margin-right: 6px;
    width: 18px;
    height: auto;
  }
`

export default DesignHint;