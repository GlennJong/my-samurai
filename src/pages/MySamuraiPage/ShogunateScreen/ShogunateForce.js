import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import PieChart from '../../../components/PieChart';
import { SamuraiHead } from '../../../components/Icons';
import { _w } from '../../../utils/wordingSystem';
import { respondTo } from '../../../utils/responsive';

const demoData = [
  {
      "Kamakura": 12
  },
  {
      "Muromachi": 23
  },
  {
      "Edo": 30
  },
  {
      "Oda": 6
  },
  {
      "Imperial_House": 8
  }
]

const ShogunateForce = ({ ...props }) => {
  const shogunateData = _w('shogunate');
  const [ data, setData ] = useState(null);
  
  useEffect(() => {
    // fetch data
    // 取得 API 結果直接丟到下面這隻 function
    getCurrentShogunateData(demoData);
  }, [])
  
  function getCurrentShogunateData(resultData) {
    if (!resultData) return;
    const sum = resultData.map(data => data[Object.keys(data)[0]]).reduce((a, b) => a + b, 0);
    const data = resultData.map(data => {
      const name = Object.keys(data)[0].toLowerCase();
      const currentShogunate = shogunateData.find(data => data.name === name);
      return {
        value: data[Object.keys(data)[0]],
        percent: Math.round(data[Object.keys(data)[0]] / sum * 100),
        ...currentShogunate
      }
    })
    setData(data);
  }
  
  const shogunateDataWithSorting = useMemo(() => {
    return data?.sort((a, b) => (a.percent > b.percent ? -1 : 1));
  }, [data])

  return (
    <Root {...props}>
      <div className="chart">
        { shogunateDataWithSorting && <PieChart data={shogunateDataWithSorting} /> }
      </div>
      <List>
        { shogunateDataWithSorting &&
          shogunateDataWithSorting.map((item, i) =>
          <li key={i}><IconItem data={item} /></li>
        ) }
      </List>
    </Root>
  )
}

const IconItem = ({ data, ...props }) => {
  return (
    <IconItemRoot color={data.color} {...props}>
      <div className="icon"><img src={data.icon} alt="" /></div>
      <div className="info">
        <div className="counter">
          <span className="percent">{data.percent}%</span>
          <span className="qty"><SamuraiHead />{data.qty}</span>
        </div>
        <div className="title">{data.title}</div>
      </div>
    </IconItemRoot>
  )
}

const Root = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 40px;
  ${respondTo.md} {
    display: block;
    .chart {
      margin-bottom: 54px;
      text-align: center;
    }
  }
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-left: 20px;
  margin: 0 -15px;
  box-sizing: border-box;
  ${respondTo.md} {
    display: block;
    margin: 0;
    padding: 0;
  }
  > li {
    margin-bottom: 28px;
    padding: 0 15px;
    width: 25%;
    box-sizing: border-box;
    ${respondTo.md} {
      padding: 0;
      width: 100%;
    }
  }
`

const IconItemRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > .icon {
    margin-right: 12px;
    width: 66px;
    height: 66px;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  > .info {
    > .counter {
      span {
        display: inline-block;
        line-height: 1;
        vertical-align: baseline;
      }
      > .percent { margin-right: 8px; font-size: 24px; font-weight: 700; }
      > .qty { font-size: 12px; opacity: .5; svg { width: 14px; height: auto; } }
    }
    > .title {
      white-space: break-spaces;
      color: ${({ color }) => color};
      font-size: 16px;
      line-height: 20px;
    }
  }
`


export default ShogunateForce;