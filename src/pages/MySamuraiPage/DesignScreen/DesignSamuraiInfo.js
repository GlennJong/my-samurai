import React, { useMemo } from 'react';
import styled from 'styled-components';
import InfomationTitle from '../../../components/InfomationTitle';
import { Shuriken } from '../../../components/Icons';
import { _w } from '../../../utils/wordingSystem';
import { zeroTransfer } from '../../../utils/methods';

const Component = ({ data }) => {
  
  return (
    <Root>
      <Image src={data.image} alt="" />
      <Info>
        <Id>#{zeroTransfer(data.tokenId)}</Id>
        <Shogunate>
          <InfomationTitle title="SHOGUNATE" showArrow={false}><Shuriken /></InfomationTitle>
          <IconItem data={data} />
        </Shogunate>
      </Info>
    </Root>
  )
}

const IconItem = ({ data, ...props }) => {
  const list = _w('shogunate');
  
  const shogunateData = useMemo(() => {
    const value = data.attributes.find(item => item.trait_type === 'Shogunate').value;
    return list.find(item => item.name === value);
  }, [data])

  return (
    <IconItemRoot color={shogunateData.color} {...props}>
      <div className="icon"><img src={shogunateData.icon} alt="" /></div>
      <div className="title">{shogunateData.title}</div>
    </IconItemRoot>
  )
}

const Root = styled.div`
`

const Image = styled.img`
  display: block;
  margin-bottom: 40px;
  width: 100%;
  height: auto;
`

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`
const Id = styled.div`
  font-size: 48px;
  line-height: 1;
`

const Shogunate = styled.div`
`
const IconItemRoot = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  > .icon {
    margin-right: 6px;
    width: 38px;
    height: 38px;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  > .title {
    white-space: break-spaces;
    color: ${({ color }) => color};
    font-size: 16px;
    line-height: 20px;
  }
`

export default Component;