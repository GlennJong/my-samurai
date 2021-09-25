import React from 'react';
import styled from 'styled-components';
import { respondTo } from '../../utils/responsive';

const PageHeading = ({ children, title }) => {
  return (
    <Root>
      <div className="icon">{ children }</div>
      <div className="title">{ title }</div>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  > .title {
    margin: 0 8px;
    margin-left: 12px;
    font-size: 48px;
    font-weight: 600;
    text-transform: uppercase;
    ${respondTo.md} {
      font-size: 24px;
      text-align: center;
    }
  }
  > .icon {
    ${respondTo.md} {
      display: none;
    }
    svg {
      width: 48px;
      height: 48px;
    }
  }
`

export default PageHeading;