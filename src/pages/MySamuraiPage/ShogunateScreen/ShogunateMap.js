import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { colors } from '../../../constants/colors';
import { _w } from '../../../utils/wordingSystem';
import { respondTo } from '../../../utils/responsive';

const Component = ({ shogunate, samurai, onClick, enable, onReady }) => {
  const shogunateData = _w('shogunate');

  const mapRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    axios.get('/images/shogunate-map.svg')
    .then(res => {
      mapRef.current.innerHTML = res.data;
      onReady();
    })
    return () => mapRef?.current?.removeEventListener('click', handleListenMap);
  }, [])

  useEffect(() => {
    if (enable) {
      handleApplyListener();
    };
    return () => mapRef?.current?.removeEventListener('click', handleListenMap);
  }, [enable])

  useEffect(() => {
    if (enable && shogunate) {
      handleMarkShogunate(shogunate);
      handleMovePin(shogunate);
    };
  }, [enable, handleApplyListener])

  function handleApplyListener() {
    mapRef.current.addEventListener('click', handleListenMap);
  }

  function handleListenMap(e) {
    if (e.path[0].id.indexOf('active') === -1) return;
    
    const target = e.path[0].dataset.name;
    // Send selected shogunate.
    onClick(target);
  }

  function handleMovePin(name) {
    const currentShogunate = shogunateData.find(item => item.name === name);
    pinRef.current.style.left = `${currentShogunate.pin.x}%`;
    pinRef.current.style.top = `${currentShogunate.pin.y}%`;
    pinRef.current.style.color = currentShogunate.color;
  }

  function handleMarkShogunate(name) {
    const allMap = mapRef.current.querySelectorAll('rect[id*=map]');
    allMap.forEach(item => item.setAttribute('style', `transform:translate(0px, 0px)`));

    const currentShogunate = mapRef.current.querySelector(`#map-${name}`);
    currentShogunate.setAttribute('style', `transform:translate(0px, -5px)`);
  }
  
  return (
    <Root>
      <Map ref={mapRef}></Map>
      <Pin ref={pinRef} show={enable}>
        <div className="pin-body">
          <div className="image"><img src={samurai} alt="" /></div>
        </div>
      </Pin>
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  ${respondTo.md} {
    display: none;
  }
`

const Map = styled.div`
  svg {
    width: 100%;
  }
  rect[id*="map-"] {
    transition: transform .3s ease;
  }
  path[id*="active-"] {
    cursor: pointer;
  }
`

const Pin = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transition: all .3s ease;
  display: none;
  ${({ show }) => show && css`display: block`};
  .pin-body {
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-50%, -105%);
    z-index: 2;
    &:before, &:after {
      content: "";
      position: absolute;
    }
    &:before {
      left: -6px;
      top: -6px;
      border-radius: 50%;
      width: calc(100% + 12px);
      height: calc(100% + 12px);
      background: ${colors.black};
      z-index: -2;
    }
    &:after {
      top: 100%;
      left: 50%;
      width: 0; 
      height: 0; 
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 20px solid ${colors.black};
      transform: translateX(-50%);
      z-index: -2;
    }
    .image {
      border: 4px solid;
      border-color: currentColor;
      border-radius: 50%;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      box-shadow: inset 0px 0px 0px 2px ${colors.black};
      overflow: hidden;
      z-index: 1;
      img {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
    }
  }

`

export default Component;