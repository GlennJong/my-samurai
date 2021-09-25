import React from 'react';
import styled, { css } from 'styled-components';
import SamuraiDataProperty from './SamuraiDataProperty';
import SamuraiDataMotto from './SamuraiDataMotto';
import SamuraiDataShogunate from './SamuraiDataShogunate';
import SamuraiDataLevel from './SamuraiDataLevel';
import { colors } from '../../../constants/colors';
import { _w } from '../../../utils/wordingSystem';
import { respondTo } from '../../../utils/responsive';
import { zeroTransfer } from '../../../utils/methods';

const SamuraiDataInfomation = ({ data, children, ...props }) => {
  return (
    <Root {...props}>
      <SamuraiImage>
        <img src={data?.image} alt="" />
      </SamuraiImage>
      <SamuraiData>
        <Id type="full">#{zeroTransfer(data?.tokenId)}</Id>
        <Item type="full"><SamuraiDataProperty data={data?.attributes} /></Item>
        <Item type="half"><SamuraiDataMotto content={data?.description} /></Item>
        <Item type="half"><SamuraiDataShogunate data={data?.attributes} /></Item>
        <Item type="half"><SamuraiDataLevel data={data?.attributes} /></Item>
        { children }
      </SamuraiData>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  margin: 0 -30px;
  color: ${colors.white};
  box-sizing: border-box;
  ${respondTo.md} {
    display: block;
    margin: 0;
    padding-bottom: 120px;
  }
`

const SamuraiImage = styled.div`
  width: 420px;
  padding: 0 30px;
  box-sizing: border-box;
  ${respondTo.md} {
    width: 100%;
    padding: 0;
    margin-bottom: 40px;
  }
  img {
    display: block;
    width: 100%;
  }
`

const SamuraiData = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0 30px;
  width: calc(100% - 420px);
  box-sizing: border-box;
  ${respondTo.md} {
    display: block;
    width: 100%;
  }
`

const Item = styled.li`
  margin-bottom: 26px;
  padding: 0 28px;
  width: 50%;
  ${({ type }) => type === 'full' && css`width: 100%`};
  box-sizing: border-box;
  ${respondTo.md} {
    padding: 0;
    width: 100%;
  }

`

const Id = styled(Item)`
  font-size: 48px;
  line-height: 1;
  font-weight: 900;
`

export default SamuraiDataInfomation;