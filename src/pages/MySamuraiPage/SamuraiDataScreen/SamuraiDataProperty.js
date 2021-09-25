import React, { useState } from 'react';
import styled from 'styled-components';
import SamuraiDataModalContent, { ModalItem } from './SamuraiDataModalContent';
import InfomationTitle from '../../../components/InfomationTitle';
import ModalBox from '../../../components/ModalBox';
import { Torii } from '../../../components/Icons';
import { respondTo } from '../../../utils/responsive';

const Component = ({ data }) => {
  //console.log(data)
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
          title="PROPERTIES"
          onClose={handleCloseModal}
          background="/images/samurai_property/property.png"
          icon={() => <Torii />}>
          <ModalList>
            <li><ModalPropertyItem name="Accesories" data={data} /></li>
            <li><ModalPropertyItem name="Bushi Ranku" data={data} /></li>
            <li><ModalPropertyItem name="Clothes" data={data} /></li>
            <li><ModalPropertyItem name="Eyes" data={data} /></li>
            <li><ModalPropertyItem name="Hats and Hairstyles" data={data} /></li>
            <li><ModalPropertyItem name="Location" data={data} /></li>
            <li><ModalPropertyItem name="Shogunate" data={data} /></li>
            <li><ModalPropertyItem name="Type" data={data} /></li>
          </ModalList>
        </SamuraiDataModalContent>
      </ModalBox>
      <ModalButton title="properties" onClick={handleOpenModal}><Torii /></ModalButton>
      <List>
        <li><PropertyItem name="Accesories" data={data} /></li>
        <li><PropertyItem name="Bushi Ranku" data={data} /></li>
        <li><PropertyItem name="Clothes" data={data} /></li>
        <li><PropertyItem name="Eyes" data={data} /></li>
        <li><PropertyItem name="Hats and Hairstyles" data={data} /></li>
      </List>
    </Root>
  )
}

const PropertyItem = ({ name, data }) => {
  const {trait_type, value} = data.find(child => child.trait_type === name);
  return (
    <PropertyRoot>
      <div className="label">{ trait_type }</div>
      <div className="value">{ value }</div>
    </PropertyRoot>
  )
}

const ModalPropertyItem = ({ name, data }) => {
  const { trait_type, value } = data.find(child => child.trait_type === name);
  return (
    <ModalItem title={trait_type} content={value} />
  )
}

const Root = styled.div`
`

const ModalButton = styled(InfomationTitle)`
  cursor: pointer;
`

const ModalList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  ${respondTo.md} {
    display: block;
  }
  > li {
    padding: 0 20px;
    margin-bottom: 20px;
    width: 30%;
    box-sizing: border-box;
    ${respondTo.md} {
      padding: 0;
      width: 100%;
    }
  }
`

const List = styled.ul`
  display: flex;
  margin: 0 -5px;
  margin-top: 8px;
  ${respondTo.md} {
    margin: 0 -10px;
    margin-top: 8px;
    overflow: auto;
  }
  li {
    padding: 0 5px;
    width: 20%;
    box-sizing: border-box;
    ${respondTo.md} {
      padding: 0 10px;
      width: 50%;
    }
  }
`

const PropertyRoot = styled.div`
  font-size: 14px;
  overflow: hidden;
  > .label {
    white-space: nowrap;
    text-transform: uppercase;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  > .value {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

export default Component;