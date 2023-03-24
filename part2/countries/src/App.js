import { useState } from "react";

import countryService from "./services/countries";
import weatherCityService from "./services/weatherCity";

import Filter from "./components/Filter";
import Notification from "./components/Notification";
import CountryView from "./components/CountryView";
import WeatherDisplay from "./components/WeatherDisplay";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryView, setCountryView] = useState(null);
  const [countryViewVisable, setCountryViewVisable] = useState(false);
  const [weatherObject, setWeatherObject] = useState(null);
  const [weatherCityVisable, setWeatherCityVisable] = useState(false);
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  const handleOnChangedFilter = (event) => {
    const newFilter = event.target.value.toLowerCase();
    setFilter(newFilter);
    setCountryViewVisable(false);
    setCountryView(null);
    setWeatherCityVisable(false);
    setWeatherObject(null);

    if (newFilter.length <= 1) {
      setNotificationMessage(`Please use more than 1 letter`);
      setCountries([]);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } else {
      setNotificationMessage(null);
      countryService
        .getByName(newFilter)
        .then((allCountries) => {
          if(allCountries.length > 10) {
            setNotificationMessage(`More than 10 results, please specify`);
            setCountries([]);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          } else if (allCountries.length === 1){
            setCountryViewVisable(true);
            setCountryView(allCountries[0]);
            setCountries([]);

            weatherCityService
              .getByCity(allCountries[0].capital.valueOf())
              .then((weatherObject) => {
                setWeatherCityVisable(true);
                setWeatherObject(weatherObject);
                console.log(weatherObject)
              })
          } else {
            setCountries(allCountries);
          }
        })
        .catch(() => {
          setNotificationMessage("No countries containing the search filter");
          setCountries([]);
        });
    }
  };

  const handleOnShowClick = (countryId) => {
    const country = countries.filter((country) => country.ccn3.valueOf() === countryId)[0];
    setCountryViewVisable(true);
    setCountryView(country);
    weatherCityService
              .getByCity(country.capital.valueOf())
              .then((weatherObject) => {
                setWeatherCityVisable(true);
                setWeatherObject(weatherObject);
                console.log(weatherObject)
              })
  };

  return (
    <div>
      <Filter filter={filter} handleOnChangedFilter={handleOnChangedFilter} />
      <Notification message={notificationMessage} />
      {countries.map((country) => (
          <p key={country.ccn3}>{country.name.common} <button onClick={() => handleOnShowClick(country.ccn3.valueOf())}> show </button></p>
      ))}
      <CountryView 
        country={countryView} 
        visable={countryViewVisable} 
        handleOnShowClick={handleOnShowClick} />
        <WeatherDisplay weatherObject={weatherObject} visable={weatherCityVisable} />
    </div>
  );
};

export default App;
