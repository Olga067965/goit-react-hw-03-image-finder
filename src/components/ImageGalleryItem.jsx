import React from 'react';

const ImageGalleryItem = ({ image, onImageClick }) => (
  <li className="gallery-item">
    <img
      src={image.webformatURL}
      alt={image.tags}
      className="gallery-item-image"
      onClick={() => onImageClick(image.largeImageURL)}
    />
  </li>
);

export default ImageGalleryItem;
