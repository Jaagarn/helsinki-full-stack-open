const CountryView = ({ country, visable }) => {
  console.log(country)
  if (visable) {
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages)
                 .map((language) => (
                    <li key={language}>{language}</li>
                  ))
          }
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </>
    );
  }
};

export default CountryView;