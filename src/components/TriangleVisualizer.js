import React from 'react';
import PropTypes from 'prop-types';

// TriangleVisualizer Component
const TriangleVisualizer = ({ strongState, democracy, ruleOfLaw }) => {
  const total = strongState + democracy + ruleOfLaw;
  const normalize = (value) => (value / total) * 100;

  return (
    <div className="relative w-64 h-64 mx-auto mt-8 bg-gray-100 border border-gray-300">
      <div
        className="absolute w-4 h-4 bg-red-500 rounded-full"
        style={{
          top: `${100 - normalize(strongState)}%`,
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        title={`Strong State: ${strongState.toFixed(1)}`}
      />
      <div
        className="absolute w-4 h-4 bg-blue-500 rounded-full"
        style={{
          bottom: '0%',
          left: `${50 - normalize(democracy) / 2}%`,
          transform: 'translateY(50%)',
        }}
        title={`Democratic Accountability: ${democracy.toFixed(1)}`}
      />
      <div
        className="absolute w-4 h-4 bg-green-500 rounded-full"
        style={{
          bottom: '0%',
          right: `${50 - normalize(ruleOfLaw) / 2}%`,
          transform: 'translateY(50%)',
        }}
        title={`Rule of Law: ${ruleOfLaw.toFixed(1)}`}
      />
      <div className="absolute inset-0 border-2 border-gray-300" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
    </div>
  );
};

TriangleVisualizer.propTypes = {
  strongState: PropTypes.number.isRequired,
  democracy: PropTypes.number.isRequired,
  ruleOfLaw: PropTypes.number.isRequired,
};

export default TriangleVisualizer;

