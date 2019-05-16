import React from 'react';
import styled from 'styled-components';

const GalleryPlaceholder = ({ className }) => (
  <section className={className}>
    <p>Для объекта не загружено фотографий</p>
    <button>Запросить</button>
  </section>
);

export default styled(GalleryPlaceholder)`
  background: #f9f9f9;
  text-align: center;

  border-radius: 4px;

  padding: 36px 0;

  button,
  p {
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 0.45px;
    text-transform: uppercase;
  }

  p {
    color: #666666;

    margin: 0 0 12px 0;
  }

  button {
    color: #47b34c;

    border: 0;
    background: none;
    outline: none;
    cursor: pointer;
  }
`;
