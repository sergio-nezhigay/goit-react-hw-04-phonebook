import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import { object, string } from 'yup';

import {
  StyledForm,
  Label,
  StyledField,
  ErrorStyledMessage,
  Button,
} from './ContactForm.styled';

const numberRegex =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const numberMessage = `Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`;
const nameMessage = `Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`;

let schema = object({
  name: string()
    .matches(nameRegex, {
      message: nameMessage,
      excludeEmptyString: true,
    })
    .required(),
  number: string()
    .matches(numberRegex, {
      message: numberMessage,
      excludeEmptyString: true,
    })
    .required(),
});

export class ContactForm extends Component {
  // nameInputID and numberInputID should be here
  // for them to give different IDs for multiple instances
  // using stateless components gives same ID

  nameInputID = nanoid();
  numberInputID = nanoid();

  render() {
    const { onSubmit } = this.props;
    return (
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        <StyledForm>
          <Label htmlFor={this.nameInputID}>Name</Label>
          <StyledField
            type="text"
            name="name"
            placeholder="Enter the name"
            id={this.nameInputID}
          />
          <ErrorMessage component={ErrorStyledMessage} name="name" />
          <Label htmlFor={this.numberInputID}>Number</Label>
          <StyledField
            type="tel"
            name="number"
            placeholder="Enter the number"
            id={this.numberInputID}
          />
          <ErrorMessage component={ErrorStyledMessage} name="number" />
          <Button type="submit">Add Contact</Button>
        </StyledForm>
      </Formik>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
