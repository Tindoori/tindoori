import React from "react";
import { Form } from "react-bootstrap";
import { PropTypes } from "prop-types";

/**
 * Creates dropdowns with data provides.
 * @param   {string} name    The name of the dropdown.
 * @param   {array} values  The values for the options within the dropdown.
 * @return  {Dropdown}        Returns a dropdown menu with options.
 */
export default function FormDropdown({ name, values }) {
  // For the keys, all the spaces are replaces with dashes.
  return (
    <Form.Control as="select" name={name}>
      {/* Default option when the user doesn't choose a value */}
      <option key={`${name}-dropdown-item-default`}> </option>
      {Object.values(values).map((value) => (
        <option key={`${name}-dropdown-item-${value.replace(/\s+/g, "-")}`}>
          {value}
        </option>
      ))}
    </Form.Control>
  );
}

FormDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.instanceOf(Array).isRequired,
};
