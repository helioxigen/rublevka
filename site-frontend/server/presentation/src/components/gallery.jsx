import React from 'react';

export default ({ images, count, showLogo }) => (
  <figure>
    {images.length >= 2 && (
      <div className="about-image-container">
        <div
          className="about-image"
          style={{
            backgroundImage: `url(https://images.jqestate.ru/${images[0].id}-${showLogo
              ? 'jqestate-1024'
              : 'thumbnail-512'})`,
          }}
        />
      </div>
    )}
    {images.length >= 2 && (
      <div className="about-image-container">
        <div
          className="about-image"
          style={{
            backgroundImage: `url(https://images.jqestate.ru/${images[1].id}-${showLogo
              ? 'jqestate-1024'
              : 'thumbnail-512'})`,
          }}
        />
      </div>
    )}
    {images.length >= 4 && (
      <div className="about-image-container">
        <div
          className="about-image"
          style={{
            backgroundImage: `url(https://images.jqestate.ru/${images[2].id}-${showLogo
              ? 'jqestate-1024'
              : 'thumbnail-512'})`,
          }}
        />
      </div>
    )}
    {images.length >= 4 && (
      <div className="about-image-container">
        <div
          className="about-image"
          style={{
            backgroundImage: `url(https://images.jqestate.ru/${images[3].id}-${showLogo
              ? 'jqestate-1024'
              : 'thumbnail-512'})`,
          }}
        />
      </div>
    )}
    {images.length >= 6 &&
      count > 4 && (
        <div className="about-image-container">
          <div
            className="about-image"
            style={{
              backgroundImage: `url(https://images.jqestate.ru/${images[4].id}-${showLogo
                ? 'jqestate-1024'
                : 'thumbnail-512'})`,
            }}
          />
        </div>
      )}
    {images.length >= 6 &&
      count > 4 && (
        <div className="about-image-container">
          <div
            className="about-image"
            style={{
              backgroundImage: `url(https://images.jqestate.ru/${images[5].id}-${showLogo
                ? 'jqestate-1024'
                : 'thumbnail-512'})`,
            }}
          />
        </div>
      )}
    {images.length >= 8 &&
      count > 4 && (
        <div className="about-image-container">
          <div
            className="about-image"
            style={{
              backgroundImage: `url(https://images.jqestate.ru/${images[6].id}-${showLogo
                ? 'jqestate-1024'
                : 'thumbnail-512'})`,
            }}
          />
        </div>
      )}
    {images.length >= 8 &&
      count > 4 && (
        <div className="about-image-container">
          <div
            className="about-image"
            style={{
              backgroundImage: `url(https://images.jqestate.ru/${images[7].id}-${showLogo
                ? 'jqestate-1024'
                : 'thumbnail-512'})`,
            }}
          />
        </div>
      )}
  </figure>
);
