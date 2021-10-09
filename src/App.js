import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import s from "./App.module.css";

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

class Phonebook extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

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
        {this.getVisibleContacts().length !== 0 ? (
          <ContactList
            contacts={this.getVisibleContacts()}
            onDelete={this.removeContact}
          />
        ) : (
          <p className={s.notification}>There are no contacts yet...</p>
        )}
      </div>
    );
  }
}

export default Phonebook;
