import React, { useState, useEffect } from 'react';
import { Shield, Users, Gavel, Globe } from 'lucide-react';
import TriangleVisualizer from './TriangleVisualizer';
import Slider from './Slider';

const GovernanceBalanceVisualization = () => {
  const [geopoliticalConstraint, setGeopoliticalConstraint] = useState(7);
  const [strongState, setStrongState] = useState(3);
  const [democracy, setDemocracy] = useState(3);
  const [ruleOfLaw, setRuleOfLaw] = useState(3);
  const [governanceStrength, setGovernanceStrength] = useState(0);
  const [time, setTime] = useState(0);
  const [oscillationEnabled, setOscillationEnabled] = useState(false);

  useEffect(() => {
    if (oscillationEnabled) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [oscillationEnabled]);

  useEffect(() => {
    if (oscillationEnabled) {
      const oscillatingStrongState = 5 + 2 * Math.sin(time);

      // Adjust democracy and rule of law dynamically
      const total = 15; // Assume a total value for balancing purposes
      const remaining = total - oscillatingStrongState;
      const adjustedDemocracy = remaining / 2;
      const adjustedRuleOfLaw = remaining / 2;

      setStrongState(oscillatingStrongState);
      setDemocracy(adjustedDemocracy);
      setRuleOfLaw(adjustedRuleOfLaw);
    }
  }, [time, oscillationEnabled]);

  useEffect(() => {
    const total = strongState + democracy + ruleOfLaw;
    const balance =
      1 -
      Math.abs(strongState / total - 1 / 3) -
      Math.abs(democracy / total - 1 / 3) -
      Math.abs(ruleOfLaw / total - 1 / 3);
    const rawStrength = total * balance;
    setGovernanceStrength(Math.min(rawStrength, geopoliticalConstraint));
  }, [strongState, democracy, ruleOfLaw, geopoliticalConstraint]);

  const handleStrongStateChange = (value) => {
    setStrongState(value);
    if (!oscillationEnabled) {
      const total = 15; // Assume a total value for balancing purposes
      const remaining = total - value;
      setDemocracy(remaining / 2);
      setRuleOfLaw(remaining / 2);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Governance Balance within Geopolitical Constraints</h1>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-center">Geopolitical Constraint</h2>
        <Slider
          label="Geopolitical Stability" 
          value={geopoliticalConstraint}
          onChange={setGeopoliticalConstraint}
          icon={Globe}
        />
      </div>

      <div className="mb-6 flex justify-center">
        <label className="mr-4">
          <input
            type="radio"
            checked={oscillationEnabled}
            onChange={() => setOscillationEnabled(true)}
          />
          Automatic Oscillation
        </label>
        <label>
          <input
            type="radio"
            checked={!oscillationEnabled}
            onChange={() => setOscillationEnabled(false)}
          />
          Manual Adjustment
        </label>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-center">Governance Factors</h2>
        <Slider
          label="Strong State"
          value={strongState}
          onChange={handleStrongStateChange}
          icon={Shield}
          disabled={oscillationEnabled}
        />
        <Slider
          label="Democratic Accountability"
          value={democracy}
          onChange={setDemocracy}
          icon={Users}
          disabled={oscillationEnabled}
        />
        <Slider
          label="Rule of Law"
          value={ruleOfLaw}
          onChange={setRuleOfLaw}
          icon={Gavel}
          disabled={oscillationEnabled}
        />
      </div>

      <TriangleVisualizer strongState={strongState} democracy={democracy} ruleOfLaw={ruleOfLaw} />

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2 text-center">Governance Strength</h2>
        <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-500 ease-in-out"
            style={{ width: `${(governanceStrength / 10) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-center font-bold">Strength: {governanceStrength.toFixed(2)} / 10</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2 text-center">Explanation</h2>
        <p className="text-center">
          This visualization demonstrates how governance operates within geopolitical constraints:
        </p>
        <ul className="list-disc list-inside mt-2 text-center">
          <li>The geopolitical constraint sets the maximum possible governance strength.</li>
          <li>Governance strength is determined by balancing three factors: strong state, democratic accountability, and rule of law.</li>
          <li>The triangle visualizes the balance between these three factors.</li>
          <li>Maximum governance strength is achieved when the three factors are in perfect balance (equal values).</li>
          <li>Governance strength cannot exceed the geopolitical constraint, regardless of balance.</li>
        </ul>
        <p className="mt-2 text-center">
          Adjust the sliders to see how changes in geopolitical constraints and governance factors affect overall governance strength.
        </p>
      </div>
    </div>
  );
};

export default GovernanceBalanceVisualization;

