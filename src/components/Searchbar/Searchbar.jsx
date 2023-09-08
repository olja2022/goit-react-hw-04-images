import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

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
          {}
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
