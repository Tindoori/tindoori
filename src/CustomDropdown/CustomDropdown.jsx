import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

/**
 * Creates dropdowns with data provides.
 * @param   {array} keys    The name(s) of the dropdown(s).
 * @param   {array} values  The values for the options.
 * @return  {<type>}        Returns a dropdown menu with options.
 */
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
