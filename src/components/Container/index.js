import styled from 'styled-components';
import { respondTo } from '../../utils/responsive';

const Container = styled.div`
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  ${respondTo.md} {
    padding: 0 24px;
    box-sizing: border-box;
  }
`

export default Container;