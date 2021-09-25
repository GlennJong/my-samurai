import styled, { css } from 'styled-components';
import { colors } from '../../constants/colors';

const TabButton = styled.button`
  border: 0;
  padding: 28px 20px;
  border: 1px solid ${colors.white};
  border-radius: 20px;
  background: transparent;
  color: ${colors.white};
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  ${({ active }) => active && css`
    background: ${colors.white};
    color: ${colors.black};
  `}
  ${({ disable }) => disable && css`
    opacity: 0.5;
    pointer-events: none;
  `}
`

export default TabButton;