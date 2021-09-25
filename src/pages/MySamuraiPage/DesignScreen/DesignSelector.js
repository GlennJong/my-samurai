import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { SelectCheck } from '../../../components/Icons';
import { colors } from '../../../constants/colors';
import { respondTo } from '../../../utils/responsive';
import { _w } from '../../../utils/wordingSystem';

const Component = ({ data, shogunate, option, onChange }) => {
  if (!data) return;

  const designData = data.find(item => item.name === option);

  function handleClickDesignItem(e) {
    const value = e.currentTarget.dataset.value;
    const currentData = [...data];
    const currentDesignData = {...designData};
    const currentOption = currentData.find(item => item.name === option);

    currentDesignData.data.forEach(item => {
      item.selected = false;
      if (item.name === value) item.selected = true;
    })

    currentOption.data = currentDesignData.data;
    currentOption.edit = true;

    onChange(currentData);
  }
  return (
    <Root>
      <Title>{ designData.title }</Title>
      <Hint>{ designData.hint }</Hint>
      <List>
        { designData?.data.map((item, i) =>
          item.shogunate === shogunate &&
          <li key={i}><DesignItem 
            active={item.selected}
            data-value={item.name} 
            onClick={handleClickDesignItem}>
            <img src={item.image} alt="" />
            </DesignItem>
            <p className="title">{ item.title }</p>
          </li>
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
    margin-top: 20px;
    padding: 0 20px;
  }
`

const Title = styled.div`
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 700;
`

const Hint = styled.div`
  font-size: 14px;
`

const List = styled.div`
  display: flex;
  list-style: none;
  margin: 0 -7px;
  margin-top: 24px;
  ${respondTo.md} {
    flex-wrap: wrap;
  }
  > li {
    padding: 0 7px;
    width: 142px;
    box-sizing: border-box;
    ${respondTo.md} {
      margin-bottom: 28px;
    }
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

const DesignItemRoot = styled.button`
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


export default Component;