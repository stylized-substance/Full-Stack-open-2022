import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    return axios.get(baseUrl)
}

const createPerson = () => {
    return axios.post(baseUrl, newObject)
}

const updatePerson = () => {
    retun axios.put(`${baseUrl}/${id}`, newObject)
}

export default {
    getPersons: getPersons,
    createPerson: createPerson,
    updatePerson: updatePerson
}