import React, { useState } from 'react';
import styled from 'styled-components';
import SamuraiDataModalContent, { ModalItem } from './SamuraiDataModalContent';
import ModalBox from '../../../components/ModalBox';
import InfomationTitle from '../../../components/InfomationTitle';
import { Fan } from '../../../components/Icons';
import { respondTo } from '../../../utils/responsive';

const Component = ({ content }) => {
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
          title="MOTTO"
          onClose={handleCloseModal}
          background="/images/samurai_property/motto.png"
          icon={() => <Fan />}>
          <ModalContent>
            <ModalItem content={content} />
          </ModalContent>
        </SamuraiDataModalContent>
      </ModalBox>
      <ModalButton title="motto" onClick={handleOpenModal}><Fan /></ModalButton>
      <Content>{ content }</Content>
    </Root>
  )
}

const Root = styled.div`
`

const Content = styled.div`
  margin-top: 8px;
  font-size: 14px;
`

const ModalButton = styled(InfomationTitle)`
  cursor: pointer;
`

const ModalContent = styled.div`
  width: 50%;
  ${respondTo.md} {
    margin-bottom: 40px;
    width: 100%;
  }
`

export default Component;