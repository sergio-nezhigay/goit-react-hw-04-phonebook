import { useEffect, useState, useMemo } from 'react';
import { nanoid } from 'nanoid';

import {
  Container,
  Section,
  ContactForm,
  ContactList,
  Filter,
} from 'components';

const MY_CONTACTS = 'contacts';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpsonna', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');
  useEffect(() => {
    try {
      const contactsStorage = JSON.parse(localStorage.getItem(MY_CONTACTS));
      if (contactsStorage) {
        setContacts(contactsStorage);
      }
    } catch (error) {
      console.log(`Error accessing localStorage: ${error}`);
    }
  }, []);

  useEffect(() => {
    // try /catch are for localStorage errors
    try {
      localStorage.setItem(MY_CONTACTS, JSON.stringify(contacts));
    } catch (error) {
      console.log(`Error accessing localStorage: ${error}`);
    }
  }, [contacts]);

  const onSubmit = ({ name, number }, { resetForm }) => {
    if (
      contacts.some(contact =>
        contact.name.toLowerCase().includes(name.toLowerCase())
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(prevcontacts => [
      ...prevcontacts,
      {
        id: nanoid(),
        name: name,
        number: number,
      },
    ]);
    setFilter('');
    resetForm();
  };

  const onChangeFilter = e => {
    setFilter(e.target.value);
  };

  const onDelete = id => {
    setContacts(prevcontacts =>
      prevcontacts.filter(contact => contact.id !== id)
    );
  };

  const filteredAndMemoedcontacts = useMemo(
    () =>
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [contacts, filter]
  );

  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm onSubmit={onSubmit} />
      </Section>
      <Section title="Contacts">
        {contacts.length ? (
          <>
            <Filter filter={filter} onChange={onChangeFilter} />
            <ContactList
              contacts={filteredAndMemoedcontacts}
              onDelete={onDelete}
            />
          </>
        ) : (
          <p>No contacts</p>
        )}
      </Section>
    </Container>
  );
}
