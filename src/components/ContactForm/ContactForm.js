import { Component } from "react";
// import PropTypes from 'prop-types';
import s from "./ContactForm.module.css";

class ContactForm extends Component {
  //   static propTypes = {
  //     name: PropTypes.string.isRequired,
  //     number: PropTypes.string.isRequired,
  //   };

  state = {
    name: "",
    number: "",
  };

  // запись имени и номера телефона в стейт
  handleChange = (e) => {
    // console.log(e.currentTarget.name);
    // console.log(e.currentTarget.value);
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  // добавление контакта в список контактов и сброс инпутов
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);

    this.props.onSubmit(this.state);
    this.resetForm();
  };

  // сброс стейта
  resetForm = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <label className={s.label}>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
        </label>

        <label className={s.label}>
          Number
          <input
            className={s.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            value={this.state.number}
            onChange={this.handleChange}
            required
          />
        </label>

        <button className={s.submitButton} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
