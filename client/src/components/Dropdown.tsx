import React from 'react';

type DropdownProps = {
  value: string;
  label: string;
  options: string[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ value, label, options, onChange }) => {
  return (
    <div>
      <label>{label}:</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
