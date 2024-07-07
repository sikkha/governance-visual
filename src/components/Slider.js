import React from 'react';
import PropTypes from 'prop-types';

const Slider = ({ label, value, onChange, icon: Icon }) => (
  <div className="mb-4">
    <label className="flex items-center mb-1 text-gray-700">
      <Icon className="mr-2" size={20} />
      {label}: {value.toFixed(1)}
    </label>
    <input
      type="range"
      min="0"
      max="10"
      step="0.1"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full"
    />
  </div>
);

Slider.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default Slider;

