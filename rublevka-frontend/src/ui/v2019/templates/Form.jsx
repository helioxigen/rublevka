import styled from 'styled-components';
import media from '../../../styles/media';

export default styled.form`
  display: flex;
  flex-direction: column;

  header {
    margin-bottom: 12px;
  }

  footer {
    margin-top: 12px;
  }

  .error {
    text-align: center;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 0.535714px;

    margin: 4px 0 0;

    color: #f44336;
  }
`;
