import { useState } from 'react';
import { toast } from 'react-toastify'; // повідомлення по типу Notify
import { FiSearch } from 'react-icons/fi'; // іконки React-Icons
import PropTypes from 'prop-types';

// * Рефакторінг в Хуки
export const Searchbar = ({ onSubmit }) => {
  const [requestValue, setRequestValue] = useState('');

  const handleRequestChange = ({ target: { value } }) => {
    setRequestValue(value.toLowerCase());
  };

  const handleRequestSubmit = e => {
    e.preventDefault();

    if (requestValue.trim() === '') {
      toast.error('Введіть хоч щось...');
      return;
    }

    onSubmit(requestValue.trim());
    setRequestValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleRequestSubmit}>
        <button type="submit" className="SearchForm-button">
          {/* Іконка пошуку із react-icons: */}
          <FiSearch className="SearchForm-button-icon" />
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="requestValue"
          value={requestValue}
          onChange={handleRequestChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// export class Searchbar extends Component {
//   state = {
//     requestValue: '',
//   };

//   handleRequestChange = ({ target: { name, value } }) => {
//     this.setState({ [name]: value.toLowerCase() });
//   };

//   handleRequestSubmit = e => {
//     e.preventDefault();
//     const { requestValue } = this.state;

//     if (requestValue.trim() === '') {
//       toast.error('Введіть хоч щось...');
//       return;
//     }

//     this.props.onSubmit(requestValue.trim());
//     this.setState({ requestValue: '' });
//   };

//   render() {
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={this.handleRequestSubmit}>
//           <button type="submit" className="SearchForm-button">
//             {/* Іконка пошуку із react-icons: */}
//             <FiSearch className="SearchForm-button-icon" />
//             <span className="SearchForm-button-label">Search</span>
//           </button>

//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             name="requestValue"
//             value={this.state.requestValue}
//             onChange={this.handleRequestChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
