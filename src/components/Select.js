import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ name, value, onChange, choices, error }) => {
  return(
    <div className="mb-5">
      <div className={error ? "select is-fullwidth is-danger" : "select is-fullwidth"}>
        <select 
          name={name}
          value={value}
          onChange={onChange}
        >
          {choices.map((choice, index) => (
            <option key={index} value={choice.value}>{choice.label}</option>
          ))}
        </select>
      </div>  
      {error && <div className="has-text-danger-dark">{error}</div>}
    </div>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  choices: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  })).isRequired,
  error: PropTypes.string
}

export default Select;