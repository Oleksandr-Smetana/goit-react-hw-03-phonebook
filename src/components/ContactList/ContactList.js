import PropTypes from "prop-types";
import s from "./ContactList.module.css";

export default function ContactList({ contacts, onDelete }) {
  return (
    <ol className={s.contactList}>
      {contacts.map(({ id, name, number }) => (
        <li className={s.contactItem} key={id}>
          <p className={s.contactInfo}>
            {name}: {number}
          </p>
          <button
            className={s.deleteButton}
            id={id}
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ol>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
