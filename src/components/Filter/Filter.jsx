import React from 'react';
import PropTypes from 'prop-types';
import Contact from 'components/Contact/Contact';

const Filter = ({ value, contacts, onChange, onDeleteContact }) => {
    return (
        <>
            <div>
                <h2>Contacts</h2>
                <label>
                    Find contact by name
                    <input onChange={onChange} type="text" name="name" value={value} />
                </label>
            </div>

            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>
                        <Contact
                            {...contact}
                            onDeleteContact={() => onDeleteContact(contact.id)}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};

Filter.propTypes = {
    onDeleteContact: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    value: PropTypes.string,
};

export default Filter;
