import React from 'react';
import classnames  from 'classnames';
import PropTypes  from 'prop-types';

const SelectListGroup = ({
	name,

	error,
	info,
	onChange,
	value,
	options
}) => {
	const selectOptions = options.map(option => (
        <option value={option.value} key={option.label}>{option.label}</option>
	));
    return (
      <div className="form-group">
      <select
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
    );
};

SelectListGroup.propTyes = {
	name: PropTypes.string.isRequired,

	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired
}



export default SelectListGroup;
