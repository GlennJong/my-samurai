import React from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../constants/colors';

const SortToggle = ({ data, current, onClick }) => {
  return (
    <Root>
      <Label>SORT BY</Label>
      <Wrapper>
        { data.map((item, i) => 
          <SortItem
            key={i} 
            data-sort={item}
            active={current === item}
            width={100/data.length}
            onClick={onClick}>{item}</SortItem>
        ) }
        <Mark move={data.indexOf(current)} width={100/data.length} />
      </Wrapper>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
`
const Label = styled.div`
  margin-right: 10px;
  font-size: 12px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border: 1px solid ${colors.white};
  border-radius: 24px;
  width: 180px;
  overflow: hidden;
`
const SortItem = styled.div`
  width: ${({width}) => width}%;
  padding: 6px 12px;
  box-sizing: border-box;
  color: ${colors.white};
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
  transition: color .3s ease;
  cursor: pointer;
  ${({ active }) => active && css` color: ${colors.black}`};
`

const Mark = styled.div`
  position: absolute;
  top: 0;
  left: ${({move, width}) => move * width}%;
  height: 100%;
  border-radius: 24px;
  width: ${({width}) => width}%;
  background: ${colors.white};
  z-index: -1;
  transition: left .3s ease;
`

export default SortToggle;