import React from 'react';
import styled from 'styled-components';
import SamuraiDataInfomation from './SamuraiDataInfomation';
import { Button } from '../../../components/Button';
import { colors } from '../../../constants/colors';
import { _w } from '../../../utils/wordingSystem';
import { respondTo } from '../../../utils/responsive';

const Section = ({ data, onNext, ...props }) => {
  const wording = _w('my_samurai.samurai')
  return (
    <Root {...props}>
      <Heading>
        <img src="/images/my_samurai-heading-left.svg" alt="" />
        <img className="heading" src="/images/my_samurai-heading.png" alt="" />
        <img src="/images/my_samurai-heading-right.svg" alt="" />
      </Heading>
      <Wrapper>
        <SamuraiDataInfomation data={ data } >
          <Design type="half">
            <Button onClick={onNext}>{ wording.design }</Button>
          </Design>
        </SamuraiDataInfomation>
      </Wrapper>
    </Root>
  )
}

const Root = styled.div`
  padding-top: 72px;
  ${respondTo.md} {
    padding-top: 0;
  }
`

const Heading = styled.div`
  display: flex;
  align-items: cener;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  overflow: hidden;
  ${respondTo.md} {
    display: none;
  }
  .heading {
    margin: 0 9px;
    width: 370px;
  }
`
const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 24px;
  width: 1072px;
  max-width: 100%;
  overflow: hidden;
  ${respondTo.md} {
    margin: 0;
    padding: 0 20px;
    box-sizing: border-box;
  }
`

const Design = styled.li`
  display: flex;
  align-items: flex-end;
  margin-bottom: 26px;
  padding: 0 28px;
  width: 50%;
  box-sizing: border-box;
  > button {
    width: 100%;
    font-weight: 900;
  }
  ${respondTo.md} {
    position: fixed;
    left: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    > button {
      width: 100%;
    }
  }
`

export default Section;