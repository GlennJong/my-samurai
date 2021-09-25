import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../../constants/colors';
import { _w } from '../../../utils/wordingSystem';
import { Close } from '../../../components/Icons';
import { SelectCheck } from '../../../components/Icons';
import { respondTo } from '../../../utils/responsive';

const Component = ({ data, shogunate, onChange }) => {
  const wording = _w('my_samurai.design');
  if (!data) return;

  function handleClickRemoveItem(e) {
    const optionName = e.currentTarget.dataset.option;
    const itemName = e.currentTarget.dataset.item;
    
    const currentData = [...data];
    const currentOption = currentData.find(item => item.name === optionName);

    const currentItem = currentOption.data.find(item => item.name === itemName);
    currentItem.selected = false;

    // if no item is selected
    currentOption.edit = currentOption.data.some(item => item.selected);

    onChange(currentData);
  }

  
  return (
    <Root>
      <Title>
        <img src="/images/icon-cart.svg" alt="" />
        { wording.new_design }
      </Title>
      <List>
        { data.map((option, i) => 
          <React.Fragment key={i}>
            { option.data &&
              option.data.map((item, j) =>
              (item.selected && shogunate === item.shogunate) &&
              <li key={j}>
                <DesignItem><img src={item.image} alt="" /></DesignItem>
                <p className="title">{ item.title }</p>
                <RemoveButton data-option={option.name} data-item={item.name}
                onClick={handleClickRemoveItem}>
                  <span>DELETE</span>
                  <Close />
                </RemoveButton>
              </li>
            ) }
          </React.Fragment>
        ) }
      </List>
    </Root>
  )
}


const DesignItem = ({children, active, ...props}) => {
  return (
    <DesignItemRoot active={active} {...props}>
      { active && <SelectCheck className="icon" /> }
      { children }
    </DesignItemRoot>
  )
}


const Root = styled.div`
  margin-top: 40px;
  ${respondTo.md} {
    margin-top: 0;
    padding: 0 20px;
  }
`

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
  img {
    margin-right: 10px;
  }
`

const List = styled.div`
  display: flex;
  list-style: none;
  margin: 0 -7px;
  margin-top: 24px;
  > li {
    padding: 0 7px;
    width: 142px;
    box-sizing: border-box;
    > .title {
      white-space: break-spaces;
      text-transform: uppercase;
      margin-top: 6px;
      font-size: 20px;
      font-weight: 900;
      line-height: 24px;
    }
  }
`

const DesignItemRoot = styled.div`
  position: relative;
  border: 0;
  padding: 0;
  border: 1px solid ${colors.white};
  border-radius: 12px;
  background: transparent;
  ${({ active }) => active && css`
    box-shadow: inset 0px 0px 0px 2px ${colors.white};
  `}
  .icon {
    position: absolute;
    top: 8px;
    left: 8px;
    color: ${colors.white};
  }
  img {
    position: relative;
    border-radius: 12px;
    display: block;
    width: 100%;
    height: auto;
    z-index: -1;
  }
`

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 6px;
  border: 0;
  padding: 0;
  background: transparent;
  color: ${colors.white};
  opacity: .4;
  font-size: 12px;
  svg {
    margin-left: 4px;
    width: 8px;
    height: 8px;
  }
`


export default Component;