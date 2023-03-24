const WeatherDisplay = ({ weatherObject, visable }) => {
  if (visable) {
    return (
      <>
        <h2>Weather in {weatherObject.location.name}</h2>
        <p>temperature: {weatherObject.current.temp_c} Celsius</p>
        <img src={weatherObject.current.condition.icon} alt={weatherObject.current.condition.text} />
        <p>wind {weatherObject.current.wind_kph} km/h</p>
      </>
    );
  } else {
    return (
      <>
      </>
    )
  }
};

export default WeatherDisplay;
