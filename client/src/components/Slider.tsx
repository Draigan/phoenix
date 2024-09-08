import React, { useState } from 'react';

type Props = {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  onChange: (value: number) => void;
};

const Slider: React.FC<Props> = ({ min, max, step, initialValue, onChange }) => {
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        style={{ width: '100%' }}
      />
      <div>Word Length: {value}</div>
    </div>
  );
};

export default Slider;
