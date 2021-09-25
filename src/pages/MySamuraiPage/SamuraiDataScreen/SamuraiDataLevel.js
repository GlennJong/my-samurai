import React, { useState } from 'react';
import styled from 'styled-components';
import SamuraiDataModalContent, { ModalItem } from './SamuraiDataModalContent';
import ModalBox from '../../../components/ModalBox';
import InfomationTitle from '../../../components/InfomationTitle';
import { Matsu } from '../../../components/Icons';
import { colors } from '../../../constants/colors';
import { respondTo } from '../../../utils/responsive';

const Component = ({ data }) => {
  const [ openModal, setOpenModal ] = useState(false);

  function handleOpenModal() {
    setOpenModal(true);
  }
  function handleCloseModal() {
    setOpenModal(false);
  }

  const levelData = data.find(child => child.trait_type === 'Ryoku');
  //console.log(levelData)


  return (
    <Root>
      <ModalBox open={openModal} onClose={handleCloseModal}>
        <SamuraiDataModalContent
          title="LEVELS"
          onClose={handleCloseModal}
          background="/images/samurai_property/level.png"
          icon={() => <Matsu />}>
          <ModalContent>
            <ModalItem content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum maxime quidem explicabo atque placeat quisquam" />

            <div className="bar-counter">
              <Head>
                <span>RYOKO</span>
                <span>{ levelData.value } OF { levelData.max_value }</span>
              </Head>
              <BarWrapper><Bar width={levelData.value / levelData.max_value} /></BarWrapper>
            </div>
          </ModalContent>
        </SamuraiDataModalContent>
      </ModalBox>
      <ModalButton title="levels" onClick={handleOpenModal}><Matsu /></ModalButton>
      <Head>
        <span>RYOKO</span>
        <span>{ levelData.value } OF { levelData.max_value }</span>
      </Head>
      <BarWrapper><Bar width={levelData.value / levelData.max_value} /></BarWrapper>
    </Root>
  )
}

const Root = styled.div`
`


const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 14px;
`
const BarWrapper = styled.div`
  position: relative;
  margin-top: 8px;
  border: 1px solid ${colors.white};
  border-radius: 12px;
  height: 16px;
`

const Bar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 12px;
  height: 100%;
  width: ${({width}) => width * 100}%;
  background: ${colors.white};
`

const ModalButton = styled(InfomationTitle)`
  cursor: pointer;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 100%;
  ${respondTo.md} {
    margin-bottom: 40px;
    width: 100%;
  }
`

export default Component;