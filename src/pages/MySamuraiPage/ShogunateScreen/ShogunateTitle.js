import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../constants/colors';
import { respondTo } from '../../../utils/responsive';

const Component = ({ title, ...props }) => {
  return (
    <Root {...props}>
      <Title>{ title }</Title>
      <Line />
      <PartLine>
        <svg width="69" height="20.735" viewBox="0 0 69 20.735">
          <g id="Group_89" data-name="Group 89" transform="translate(0 0)">
            <g id="Group_87" data-name="Group 87" transform="translate(0 20.735) rotate(-90)">
              <path id="Path_26" data-name="Path 26" d="M10.181,22.885,0,6.034,10.181,0H10.2L20.378,6.034,10.2,22.885Z" transform="translate(0.178 10.569)" fill="#fff"/>
              <path id="Path_27" data-name="Path 27" d="M10.359,0,0,14.628l10.359-6.14h.016l10.359,6.14L10.375,0Z" transform="translate(0 0)" fill="#fff"/>
            </g>
            <g id="Group_88" data-name="Group 88" transform="translate(49.112 16.326) rotate(-90)">
              <path id="Path_26-2" data-name="Path 26" d="M6.053,13.6,0,3.587,6.053,0h.009l6.053,3.587L6.062,13.6Z" transform="translate(0.106 6.283)" fill="#fff"/>
              <path id="Path_27-2" data-name="Path 27" d="M6.159,0,0,8.7l6.159-3.65h.009L12.326,8.7,6.168,0Z" transform="translate(0 0)" fill="#fff"/>
            </g>
          </g>
        </svg>
      </PartLine>
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
  justify-content: space-between;
  position: relative;
  ${respondTo.md} {
    display: block;
  }
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${colors.black};
  ${respondTo.md} {
    margin: 0 auto;
    margin-bottom: 13px;
    text-align: center;
    white-space: normal;
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

const PartLine = styled.div`
  position: absolute;
  top: 8px;
  right: 0;
  > svg {
    width: 60px;
    height: auto;
  }
  ${respondTo.md} {
    display: none;
  }
`
const Line = styled.div`
  position: absolute;
  left: 0;
  top: 18px;
  width: calc(100% - 60px);
  height: 2px;
  background: ${colors.white};
  transform: translate(2px, -1px);
  z-index: -1;
  ${respondTo.md} {
    display: none;
  }
`

export default Component;