import React from 'react';
import PropTypes from 'prop-types';
import { List, Li, DeleteButton, Text } from './ContactList.styled';

export function ContactList({ contacts, onDelete }) {
  return (
    <List>
      {contacts.map(({ id, number, name }) => {
        return (
          <Li key={id}>
            <Text>
              {name}: {number}
            </Text>
            <DeleteButton onClick={() => onDelete(id)} type="button">
              Delete
            </DeleteButton>
          </Li>
        );
      })}
    </List>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
