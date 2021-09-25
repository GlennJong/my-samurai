import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../constants/colors';
import Img from '../../components/Img';
// import StickySection from '../../components/StickySection';
import FloatScrollSection from '../../components/FloatScrollSection';
import { respondTo } from '../../utils/responsive';
import { detectMob } from '../../utils/methods';
import useIntersectionObserver from '../../utils/useIntersectionObserver';

const IntroSection = ({ wording, ...props }) => {
  const rootRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const backSamuraiRef = useRef(null);
  const dialogRef = useRef(null);
  const maskRef = useRef(null);
  const [ applyScrollWatcher, setApplyScrollWatcher ] = useState(false);
  const [ dialogStep, setDialogStep ] = useState(1);
  const [ backSamurai, setBackSamurai ] = useState(1);

  useIntersectionObserver(rootRef, handleActiveScrollWatcher, {
    root: null,
    rootMargin: `0%`,
    threshold: [0]
  });

  function handleActiveScrollWatcher(e) {
    setApplyScrollWatcher(e[0].isIntersecting);
  }

  function handleTriggerDialog(step) {
    setDialogStep(step);
  }

  function handleTriggerMask(step) {
    setBackSamurai(step);
  }


  function handleScrollSection(status) {
    if (!detectMob()) applyDesktopScrollSection(status)
    else applyMobileScrollSection(status)
  }
  
  function applyDesktopScrollSection(status) {
    const { current } = status;
    const preOffsetY = 72;
    const dialogTriggerStart = dialogRef.current.offsetTop - preOffsetY;
    const dialogTriggerEnd = dialogTriggerStart + 600;
    const maskTriggerStart = maskRef.current.offsetTop + 600 - preOffsetY;
    const maskTriggerEnd = maskTriggerStart + 400;

    if (current < dialogTriggerStart) {
      contentWrapperRef.current.style.transform = `translateY(-${current}px)`;
    }
    else if (current > dialogTriggerStart && current < dialogTriggerEnd) {
      if (current > dialogTriggerStart && current < dialogTriggerStart + 200) setDialogStep(1)
      else if (current > dialogTriggerStart + 200 && current < dialogTriggerStart + 400) setDialogStep(2)
      else if (current > dialogTriggerStart + 400 && current < dialogTriggerStart + 600) setDialogStep(3)
    }
    else if (current > dialogTriggerEnd && current < maskTriggerStart ) {
      contentWrapperRef.current.style.transform = `translateY(-${current-600}px)`;
    }
    else if (current > maskTriggerStart && current < maskTriggerEnd ) {
      if (current > maskTriggerStart && current < maskTriggerStart + 200) setBackSamurai(1)
      else if (current > maskTriggerStart + 200 && current < maskTriggerStart + 400) setBackSamurai(2)
    }
    else if (current > maskTriggerEnd) {
      contentWrapperRef.current.style.transform = `translateY(-${current-1000}px)`;
    }
  }

  function applyMobileScrollSection(status) {
    const { current } = status;
    const preOffsetY = (window.innerHeight/3);
    const maskTriggerStart = maskRef.current.offsetTop - preOffsetY;
    const maskTriggerEnd = maskTriggerStart + 400;

    if (current < maskTriggerStart) {
      contentWrapperRef.current.style.transform = `translateY(-${current}px)`;
    }
    else if (current > maskTriggerStart && current < maskTriggerEnd ) {
      if (current > maskTriggerStart && current < maskTriggerStart + 200) setBackSamurai(1)
      else if (current > maskTriggerStart + 200 && current < maskTriggerStart + 400) setBackSamurai(2)
    }
    else if (current > maskTriggerEnd) {
      contentWrapperRef.current.style.transform = `translateY(-${current-400}px)`;
    }
  }

  return (
    <>
    {/* <Blocker /> */}
    <Root ref={rootRef} {...props}>
      <FloatScrollSection onScroll={handleScrollSection} addition={ detectMob() ? 400 : 600 + 400}>
        <ContentWrapper ref={contentWrapperRef}>
          <DialogScreen>
            <DialogWrapper ref={dialogRef}>
              <DialogItem show={dialogStep === 1}>
                <p className="title">{ wording.dialog1.title }</p>
                <p className="content">{ wording.dialog1.content }</p>
              </DialogItem>
              <Icon turn={dialogStep === 3} show={dialogStep === 2 || dialogStep === 3} className="icon" src="/images/homepage-intro-icon.png" />
              <DialogItem show={dialogStep === 2}>
                <p className="content">{ wording.dialog2 }</p>
              </DialogItem>
              <DialogItem show={dialogStep === 3}>
                <p className="content">{ wording.dialog3 }</p>
              </DialogItem>
            </DialogWrapper>
          </DialogScreen>
          <br />
          <MaskScreen>
            <MaskWrapper ref={maskRef}>
              <Cover src={wording.cover}></Cover>
              <BackSamuraiContent ref={backSamuraiRef} index={backSamurai}>
                { wording.samurai.map((item, i) =>
                  <BackItem key={i} src={item} />
                ) }
              </BackSamuraiContent>
            </MaskWrapper>
          </MaskScreen>
        </ContentWrapper>
      </FloatScrollSection>
    </Root>
    </>
  )
}

const Blocker = styled.div`
  height: 5px;
`

const Root = styled.div`
  background: ${colors.black};
  overflow: hidden;
`
const ContentWrapper = styled.div`
`

const DialogScreen = styled.div`
  position: relative;
  padding-top: 160px;
  padding-bottom: 100px;
  ${respondTo.md} {
    padding-top: 100px;
    padding-bottom: 60px;
  }
`

const Icon = styled(Img)`
  position: absolute;
  top: 45px;
  left: calc(50% - 45px);
  width: 90px;
  text-align: center;
  ${({ turn }) => turn && css`
    transform: rotate(180deg);
  `}
  opacity: 0;
  transition: all .6s ease;
  ${({ show }) => show && css`
    top: 0;
    opacity: 1;
  `};
  ${respondTo.md} {
    position: relative;
    top: 0;
    left: 0;
    margin: 0 auto;
    margin-bottom: 36px;
    width: 46px;
    opacity: 1;
  }
`

const DialogWrapper = styled.div`
  position: relative;
  margin: auto;
  width: 800px;
  height: 250px;
  max-width: 100%;
  ${respondTo.md} {
    padding: 0 36px;
    box-sizing: border-box;
    height: auto;
  }
`

const DialogItem = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: ${colors.white};
  text-align: center;
  opacity: 0;
  transform: translateY(33%);
  transition: all .6s ease;
  ${({ show }) => show && css`
    opacity: 1;
    transform: translateY(0);
  `};
  ${respondTo.md} {
    position: relative;
    opacity: 1;
    transform: translateY(0);
    margin-bottom: 36px;
  }
  .title {
    margin-bottom: 5px;
    font-size: 90px;
    font-weight: 600;
    ${respondTo.md} {
      margin-bottom: 14px;
      font-size: 52px;
    }
  }
  .content {
    font-size: 36px;
    ${respondTo.md} {
      font-size: 18px;
    }
  }
`
const MaskScreen = styled.div`
  padding-top: 100px;
  ${respondTo.md} {
    padding-top: 60px;
  }
`

const MaskWrapper = styled.div`
  position: relative;
  overflow-y: hidden;
  z-index: 0;
`

const Cover = styled(Img)`
`
const BackSamuraiContent = styled.div`
  position: absolute;
  top: 0%;
  right: 8%;
  width: 40%;
  z-index: -1;
  transition: transform 1s ease;
  ${({ index }) => css`
    transform: translateY(-${50 * (index-1)}%);
  `}
`
const BackItem = styled(Img)`
`

export default IntroSection;