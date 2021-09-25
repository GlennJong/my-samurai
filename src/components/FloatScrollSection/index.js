import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const FloatScrollSection = ({ children, addition, onScroll, ...props }) => {
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const additionRef = useRef(null);
  const activeRef = useRef(false);
  const prevScrollRef = useRef(0);

  useEffect(() => {
    window.addEventListener('scroll', handleWatchScroll);
    handleApplyAfterLoadImages().then(_ => applyHolderAndAdditionSize());
    return () => window.removeEventListener('scroll', handleWatchScroll);
  }, []);

  function handleWatchScroll() {
    const currentPageY = window.pageYOffset;
    const contentTop = rootRef.current.offsetTop;
    const contentHeight = rootRef.current.offsetHeight;
    
    if (contentTop < currentPageY && (contentTop + contentHeight) > currentPageY) {
      !activeRef.current && applyFloatSection();
      decreaseAdditionSpace();
      activeRef.current = true;
    }
    else {
      activeRef.current && removeFloatSection();
      activeRef.current = false;
    }
    
    prevScrollRef.current = currentPageY;
    activeRef.current && handleActiveFloatSection();
  }

  function decreaseAdditionSpace() {
    const currentPageY = window.pageYOffset;
    const contentTop = rootRef.current.offsetTop;
    const contentHeight = rootRef.current.offsetHeight;
    const progress = (currentPageY - contentTop) / contentHeight;

    if (currentPageY > (contentTop + contentHeight - window.innerHeight - (addition * progress))) {
      additionRef.current.style.height = addition - (addition * progress) + 'px';
    }

  }

  function handleApplyAfterLoadImages() {
    return new Promise((resolve) => {
      const images = rootRef.current.querySelectorAll('img');
      let counter = 0;
      images.forEach(image => {
        image.onload = checkFinish;
        image.onerror = checkFinish;
      })
      function checkFinish() {
        counter += 1;
        if (counter >= images.length) resolve();
      }
    })
  }
  
  function handleActiveFloatSection() {
    const currentPageY = window.pageYOffset;
    const contentTop = rootRef.current.offsetTop;
    const contentHeight = rootRef.current.offsetHeight;
    
    onScroll({
      distance: contentHeight,
      current: currentPageY - contentTop,
      progress: (currentPageY - contentTop) / contentHeight,
    });
  }

  function applyHolderAndAdditionSize() {
    if (rootRef.current) {
      rootRef.current.style.height = contentRef.current.offsetHeight + addition + 'px';
      additionRef.current.style.height = addition + 'px';
    }
  }

  function applyFloatSection() {
    contentRef.current.style.position = 'fixed';
    contentRef.current.style.width = '100%';
    contentRef.current.style.top = '0px';
    contentRef.current.style.left = '0px';
    contentRef.current.style.zIndex = 2;

  }
  function removeFloatSection() {
    contentRef.current.style.position = null;
    contentRef.current.style.top = null;
    contentRef.current.style.left = null;
    contentRef.current.style.zIndex = null;
  }
  
  return (
    <Root ref={rootRef} {...props}>
      <Content ref={contentRef}>{children}</Content>
      <Addition ref={additionRef}></Addition>
    </Root>
  )
}

const Root = styled.div``
const Content = styled.div``
const Holder = styled.div``
const Addition = styled.div``

export default FloatScrollSection;