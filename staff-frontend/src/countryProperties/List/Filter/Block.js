import React from 'react';
import styled from 'styled-components';

const StBlock = styled.section`
  margin-bottom: 28px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h4`
  margin-bottom: 8px;
  margin-top: 0;
  color: #4e4444;
`;

const Reset = styled.button`
  border: 0;
  background: none;
  padding: 0;
  margin: 0;
  align-self: baseline;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export default function Block({
  title, hasValue, remove, children,
}) {
  return (
    <StBlock>
      <Header>
        <Title>{title}</Title>
        {hasValue && (
          <Reset type="button" onClick={remove}>
            ✕
          </Reset>
        )}
      </Header>

      {children}
    </StBlock>
  );
}
