import { useDispatch, useSelector } from 'react-redux';
import { Form, Label, Button, Input } from './ContactForm.styled';
import { addPhone } from 'redux/phoneSlice';
import { selectPhones } from 'redux/selector';

const ContactForm = () => {
  const dispatch = useDispatch();
  const phones = useSelector(selectPhones);

  const handleSubmit = event => {
    event.preventDefault();
    const formName = event.target.elements.name.value;
    const formNumber = event.target.elements.number.value;
    const existingName = phones.some(
      item => item.name.toLowerCase() === formName.toLowerCase()
    );
    const existingNumber = phones.find(
      item => item.number === Number(formNumber)
    );

    if (existingName) {
      return alert(`Contact "${formName}" is already in contacts list`);
    } else if (existingNumber) {
      return alert(`Number "${formNumber}" is already in contacts list`);
    }

    dispatch(addPhone(formName, Number(formNumber)));
    const form = event.target;
    form.reset();
  };

  return (
    <Form autoComplete="off" onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Enter name"
          required
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="Enter number"
          required
        />
      </Label>
      <Button type="submit">Add Contact</Button>
    </Form>
  );
};

export default ContactForm;
