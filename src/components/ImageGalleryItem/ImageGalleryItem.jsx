import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState();

  // Відкриття/Закриття модалки.
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    // ? не розумію коли треба функцію кліку запускати у середині іншої функції
    <li className="ImageGalleryItem" onClick={() => toggleModal()}>
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={`small img of ${tags}`}
        width="300"
      />

      {/* Модалка (велике зображення) */}
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

// export class ImageGalleryItem extends Component {
//   state = {
//     showModal: false,
//   };

//   // Відкриття/Закриття модалки.
//   toggleModal = () => {
//     this.setState({ showModal: !this.state.showModal });
//   };

//   render() {
//     const { webformatURL, largeImageURL, tags } = this.props;

//     return (
//       // не розумію коли треба функцію кліку запускати у середині іншої функції
//       <li className="ImageGalleryItem" onClick={() => this.toggleModal()}>
//         <img
//           className="ImageGalleryItem-image"
//           src={webformatURL}
//           alt={`small img of ${tags}`}
//           width="300"
//         />

//         {/* Модалка (велике зображення) */}
//         {this.state.showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={largeImageURL} alt={`big img of ${tags}`} />
//           </Modal>
//         )}
//       </li>
//     );
//   }
// }
