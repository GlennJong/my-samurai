import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const Button = styled.button`
  border: 0;
  width: 180px;
  height: 60px;
  border: 1px solid ${colors.white};
  border-radius: 0;
  background: ${colors.white};
  color: ${colors.black};
  font-size: 20px;
  font-weight: 400;
  &:active {
    background: transparent;
    color: ${colors.white};
  }
`

export const GhostButton = styled.button`
  border: 0;
  width: 180px;
  height: 60px;
  border: 1px solid ${colors.white};
  border-radius: 0;
  background: transparent;
  color: ${colors.white};
  font-size: 20px;
  font-weight: 400;
  &:active {
    background: transparent;
    color: ${colors.white};
  }
`
