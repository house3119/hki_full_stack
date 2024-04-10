import { useState, useEffect } from 'react'
import './index.css'
import countryService from './services/countryService'

const App = () => {
  const [query, setQuery] = useState(null)
  const [holder, setHolder] = useState(null)
  const [result, setResult] = useState([])

  useEffect(() => {
    if (query) {
      console.log('query is something')
      setResult(
        holder.map(country => {

          if(country.name.common.toLowerCase().includes(query.toLowerCase())) {
            return country
          }

        }

        ).filter(country => {
          return country !== undefined
        })
      )
      
    } else if (!holder) {
      console.log('holder empty, fetching countries...')
      countryService
        .getCountries()
        .then(result => {
          setHolder(result)
        })
        .catch(error => console.log(error))

    } else {
      console.log('query is empty')
      setResult([])
    }
  }, [query, holder])

  const handleChange = (event) => {
    setQuery(event.target.value)
  } 


  return (
    <div>
      Search <input type="text" onChange={handleChange}/>
      <ListComponent result={result} />
    </div>

  )
}

const ListComponent = ({ result }) => {
  if (result.length === 0) {
    return (
      <div>
        Such Empty
      </div>
    )
  } else if (result.length > 10) {
    return (
      <div>
        Too many matches. Please specify another filter.
      </div>
    )
  } else if (result.length === 1) {
    const country = result[0]
    const languageList = Object.entries(country.languages)

    return (
      <div>
        <h1>{country.name.common}</h1>

        <div>
          Capital: {country.capital}
          <br />
          Area: {country.area}
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

      </div>
    )
  } else {
    return (
      <div>
        <ul>
          {result.map(country =>
          <li key={country.altSpellings[0]}>{country.name.common}</li>)}
        </ul>
      </div>
    )
  }
}

export default App
