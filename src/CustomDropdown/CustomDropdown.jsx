import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

export default function CustomDropdown({ keys, values }) {
  return Object.values(keys).map((key, i) => {
    return (
      <DropdownButton key={`dropdown-${key}`} title={key}>
        {Object.values(values[i]).map((value) => (
          <Dropdown.Item key={`dropdown-item-${value}`}>{value}</Dropdown.Item>
        ))}
      </DropdownButton>
    );
  });
}
