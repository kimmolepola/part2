import React from 'react'
import Contact from './Contact'

const Contacts = ({ persons, filter }) => {
    return persons.map(person =>
        <Contact
            key={person.name}
            name={person.name}
            number={person.number}
            filter={filter}
        />
    )
}

export default Contacts