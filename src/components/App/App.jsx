import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import {
  Container,
  Section,
  ContactForm,
  ContactList,
  Filter,
} from 'components';

const MY_CONTACTS = 'contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpsonna', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount = () => {
    try {
      const contactsStorage = JSON.parse(localStorage.getItem(MY_CONTACTS));
      if (contactsStorage) {
        this.setState({ contacts: contactsStorage });
      }
    } catch (error) {
      console.log(`Error accessing localStorage: ${error}`);
    }
  };

  componentDidUpdate = (_, prevState) => {
    const { contacts } = this.state;
    try {
      if (prevState.contacts.length !== contacts.length) {
        localStorage.setItem(MY_CONTACTS, JSON.stringify(contacts));
      }
    } catch (error) {
      console.log(`Error accessing localStorage: ${error}`);
    }
  };

  onSubmit = ({ name, number }, { resetForm }) => {
    if (
      this.state.contacts.some(contact =>
        contact.name.toLowerCase().includes(name.toLowerCase())
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            name: name,
            number: number,
          },
        ],
        filter: '',
      };
    });
    resetForm();
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onDelete = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  filterContacts = (contacts, filter) =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.filterContacts(contacts, filter);
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.onSubmit} />
        </Section>
        <Section title="Contacts">
          {contacts.length ? (
            <>
              <Filter filter={filter} onChange={this.onChange} />
              <ContactList
                contacts={filteredContacts}
                onDelete={this.onDelete}
              />
            </>
          ) : (
            ''
          )}
        </Section>
      </Container>
    );
  }
}
