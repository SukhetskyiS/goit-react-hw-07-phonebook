import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { setContactsData } from 'redux/operation';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNumber = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (contacts.some(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(setContactsData({ name, number, id: nanoid() }));

    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="contact-form">
        <label htmlFor="name">Name</label>
        <input
          className="contact-form__input"
          id="name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onChangeName}
        />
        <label htmlFor="tel">Number</label>
        <input
          className="contact-form__input"
          id="tel"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={onChangeNumber}
        />
      </div>
      <button type="submit" className="contact-form__button">
        Add contact
      </button>
    </form>
  );
}
