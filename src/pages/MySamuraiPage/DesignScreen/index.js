import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Button, GhostButton } from '../../../components/Button';
import DesignPageHeading from './DesignPageHeading';
import DesignTabs from './DesignTabs';
import DesignCartHint from './DesignCartHint';
import DesignSamuraiInfo from './DesignSamuraiInfo';
import DesignSelector from './DesignSelector';
import DesignOverview from './DesignOverview';
import { CuteSamurai } from '../../../components/Icons';
import { _w } from '../../../utils/wordingSystem';
import { Locker, Recover, Coin } from '../../../components/Icons';
import { colors } from '../../../constants/colors';
import { respondTo } from '../../../utils/responsive';

const Section = ({ data, shogunate, onPrev, ...props }) => {
  const wording = _w('my_samurai.design');
  const defaultDesignData = _w('design');

  const [ currentOption, setCurrentOption ] = useState(defaultDesignData[0].name)
  const [ designData, setDesignData ] = useState(defaultDesignData);
  const [ showCartContent, setShowCartContent ] = useState(false);

  function handleClickTab(tab) {
    setCurrentOption(tab);
  }

  function handleSelectedDesignItem(data) {
    setDesignData(data);
  }

  function handleClickCartHint() {
    setShowCartContent(!showCartContent);
  }

  return (
    <Root {...props}>
      <DesignCartHint
        data={designData}
        show={showCartContent}
        onClick={handleClickCartHint} />
      <Wrapper>
        <Heading>
          <DesignPageHeading title={wording.heading}><CuteSamurai /></DesignPageHeading>
          <Discount>
            <p>{wording.discount}</p>
            <Locker />
          </Discount>
        </Heading>
        <DesignBoard>
          <Samurai>
            <DesignSamuraiInfo data={data} />
          </Samurai>
          <Options>
            <MobileShowLayout show={!showCartContent}>
              <DesignTabs
                data={designData}
                currentOption={currentOption}
                onSelected={handleClickTab} />
        
              <DesignSelector 
                data={designData}
                shogunate={shogunate}
                option={currentOption}
                onChange={handleSelectedDesignItem} />
            </MobileShowLayout>
            
            { designData.some((item) => item.edit) &&
              <MobileShowLayout show={showCartContent}>
                <DesignOverview shogunate={shogunate} data={designData} onChange={handleSelectedDesignItem} />
              </MobileShowLayout>
            }
          </Options>
        </DesignBoard>
        <Checkout>
          <div className="left">
            <GhostButton onClick={onPrev}>BACK</GhostButton>
          </div>
          <div className="right">
            <GhostButton className="recover">
              <Recover />
              <span>RECOVERY</span>
            </GhostButton>
            <Button>
              <Coin />
              <span>CHECKOUT</span>
            </Button>
          </div>
        </Checkout>
      </Wrapper>
    </Root>
  )
}

const Root = styled.div`
  padding-top: 72px;
  padding-bottom: 80px;
  color: ${colors.white};
  ${respondTo.md} {
    padding-top: 0;
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
    box-sizing: border-box;
  }
`
const Heading = styled.div`
  position: relative;
`

const Discount = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 8px;
  border: 1px solid ${colors.white};
  border-radius: 12px;
  padding: 12px 16px;
  box-sizing: border-box;
  ${respondTo.md} {
    display: none;
  }
  p {
    margin-right: 12px;
    font-size: 14px;
    line-height: 18px;
    white-space: break-spaces;
  }
`

const DesignBoard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 120px;
  ${respondTo.md} {
    margin-top: 0;
  }
`
const Samurai = styled.div`
  width: 35%;
  ${respondTo.md} {
    display: none;
  }
`
const Options = styled.div`
  width: 60%;
  ${respondTo.md} {
    width: 100%;
  }

`
const Checkout = styled.div`
  display: flex;
  justify-content: space-between;
  ${respondTo.md} {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .left {
    button {
      font-weight: 900;
    }
    ${respondTo.md}{
      display: none;
    }
  }
  .right {
    .recover {
      ${respondTo.md}{
        display: none;
      }
    }
    button {
      display: inline-flex;
      vertical-align: middle;
      align-items: center;
      justify-content: center;
      margin-left: 45px;
      font-weight: 900;
      ${respondTo.md} {
        margin: 0;
        width: 100%;
      }
      svg {
        margin-right: 8px;
      }
    }
  }
`

const MobileShowLayout = styled.div`
  ${respondTo.md} {
    display: none;
    ${({ show }) => show && css`
      display: block;
    `}
  }
`

export default Section;