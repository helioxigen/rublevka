import React from 'react';
import styled from 'styled-components';
import UI from '../../../../ui';

const { Icon } = UI;

const FavoriteIcon = styled(Icon).attrs({
  icon: 'favorite',
})`
  width: 1.2em;
  height: 1.2em;

  stroke: #f44336;
  stroke-width: 2px;
  fill: ${props => (props.checked ? '#F44336' : 'transparent')};
  margin-right: 8px;

  &:hover {
    opacity: 1;
  }
`;

const Button = styled.button`
  padding: 10px 24px;
  border: none;
  background-color: ${props => (props.grey ? '#666666' : '#47b34c')};
  border-radius: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-size: 15px;
  line-height: 18px;
  font-weight: bold;
`;

const FullScreenGallery = ({ className, title, children }) => (
  <aside className={className}>
    <header>
      <h3>{title}</h3>
      <Button>Оставить заявку</Button>
      <Button grey>
        <FavoriteIcon checked={false} />В избранное
      </Button>
    </header>
    {children}
  </aside>
);

export default styled(FullScreenGallery)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: grid;

  padding: 18px 50px 0;

  z-index: 10;

  background: #232323;

  header {
    color: white;
    display: flex;
    align-items: flex-start;

    h3 {
      margin: 0;
      flex: 1;
      font-size: 18px;
    }
  }
`;
