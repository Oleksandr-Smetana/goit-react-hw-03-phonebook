import { Component } from "react";
// import PropTypes from 'prop-types';
import { v4 as uuidv4 } from "uuid";
import s from "./App.module.css";

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

class Phonebook extends Component {
  // static propTypes = {
  //   contacts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  //   filter: PropTypes.string.isRequired,
  // };

  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  // добавление контактов с проверкой на уникальность
  addContact = ({ name, number }) => {
    // console.log({ name, number });
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    if (this.state.contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already exist`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    }
    // setTimeout(() => console.log(this.state.contacts), 1000);
  };

  // удаление одного контакта по клику на кнопку "Delete"
  removeContact = (contactId) => {
    // console.log(e.target);
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => {
        return contact.id !== contactId;
      }),
    }));
  };

  // запись значения поля фильтра в стейт
  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  // получение списка контактов по значению из фильтра
  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;

    return (
      <div className={s.app}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className={s.title}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={this.getVisibleContacts()}
          onDelete={this.removeContact}
        />
      </div>
    );
  }
}

export default Phonebook;
