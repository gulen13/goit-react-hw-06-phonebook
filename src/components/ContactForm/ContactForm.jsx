import { useDispatch, useSelector } from 'react-redux';
import { Form, Label, Button, Input } from './ContactForm.styled';
import { addPhone } from 'redux/phoneSlice';
import { selectPhones } from 'redux/selector';
import { useState } from 'react';

const ContactForm = () => {
  const [name, setname] = useState('');
  const [number, setnumber] = useState('');
  const dispatch = useDispatch();
  const phones = useSelector(selectPhones);

  const handleSubmit = event => {
    event.preventDefault();
    const existingName = phones.some(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
    const existingNumber = phones.find(item => item.number === Number(number));

    if (existingName) {
      return alert(`Contact "${name}" is already in contacts list`);
    } else if (existingNumber) {
      return alert(`Number "${number}" is already in contacts list`);
    }

    dispatch(addPhone(name, Number(number)));
    const form = event.target;
    form.reset();
  };

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setname(value);
        break;
      case 'number':
        setnumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <Form autoComplete="off" onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Enter name"
          required
          onChange={handleChange}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="Enter number"
          required
          onChange={handleChange}
        />
      </Label>
      <Button type="submit" disabled={!name || !number}>
        Add Contact
      </Button>
    </Form>
  );
};

export default ContactForm;
