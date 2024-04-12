import axios from "axios"

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const weatherUrl = 'http://api.weatherapi.com/v1/current.json'
const weatherApiKey = import.meta.env.VITE_WEATHER_KEY

const getCountries = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getSingleCountry = (query) => {
    const request = axios.get(`${baseUrl}/name/${query}`)
    return request.then(response => response.data)
}

const getWeather = (capitalName) => {
    const request = axios.get(`${weatherUrl}?key=${weatherApiKey}&q=${capitalName}`)
    return request.then(response => response.data.current)
}

export default { getCountries, getSingleCountry, getWeather }