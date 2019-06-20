import styled from 'styled-components';
import media from '../../../styles/media';

export default styled.button`
  align-self: center;
  margin-top: 12px;
  padding: 21px 32px 17px 32px;
  border: none;
  background-color: #47b34c;
  border-radius: 6px;

  text-transform: uppercase;
  color: #fff;
  font-size: 15px;
  line-height: 18px;
  font-weight: bold;

  display: flex;
  justify-content: center;

  ${media.xs`
    margin-top: 8px;
  `}
`;
