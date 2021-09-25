import React from 'react';
import styled from 'styled-components';
import { ArrowDown } from '../Icons';

const InfomationTitle = ({ children, title, showArrow=true, ...props }) => {
  return (
    <Root {...props}>
      <div className="icon">{ children }</div>
      <div className="title">{ title }</div>
      { showArrow && <ArrowDown /> }
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  > .title {
    margin: 0 8px;
    font-size: 24px;
    font-weight: 600;
    text-transform: uppercase;
  }
`

export default InfomationTitle;