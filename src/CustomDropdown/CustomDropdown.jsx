/* eslint-disable react/prop-types */
import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

/**
 * Creates dropdowns with data provides.
 * @param   {string} name    The name of the dropdown.
 * @param   {array} values  The values for the options within the dropdown.
 * @return  {<DropdownButton>}        Returns a dropdown menu with options.
 */
export default function CustomDropdown({ name, values }) {
  // For the keys, all the spaces are replaces with dashes.
  return (
    <DropdownButton title={name}>
      {Object.values(values).map((value) => (
        <Dropdown.Item
          key={`${name}-dropdown-item-${value.replace(/\s+/g, "-")}`}
        >
          {value}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}
