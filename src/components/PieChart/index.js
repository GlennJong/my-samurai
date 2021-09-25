import React, { useMemo } from 'react';
import styled from 'styled-components';

const Component = ({ data, ...props }) => {
  const pieData = useMemo(() => {
    let offsetCounter = 0;
    data.forEach((item) => {
      item.offset = offsetCounter;
      offsetCounter += item.percent;
    });
    
    return data;
  }, [data])

  return (
    <Root {...props}>
      <svg viewBox="0 0 64 64">
        { pieData.map((child, i) => <Piece key={i} data={child} /> )}
        <circle cx="32" cy="32" r="16" fill="#000" />
      </svg>
      { pieData?.map((child, i) => <PercentItem key={i} data={child} />) }
    </Root>
  )
}

const Piece = ({ data }) => {
  return (
    <circle
        cx="50%"
        cy="50%"
        r="25%"
        style={{
            fill: 'none',
            strokeDasharray: `${data.percent}, 100`,
            strokeDashoffset: -data.offset,
            stroke: data.color,
        }}
        strokeWidth="32"
        textAnchor="middle"
    ></circle>
  )
}

const Root = styled.div`
  display: inline-block;
  position: relative;
  > svg {
    display: block;
    width: 160px;
    height: 160px;
    transform: rotate(-90deg);
  }
`


const PercentItem = ({data, ...props}) => {
  return (
    <PercentRoot percent={data.percent} rotate={data.offset/100*360} {...props}>
      <span>{data.percent}%</span>
    </PercentRoot>
  )
}

const PercentRoot = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  transform: ${({ rotate, percent }) => `rotate(${rotate + (percent/100*360/2)}deg)`};
  span {
    position: absolute;
    top: 10px;
    left: -12px;
    font-size: 12px;
    color: white;
    transform: ${({ rotate, percent }) => `rotate(-${rotate + (percent/100*360/2)}deg)`};
  }
`

export default Component;