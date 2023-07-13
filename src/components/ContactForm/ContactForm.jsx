import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import {
    FormStyled,
    LabelStyled,
    ButtonAddContactStyled,
    InputStyled,
} from './ContactFormStyled';

class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    };

    resetInput = () => {
        this.setState({
            name: '',
            number: '',
        });
    };

    handleChange = evt => {
        const { name, value } = evt.currentTarget;
        this.setState({ [name]: value });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        this.props.onSubmit(this.state);
        this.resetInput();
    };

    nameInputId = nanoid();
    numberInputId = nanoid();

    render() {
        const { name, number } = this.state;
        return (
            <FormStyled onSubmit={this.handleSubmit}>
                <LabelStyled>
                    Name
                    <InputStyled
                        onChange={this.handleChange}
                        type="text"
                        name="name"
                        id={this.nameInputId}
                        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Ba"
                        value={name}
                        required
                    />
                </LabelStyled>

                <LabelStyled>
                    Number
                    <InputStyled
                        onChange={this.handleChange}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        value={number}
                        required
                    />
                </LabelStyled>

                <ButtonAddContactStyled type="submit">
                    Add contact
                </ButtonAddContactStyled>
            </FormStyled>
        );
    }
}
ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
export default ContactForm;
