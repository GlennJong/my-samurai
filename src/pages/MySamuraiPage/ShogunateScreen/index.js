import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ShogunateMap from './ShogunateMap';
import ShogunateList from './ShogunateList';
import ShogunateForce from './ShogunateForce';
import ShogunatePageHeading from './ShogunatePageHeading';
import ShogunateTitle from './ShogunateTitle';
import { Shuriken } from '../../../components/Icons';
import { Button, GhostButton } from '../../../components/Button';
import { colors } from '../../../constants/colors';
import { _w } from '../../../utils/wordingSystem';
import { respondTo } from '../../../utils/responsive';
import { zeroTransfer } from '../../../utils/methods';

function getAttributeValue(data, name) {
  const item = data.attributes.find(item => item.trait_type === name);
  return item.value || undefined;
}

const Section = ({ data, onPrev, onNext, onSelected, ...props }) => {
  const wording = _w('my_samurai.shogunate');
  const shogunateData = _w('shogunate');
  const defaultShogunate = getAttributeValue(data, 'Shogunate');
  const [ shogunate, setShogunate ] = useState(defaultShogunate);
  const [ isMapReady, setIsMapReady ] = useState(false);

  useEffect(() => {
    onSelected(shogunate);
  }, [shogunate]);

  function handleEnableSelectShogunate() {
    setIsMapReady(true);
  }
  function handleSelectShogunate(value) {
    if (isMapReady) setShogunate(value);
  }

  return (
    <Root {...props}>
      <Wrapper>
        <ShogunatePageHeading title={wording.heading}><Shuriken /></ShogunatePageHeading>
        <ShogunateMap
          onClick={handleSelectShogunate}
          data={wording}
          enable={isMapReady}
          shogunate={shogunate}
          samurai={data.image}
          onReady={handleEnableSelectShogunate} />
        <Selector>
          <div className="image"><img src={data.image} alt="" /><p>#{zeroTransfer(data.tokenId)}</p></div>
          <ShogunateList
            className="list"
            shogunate={shogunate}
            onChange={handleSelectShogunate} />
        </Selector>
        <ValueSection>
          <ShogunateTitle title={wording.force_value} />
          <ShogunateForce />
        </ValueSection>
        { shogunate !== 'None' &&
          <Bottom>
            <About>
              <ShogunateTitle title={shogunateData.find(data => data.name === shogunate).about} />
              <p>{ shogunateData.find(data => data.name === shogunate).description || null }</p>
            </About>
            <Option>
              <GhostButton className="back" onClick={onPrev}>BACK</GhostButton>
              <Button onClick={onNext}>NEXT</Button>
            </Option>
          </Bottom>
        }
      </Wrapper>
    </Root>
  )
}

const Root = styled.div`
  padding-top: 72px;
  padding-bottom: 80px;
  color: ${colors.white};
  ${respondTo.md} {
    padding-top: 24px;
  }
`

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  width: 1072px;
  max-width: 100%;
  overflow: hidden;
  ${respondTo.md} {
    margin-top: 0;
    padding: 0 20px;
    box-sizing: border-box;
  }
`

const Selector = styled.div`
  display: flex;
  margin-top: 36px;
  ${respondTo.md} {
    display: block;
    margin-top: 30px;
  }
  > .image {
    width: 160px;
    height: 160px;
    ${respondTo.md} {
      display: none;
    }
    img {
      display: block;
      margin-bottom: 4px;
      width: 100%;
      height: 100%;
    }
    p {
      text-align: center;
      font-size: 18px;
    }
  }
  > .list {
    width: calc(100% - 160px);
    ${respondTo.md} {
      width: 100%;
    }
  }
`
const ValueSection = styled.div`
  margin-top: 40px;
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 24px;
  ${respondTo.md} {
    display: block;
    margin-top: 90px;
    margin-bottom: 60px;
  }
`
const About = styled.div`
  width: 60%;
  ${respondTo.md} {
    width: 100%;
  }
  p {
    margin-top: 20px;
    font-size: 14px;
  }
`
const Option = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
  ${respondTo.md} {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    .back {
      display: none;
    }
  }
  button {
    margin-left: 32px;
    font-weight: 900;
    ${respondTo.md} {
      margin: 0;
      width: 100%;
    }
  }
  
`

export default Section;