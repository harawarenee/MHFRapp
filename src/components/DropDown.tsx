import React from "react";
import Form from "react-bootstrap/Form";

interface DropdownProps {
  options: { id: string; name: string }[];
  onSelect: (id: string) => void;
}

const DropdownMenu: React.FC<DropdownProps> = ({ options, onSelect }) => {
  return (
    <select
      className="form-select mt-3"
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default DropdownMenu;
