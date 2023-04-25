import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { Label } from 'components/ContactForm/ContactForm.styled';
import { InputShort } from './Filter.styled';

export function Filter({ filter, onChange }) {
  const filterInputId = nanoid();
  return (
    <div>
      <Label htmlFor={filterInputId}>Find contacts by name</Label>
      <InputShort
        type="text"
        name="filter"
        placeholder="Enter your search"
        value={filter}
        onChange={onChange}
        id={filterInputId}
      />
    </div>
  );
}

Filter.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
