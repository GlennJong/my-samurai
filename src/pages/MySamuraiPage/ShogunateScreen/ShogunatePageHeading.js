import React from 'react';
import styled from 'styled-components';
import { respondTo } from '../../../utils/responsive';

const ShogunatePageHeading = ({ children, title }) => {
  return (
    <Root>
      <div className="icon">{ children }</div>
      <div className="title">{ title }</div>

      <FullLine>
        <svg xmlns="http://www.w3.org/2000/svg" width="282.877" height="12.32" viewBox="0 0 282.877 12.32">
          <g id="Group_439" data-name="Group 439" transform="translate(-434 -3639.5)">
            <rect id="Rectangle_36" data-name="Rectangle 36" width="206" height="1" transform="translate(473.938 3644.793)" fill="#fff"/>
            <g id="Group_89" data-name="Group 89" transform="translate(434 3639.5)">
              <g id="Group_87" data-name="Group 87" transform="translate(21.12 12.32) rotate(-90)">
                <path id="Path_26" data-name="Path 26" d="M6.049,0,0,10.012,6.049,13.6h.009l6.049-3.586L6.059,0Z" transform="translate(0.106 0)" fill="#fff"/>
                <path id="Path_27" data-name="Path 27" d="M6.155,8.691,0,0,6.155,3.649h.009L12.32,0,6.165,8.691Z" transform="translate(0 11.187)" fill="#fff"/>
              </g>
              <g id="Group_88" data-name="Group 88" transform="translate(0 9.701) rotate(-90)">
                <path id="Path_26-2" data-name="Path 26" d="M3.6,0,0,5.952,3.6,8.084H3.6L7.2,5.952,3.6,0Z" transform="translate(0.063)" fill="#fff"/>
                <path id="Path_27-2" data-name="Path 27" d="M3.659,5.167,0,0,3.659,2.169h.006L7.324,0,3.665,5.167Z" transform="translate(0 6.65)" fill="#fff"/>
              </g>
            </g>
            <g id="Group_90" data-name="Group 90" transform="translate(675.879 3639.5)">
              <g id="Group_87-2" data-name="Group 87" transform="translate(0 12.32) rotate(-90)">
                <path id="Path_26-3" data-name="Path 26" d="M6.049,13.6,0,3.586,6.049,0h.009l6.049,3.586L6.059,13.6Z" transform="translate(0.106 6.28)" fill="#fff"/>
                <path id="Path_27-3" data-name="Path 27" d="M6.155,0,0,8.691,6.155,5.043h.009L12.32,8.691,6.165,0Z" fill="#fff"/>
              </g>
              <g id="Group_88-2" data-name="Group 88" transform="translate(29.181 9.701) rotate(-90)">
                <path id="Path_26-4" data-name="Path 26" d="M3.6,8.084,0,2.132,3.6,0H3.6L7.2,2.132,3.6,8.084Z" transform="translate(0.063 3.733)" fill="#fff"/>
                <path id="Path_27-4" data-name="Path 27" d="M3.659,0,0,5.167,3.659,3h.006L7.324,5.167,3.665,0Z" fill="#fff"/>
              </g>
            </g>
          </g>
        </svg>
      </FullLine>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  ${respondTo.md} {
    display: block;
  }
  > .title {
    margin: 0 8px;
    margin-left: 12px;
    font-size: 48px;
    font-weight: 600;
    text-transform: uppercase;
    ${respondTo.md} {
      margin-bottom: 12px;
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

const FullLine = styled.div`
  display: none;
  width: 100%;
  > svg {
    width: 100%;
    height: auto;
  }
  ${respondTo.md} {
    display: block;
  }
`


export default ShogunatePageHeading;