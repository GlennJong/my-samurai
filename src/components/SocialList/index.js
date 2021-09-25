import React from 'react';
import styled from 'styled-components';
import { respondTo } from '../../utils/responsive';
import { Twitter, Medium, Discord } from '../Icons';

const SocialList = ({ data, ...props }) => {
  return (
    <List {...props}>
      { data.map((social, i) =>
        <SocialItem key={i} icon={social.icon} href={social.link} target="_blank" />
      ) }
    </List>
  )
}

const SocialItem = ({icon, ...props}) => {
  return (
    <Item {...props}>
      { icon === 'Twitter' && <Twitter /> }
      { icon === 'Medium' && <Medium /> }
      { icon === 'Discord' && <Discord /> }
    </Item>
  )
}

const List = styled.div`
  display: flex;
  align-items: center;
  ${respondTo.md} {
    justify-content: center;
  }
`
const Item = styled.a`
  display: flex;
  align-items: center;
  & + a {
    margin-left: 24px;
  }
`

export default SocialList;