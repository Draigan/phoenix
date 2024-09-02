import React from 'react';

interface DropdownProps {
  label: string;
  options: string[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onChange }) => {
  return (
    <div>
      <label>{label}:</label>
      <select onChange={(e) => onChange(e.target.value)}>
        <option value="">Select...</option>
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
