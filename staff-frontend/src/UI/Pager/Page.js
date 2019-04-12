import React from 'react';
import styled from 'styled-components';

const ActivePage = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-size: 18px;
  line-height: 1;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #f44336;
  color: #ffffff;
`;

const StLink = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  color: #232323;
  font-size: 18px;
  line-height: 1;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #fcd0cd;
  }

  &:focus {
    background-color: #f8a19a;
    color: #fff;
    outline: none;
  }
`;

const Arrow = styled.button`
  position: relative;
  margin: 0 10px;
  padding: 1rem;
  font-size: 3.5rem;
  font-weight: 300;
  background: transparent;
  border: none;
  color: #d8d8d8;
  vertical-align: sub;
  cursor: pointer;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover,
  &:focus {
    color: #ff4c4e;
    outline: none;
  }

  &:first-child::before {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    content: '';
    width: 10px;
    height: 20px;
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxMSAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xLjE5MTA3IDkuNTAyODdMOC44ODY1OSAxLjIwNTk5QzkuMTQxMzUgMC45MzEzMzUgOS41NTQzMSAwLjkzMTMzNSA5LjgwODkzIDEuMjA1OTlDMTAuMDYzNyAxLjQ4MDUxIDEwLjA2MzcgMS45MjU3NCA5LjgwODkzIDIuMjAwMjZMMi41NzQ1MiAxMEw5LjgwODkzIDE3Ljc5OTdDMTAuMDYzNyAxOC4wNzQzIDEwLjA2MzcgMTguNTE5NSA5LjgwODkzIDE4Ljc5NEM5LjU1NDMxIDE5LjA2ODcgOS4xNDEzNSAxOS4wNjg3IDguODg2NTkgMTguNzk0TDEuMTkxMDcgMTAuNDk3MUMwLjkzNjMxMSAxMC4yMjI2IDAuOTM2MzExIDkuNzc3MzkgMS4xOTEwNyA5LjUwMjg3WiIgZmlsbD0iIzhFOEU4RSIgc3Ryb2tlPSIjOEU4RThFIiBzdHJva2Utd2lkdGg9IjAuNTYyNSIvPgo8L3N2Zz4K);
  }

  &:last-child::after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    content: '';
    width: 10px;
    height: 20px;
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxMSAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xLjE5MTA3IDkuNTAyODdMOC44ODY1OSAxLjIwNTk5QzkuMTQxMzUgMC45MzEzMzUgOS41NTQzMSAwLjkzMTMzNSA5LjgwODkzIDEuMjA1OTlDMTAuMDYzNyAxLjQ4MDUxIDEwLjA2MzcgMS45MjU3NCA5LjgwODkzIDIuMjAwMjZMMi41NzQ1MiAxMEw5LjgwODkzIDE3Ljc5OTdDMTAuMDYzNyAxOC4wNzQzIDEwLjA2MzcgMTguNTE5NSA5LjgwODkzIDE4Ljc5NEM5LjU1NDMxIDE5LjA2ODcgOS4xNDEzNSAxOS4wNjg3IDguODg2NTkgMTguNzk0TDEuMTkxMDcgMTAuNDk3MUMwLjkzNjMxMSAxMC4yMjI2IDAuOTM2MzExIDkuNzc3MzkgMS4xOTEwNyA5LjUwMjg3WiIgZmlsbD0iIzhFOEU4RSIgc3Ryb2tlPSIjOEU4RThFIiBzdHJva2Utd2lkdGg9IjAuNTYyNSIvPgo8L3N2Zz4K);
    transform: rotate(180deg);
  }

  ${p =>
    p.isDisabled
    && `
    color: #d8d8d8;
    cursor: default;
    pointer-events: none;

    &:hover,
    &:focus {
      color: #232323;
      background: transparent;
    }
  `}
`;

export default (props) => {
  const {
    isArrow,
    isDisabled,
    isActive,
    onClick,
    children,
    key,
    to,
    rel,
  } = props;

  if (!isArrow && isActive) {
    return <ActivePage>{children}</ActivePage>;
  }

  if (isArrow) {
    return (
      <Arrow
        isDisabled={isDisabled}
        to={to}
        key={key}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </Arrow>
    );
  }

  return (
    <StLink to={to} key={key} rel={rel} onClick={onClick}>
      {children}
    </StLink>
  );
};
