import React, { useState, useEffect } from 'react';
import { dateBuilder } from './utils/dateBuilder';

const api = {
  key: 'd577f2d8e2fff84f0fcd18278d6719e4',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [queryInput, setQueryInput] = useState('');
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('City not found. TEST');
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
      })
      .catch((error) => {
        setErrorText(error.message);
      });
  }, [query]);

  const search = (evt) => {
    if (evt.key === 'Enter') {
      setQuery(queryInput);
    }
  };

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 16
            ? 'app-warm'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQueryInput(e.target.value)}
            value={queryInput}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != 'undefined' ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}{' '}
              </div>
              <div className="date"> {dateBuilder(new Date())} </div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather"> {weather.weather[0].main} </div>
            </div>
          </div>
        ) : (
          <div className="weather-box">
            <div className="weather">{errorText}</div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
