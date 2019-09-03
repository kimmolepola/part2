const CheckIfNewPerson = (persons, newName) => {
    for (const person of persons) {
        if (person.name == newName) {
            return false
        }
    }
    return true
}

export default CheckIfNewPerson