import { useState, useEffect } from 'react'
import './index.css'
import countryService from './services/countryService'

const App = () => {
  const [query, setQuery] = useState('')
  const [holder, setHolder] = useState(null)
  const [result, setResult] = useState([])
  const [weather, setWeather] = useState({})


  useEffect(() => {
    if (query) {
      console.log('Query is something')
      setResult(
        holder.map(country => {
          if(country.name.common.toLowerCase().includes(query.toLowerCase())) {
            return country
          }
        }).filter(country => {
          return country !== undefined
        })
      )
    } else if (!holder) {
      console.log('Holder empty, fetching countries...')
      countryService
        .getCountries()
        .then(res => {
          console.log('Fething done')
          setHolder(res)
        })
        .catch(error => console.log(error))
    } else {
      console.log('query is empty')
      setResult([])
    }
  }, [query, holder])


  useEffect(() => {
    if (result.length === 1) {
      countryService
        .getWeather(result[0].capital[0])
        .then(res => {
          setWeather(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [result])


  const handleChange = (event) => {
    setQuery(event.target.value)
  }


  const handleShow = (countryName) => {
    setQuery(countryName)
  }


  return (
    <div>
      Search <input type="text" onChange={handleChange}/>
      <ListComponent result={result} handleShow={handleShow} weather={weather} />
    </div>
  )
}


const ListComponent = ({ result, handleShow, weather }) => {
  if (result.length === 0) {
    return (
      <div>
        Start typing name of a country
      </div>
    )
  } else if (result.length > 10) {
    return (
      <div>
        Too many matches. Please write more.
      </div>
    )
  } else if (result.length === 1) {
    const country = result[0]
    const languageList = Object.entries(country.languages)
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>
          <b>Capital:</b> {country.capital}
          <br />
          <b>Area:</b> {country.area}
        </div>

        <div>
          <h2>Languages</h2>
          <ul>
            {languageList.map(language => <li key={language[0]}>{language[1]}</li>)}
          </ul>
        </div>

        <div>
          <img src={country.flags.png} alt={country.flags.alt} />
        </div>

        <div className='weather-div'>
          <h2>Current Weather in {country.capital[0]}</h2>
          <div>
            <b>Temp: </b>{weather.temp_c} °C
            <br />
            <b>Wind: </b>{ (weather.wind_kph / 3.6).toFixed(1) } m/s
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <ul>
          {result.map(country =>
          <li key={country.altSpellings[0]}>{country.name.common}<button onClick={() => handleShow(country.name.common)}>Show</button></li>)}
        </ul>
      </div>
    )
  }
}

export default App