import React, { useState } from 'react';
import styled from 'styled-components';
import SamuraiDataModalContent, { ModalItem } from './SamuraiDataModalContent';
import ModalBox from '../../../components/ModalBox';
import InfomationTitle from '../../../components/InfomationTitle';
import { Shuriken } from '../../../components/Icons';
import { _w } from '../../../utils/wordingSystem';
import { respondTo } from '../../../utils/responsive';

const Component = ({ data }) => {
  const shogunateData = _w('shogunate');
  const { value } = data.find(child => child.trait_type === 'Shogunate');
  const currentShgunateData = shogunateData.find(item => item.name === value);

  const [ openModal, setOpenModal ] = useState(false);

  function handleOpenModal() {
    setOpenModal(true);
  }
  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <Root>
      <ModalBox open={openModal} onClose={handleCloseModal}>
        <SamuraiDataModalContent
          title="SHOGUNATE"
          onClose={handleCloseModal}
          background={currentShgunateData.map}
          icon={() => <Shuriken />}>
          <ModalContent>
            <ModalItem content={currentShgunateData.description} />
          </ModalContent>
        </SamuraiDataModalContent>
      </ModalBox>
      <ModalButton title="shogunate" onClick={handleOpenModal}><Shuriken /></ModalButton>
      <IconItem data={currentShgunateData} />
    </Root>
  )
}


const IconItem = ({ data, ...props }) => {
  return (
    <IconItemRoot color={data.color} {...props}>
      <div className="icon"><img src={data.icon} alt="" /></div>
      <div className="title">{data.title}</div>
    </IconItemRoot>
  )
}


const Root = styled.div`
`

const ModalButton = styled(InfomationTitle)`
  cursor: pointer;
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

const ModalContent = styled.div`
  width: 50%;
  ${respondTo.md} {
    margin-bottom: 40px;
    width: 100%;
  }
`

export default Component;