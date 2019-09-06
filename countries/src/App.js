import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ weather }) => {
  if (weather === '') {
    return <></>
  }
  return (
    <div>
      <div><b>temperature: </b>{weather.current.temp_c} Celsius</div>
      <div><img src={weather.current.condition.icon} alt={weather.current.condition.text} /></div>
      <div><b>wind: </b>{weather.current.wind_kph} kph direction {weather.current.wind_dir}</div>
    </div>
  )
}

const FilteredCountry = ({ country, setSelectedCountry }) => {
  const handleClick = () => setSelectedCountry(country)
  return (
    <div>
      {country.name}
      <button onClick={handleClick}>show</button>
    </div>
  )
}

const Language = ({ language }) => {
  return <li>{language.name}</li>
}

const Hit = ({ selectedCountry, weather }) => {
  if (selectedCountry === '') {
    return <></>
  }
  return (
    <div>
      <h1>{selectedCountry.name}</h1>
      <div>capital {selectedCountry.capital}</div>
      <div>population {selectedCountry.population}</div>
      <h2>languages</h2>
      <ul>
        {selectedCountry.languages.map(language => <Language language={language} key={language.name} />)}
      </ul>
      <img src={selectedCountry.flag} alt="flag" width="100" />
      <h2>Weather in {selectedCountry.capital}</h2>
      <Weather weather={weather} />
    </div>
  )
}

const Results = ({ filteredCountries, setSelectedCountry }) => {
  if (filteredCountries.length <= 1) {
    return <></>
  }
  if (filteredCountries.length >= 10) {
    return <div>Too many matches, specify another filter</div>
  }
  return filteredCountries.map(country => <FilteredCountry country={country} setSelectedCountry={setSelectedCountry} key={country.numericCode} />)
}

const Contents = ({ allCountries, newName, selectedCountry, setSelectedCountry, weather }) => {
  const filteredCountries = []
  if (newName !== '') {
    if (allCountries.length !== 0) {
      for (const country of allCountries) { // eslint-disable-line no-unused-vars
        if (country.name.toLowerCase().includes(newName.toLowerCase()))
          filteredCountries.push(country)
      }
    }
  }
  if (filteredCountries.length === 1) {
    setSelectedCountry(filteredCountries[0])
  }
  return (
    <div>
      <Results filteredCountries={filteredCountries} setSelectedCountry={setSelectedCountry} />
      <Hit selectedCountry={selectedCountry} weather={weather} />
    </div>
  )
}

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [newName, setNewName] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [weather, setWeather] = useState('')

  useEffect(() => {
    if (selectedCountry !== '') {
      axios
        .get('http://api.apixu.com/v1/current.json?key=3a34412baad04a86a3c81048190609&q='.concat(selectedCountry.capital))
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [selectedCountry])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (newName === '') {
      setSelectedCountry('')
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        find countries: <input value={newName} onChange={handleNameChange} />
      </form>
      <Contents allCountries={allCountries} newName={newName} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} weather={weather} />
    </div>
  )
}

export default App;
