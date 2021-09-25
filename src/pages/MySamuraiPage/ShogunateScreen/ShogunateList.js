import React from 'react';
import styled, { css } from 'styled-components';
import { SelectCheck } from '../../../components/Icons';
import { colors } from '../../../constants/colors';
import { respondTo } from '../../../utils/responsive';
import { _w } from '../../../utils/wordingSystem';

const Component = ({ shogunate, onChange, ...props}) => {
  const shogunateData = _w('shogunate');

  function handleSelectShogunate(e) {
    onChange(e.currentTarget.dataset.shogunate);
  }
  
  return (
    <Root {...props}>
      { shogunateData?.map((item, i) =>
        <Item key={i}>
          <ShogunateItem 
            active={shogunate === item.name} 
            data-shogunate={item.name}
            onClick={handleSelectShogunate}>
            <img src={item.image} alt="" />
          </ShogunateItem>
        </Item>
      ) }
    </Root>
  )
}

const ShogunateItem = ({children, active, ...props}) => {
  return (
    <ShogunateItemRoot active={active} {...props}>
      { active && <SelectCheck className="icon" /> }
      { children }
    </ShogunateItemRoot>
  )
}

const Root = styled.div`
  display: flex;
  ${respondTo.md} {
    flex-wrap: wrap;
  }
`

const Item = styled.div`
  display: block;
  padding: 0 10px;
  width: 20%;
  box-sizing: border-box;
  ${respondTo.md} {
    width: 50%;
  }
`

const ShogunateItemRoot = styled.button`
  position: relative;
  border: 0;
  padding: 0;
  border-radius: 12px;
  background: transparent;
  ${({ active }) => active && css`
    box-shadow: inset 0px 0px 0px 3px ${colors.white};
  `}
  .icon {
    position: absolute;
    top: 12px;
    left: 12px;
    color: ${colors.white};
  }
  img {
    border-radius: 12px;
    display: block;
    width: 100%;
    height: auto;
  }
`


export default Component;