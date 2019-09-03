import React from 'react'

const Contact = ({ name, number, filter }) => {
    if (name.toLowerCase().includes(filter)) {
        return (
            <div>{name} {number}</div>
        )
    }
    return <></>
}

export default Contact