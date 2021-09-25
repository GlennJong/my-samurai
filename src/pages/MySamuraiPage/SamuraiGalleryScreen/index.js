import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import InfomationTitle from '../../../components/InfomationTitle';
import SortToggle from '../../../components/SortToggle';
import { SamuraiHead } from '../../../components/Icons';
import { colors } from '../../../constants/colors';
import { respondTo } from '../../../utils/responsive';
import { zeroTransfer } from '../../../utils/methods';

const Component = ({ data, onSelected }) => {
  const [ sort, setSort ] = useState('ranku');

  const groupData = useMemo(() => {
    const currentData = [...data];
    let type;
    if (sort === 'ranku')  type = 'ranking';
    if (sort === 'number') type = 'id';
    return currentData.sort((a, b) => a[type] - b[type]);
  }, [sort])
  
  function handleToggleSort(e) {
    const currentSort = e.currentTarget.dataset['sort'];
    setSort(currentSort);
  }
  
  return (
    <Root>
      <Wrapper>
        <Head>
          <InfomationTitle className="title" title="My Samurai" showArrow={false}><SamuraiHead /></InfomationTitle>
          <SortToggle data={['ranku', 'number']} current={sort} onClick={handleToggleSort} />
        </Head>
        <Gallery>
          { groupData.map((item, i) =>
            <Item key={i} onClick={onSelected}><img src={item.image} alt="" /><p># {zeroTransfer(item.id)}</p></Item>
          ) }
        </Gallery>
      </Wrapper>
    </Root>
  )
}


const Root = styled.div`
  margin-top: 56px;
  color: ${colors.white};
  ${respondTo.md} {
    margin-top: 0;
  }
`

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 1072px;
  max-width: 100%;
  overflow: hidden;
  ${respondTo.md} {
    padding: 0 20px;
    box-sizing: border-box;
  }
`

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${respondTo.md} {
    display: block;
    > .title {
      margin-bottom: 24px;
    }
  }
`

const Gallery = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;
  margin-top: 20px;
`

const Item = styled.li`
  margin-bottom: 20px;
  padding: 0 8px;
  width: calc(100%/6);
  box-sizing: border-box;
  cursor: pointer;
  ${respondTo.md} {
    width: 50%;
  }
  img {
    display: block;
    margin-bottom: 14px;
    width: 100%;
    height: auto;
  }
  p {
    text-align: center;
  }
`


export default Component;