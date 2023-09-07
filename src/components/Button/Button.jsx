import PropTypes from 'prop-types';

export const Button = ({ loadMoreBtn, isDisabledBtn }) => {
  return (
    <button className="Button" onClick={loadMoreBtn} disabled={isDisabledBtn}>
      Load More
    </button>
  );
};

Button.propTypes = {
  loadMoreBtn: PropTypes.func.isRequired,
  isDisabledBtn: PropTypes.bool.isRequired,
};
