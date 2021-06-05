import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { PropTypes } from "prop-types";

export default function Preferences({
  preferenceType,
  preferenceData,
  onPreferencesSelect,
  onClearPreference,
}) {
  return (
    <div>
      <DropdownButton
        id="preferences-dropdown"
        title={preferenceType}
        variant="danger"
        style={{ textTransform: "capitalize" }}
      >
        {preferenceData.map((preference) => (
          <Dropdown.Item
            id={`#${preferenceType}-dropdown`}
            key={preference}
            as="button"
            onSelect={() => {
              onPreferencesSelect(preferenceType, preference);
            }}
          >
            {preference}
          </Dropdown.Item>
        ))}
        <Dropdown.Divider />
        <Dropdown.Item
          as="button"
          key="clear-preferences"
          onSelect={() => onClearPreference(preferenceType)}
        >
          Clear {preferenceType}
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

Preferences.propTypes = {
  preferenceType: PropTypes.string.isRequired,
  preferenceData: PropTypes.instanceOf(Array).isRequired,
  onPreferencesSelect: PropTypes.func.isRequired,
  onClearPreference: PropTypes.func.isRequired,
};
