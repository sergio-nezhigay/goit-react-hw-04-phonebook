import React from 'react';
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

let formCounter = 0;

export function ContactForm(props) {
  const { onSubmit } = props;
  const nameInputID = `name-${formCounter}`;
  const numberInputID = `number-${formCounter}`;
  formCounter++;
  console.log(
    '🚀 ~ file: ContactForm.jsx:71 ~ ContactForm ~ formCounter:',
    formCounter
  );
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      <StyledForm>
        <Label htmlFor={nameInputID}>Name</Label>
        <StyledField
          type="text"
          name="name"
          placeholder="Enter the name"
          id={nameInputID}
        />
        <ErrorMessage component={ErrorStyledMessage} name="name" />
        <Label htmlFor={numberInputID}>Number</Label>
        <StyledField
          type="tel"
          name="number"
          placeholder="Enter the number"
          id={numberInputID}
        />
        <ErrorMessage component={ErrorStyledMessage} name="number" />
        <Button type="submit">Add Contact</Button>
      </StyledForm>
    </Formik>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
