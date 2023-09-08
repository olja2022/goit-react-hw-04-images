import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState();
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li className="ImageGalleryItem" onClick={() => toggleModal()}>
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={`small img of ${tags}`}
        width="300"
      />

      {}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={`big img of ${tags}`} />
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.ptopType = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
