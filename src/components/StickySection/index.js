import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { scrollTo } from '../../utils/scrollTo';
import { detectMob } from '../../utils/methods';

const StickeySection = ({ active, offsetY=0, onMove, steps, children, enableOnMobile=false, ...props }) => {
  const rootRef = useRef(null);
  const statusRef = useRef(false);
  const stepsRef = useRef(0);

  useEffect(() => {
    if (!detectMob() || enableOnMobile) {
      if (active) {
        !statusRef.current && window.addEventListener('scroll', handleTriggerSticky);
      }
      else {
        window.removeEventListener('scroll', handleTriggerSticky)
        statusRef.current = false;
        stepsRef.current = Math.max(Math.min(stepsRef.current, steps), 0);
      };
    }

    return () => window.removeEventListener('scroll', handleTriggerSticky);
  }, [active]);

  function handleTriggerSticky() {
    const { y, height } = rootRef.current.getBoundingClientRect();
    const currentOffsetY = y - offsetY;
    
    if (( -currentOffsetY < height && currentOffsetY < 0) && !statusRef.current) {
      scrollTo(.1, rootRef.current.offsetTop - offsetY);
      enableSticy();
      statusRef.current = true;
    }
  }

  function enableSticy() {
    handleWatchMove('enable');
  }

  function disableSticky() {
    handleWatchMove('disable');
  }
  

  const wheelMovesRef = useRef([]);
  const timerRef = useRef(null);
  
  function handleWatchWheelMove(event) {
    event.preventDefault();

    function wheelMove(e) {
      wheelMovesRef.current.push(e.deltaY);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(wheelEnd, 50);
    }
    function wheelEnd() {
      detectMoveDirection(wheelMovesRef.current[wheelMovesRef.current.length-1])
      wheelMovesRef.current = [];
      clearTimeout(timerRef.current);
    }

    wheelMove(event);
  }

  // ---------- Action on Mobile ---------------
  const touchStartYRef = useRef(0);
  const touchMovesRef = useRef([])
  
  function touchStart(event) {
    touchStartYRef.current = event.touches[0].pageY;
  }
  function touchMove(event) {
    event.preventDefault();
    touchMovesRef.current.push(Math.floor(touchStartYRef.current - event.touches[0].pageY));
  }
  function touchEnd() {
    detectMoveDirection(touchMovesRef.current[touchMovesRef.current.length-1]);
    touchMovesRef.current = [];
  }

  function handleWatchMove(status) {
    if (status === 'enable') {
      console.log('enable')
      window.addEventListener('touchstart', touchStart, { passive: false });
      window.addEventListener('touchmove', touchMove, { passive: false });
      window.addEventListener('touchend', touchEnd, { passive: false });
      window.addEventListener('wheel', handleWatchWheelMove, { passive: false });
    }
    else if (status === 'disable') {
      console.log('disable')
      window.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchmove', touchMove);
      window.removeEventListener('touchend', touchEnd);
      window.removeEventListener('wheel', handleWatchWheelMove);
    }
  }

  function detectMoveDirection(value) {
    const step = value >= 0 ? 1 : -1;
    stepsRef.current += step;
    if (stepsRef.current <= steps && stepsRef.current > 0) {
      onMove(stepsRef.current);
    }
    else {
      disableSticky();
    }
  }
  

  return (
    <Root ref={rootRef} {...props}>
      { children }
    </Root>
  )
}

const Root = styled.div`
`

export default StickeySection;