import axios from 'axios'
const baseUrl = './api/persons'

const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addNewPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data).catch(error => error.response.data)
}

const deletePerson = personToBeDeletedId => {
    const request = axios.delete(`${baseUrl}/${personToBeDeletedId}`)
    return request.then(response => response)
}

const updateNumber = (personToBeUpdated, newNumber) => {
    const updatedPerson = {...personToBeUpdated, number:newNumber}
    const request = axios.put(`${baseUrl}/${personToBeUpdated.id}`, updatedPerson)
    return request.then(response => response.data).catch(error => error.response.data)
}

export default { getAllPersons, addNewPerson, deletePerson, updateNumber }