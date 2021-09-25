import React, { useState } from 'react';
import styled from 'styled-components';
import TabButton from '../../../components/TabButton';
import { respondTo } from '../../../utils/responsive';

const Section = ({ data, currentOption, onSelected, ...props }) => {

  function handleClickTab(e) {
    const tab = e.currentTarget.dataset.tab;
    onSelected(tab);
  }

  return (
    <Root qty={data.length}  {...props}>
      { data.map((option, i) => 
        <li key={i}>
          <TabButton data-tab={option.name}
            disable={!option.data}
            active={currentOption === option.name}
            onClick={handleClickTab}>{ option.name }</TabButton>
          { option.edit && <img className="icon" src="/images/icon-tab-cart.svg" alt="" /> }
        </li>
      ) }
    </Root>
  )
}

const Root = styled.ul`
  display: flex;
  margin: 0 -10px;
  ${respondTo.md} {
    margin: 0;
    padding-bottom: 16px;
    width: 100%;
    overflow: auto;
  }
  > li {
    position: relative;
    padding: 0 10px;
    width: ${({ qty }) => 100/qty}%;
    box-sizing: border-box;
    ${respondTo.md} {
      width: auto;
    }
    button {
      width: 100%;
      font-weight: 900;
    }
    .icon {
      position: absolute;
      top: 80%;
      left: 85%;
    }
  }
`

export default Section;