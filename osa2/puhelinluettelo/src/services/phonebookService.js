import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'
const idUrl = 'http://localhost:3001/idgen'

const getCurrentId = () => {
    const request = axios.get(idUrl)
    return request.then(response => response.data)
}

const incrementId = id => {
    const newId = { current: id + 1 }
    const request = axios.put(idUrl, newId)
    return request.then(response => response.data)
}

const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addNewPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = personToBeDeletedId => {
    const request = axios.delete(`${baseUrl}/${personToBeDeletedId}`)
    return request.then(response => response.data)
}

const updateNumber = (personToBeUpdated, newNumber) => {
    const updatedPerson = {...personToBeUpdated, number:newNumber}
    const request = axios.put(`${baseUrl}/${personToBeUpdated.id}`, updatedPerson)
    return request.then(response => response.data).catch(() => {console.log('404')})
}

export default { getAllPersons, addNewPerson, deletePerson, updateNumber, getCurrentId, incrementId }