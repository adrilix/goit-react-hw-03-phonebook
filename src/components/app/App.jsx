import React, { Component } from 'react';

import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import { nanoid } from 'nanoid';
import { DivStyled } from './AppStyled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const findedName = this.state.contacts.find(
      el => el.name.toLowerCase() === contact.name.toLowerCase()
    );
    findedName
      ? alert(`Contact ${contact.name} is already in the contacts list`)
      : this.setState(prevState => {
          return { contacts: [contact, ...prevState.contacts] };
        });
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getFindedContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contactsLocal = JSON.parse(localStorage.getItem('contacts'));

    if (contactsLocal) {
      this.setState({ contacts: contactsLocal });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.getFindedContacts(contacts, filter);
    const onChange = this.changeFilter;
    return (
      <DivStyled>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit}></ContactForm>
        <Filter
          value={filter}
          contacts={filteredContacts}
          onChange={onChange}
          onDeleteContact={this.deleteContact}
        ></Filter>
      </DivStyled>
    );
  }
}

export default App;
