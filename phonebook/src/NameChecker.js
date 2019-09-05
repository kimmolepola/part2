/* exported person */

const CheckIfNewPerson = (persons, newName) => {
    for (const person of persons) { // eslint-disable-line no-unused-vars
        if (person.name.toLowerCase() === newName.toLowerCase()) {
            return false
        }
    }
    return true
}

export default CheckIfNewPerson