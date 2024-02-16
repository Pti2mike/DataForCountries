import { useEffect, useState } from "react";
import Header from "./components/Header";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [allCountries, setAllCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    console.log("effect run, fetch all countries");
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => setAllCountries(response.data))
      .catch((error) => {
        console.error("Request error: ", error);
      });
  }, []);

  // console.log(allCountries);

  useEffect(() => {
    if (allCountries) {
      const filteredCountry = allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      console.log(filteredCountry);
      setFilteredCountries(filteredCountry);
    }
  }, [search, allCountries]);

  // console.log(filteredCountries);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Header name="Data for Countries" />

      <div>
        <form onSubmit={onSearch}>
          find countries: <input value={search} onChange={handleSearch} />
        </form>

        <ul>
          {filteredCountries.length > 10 ? (
            <span>Too many matches, specify another filter!!!</span>
          ) : filteredCountries.length === 1 ? (
            filteredCountries.map(
              (country, index) => (
                console.log(country.flags.alt),
                (
                  <div key={index}>
                    <h2>{country.name.common}</h2>

                    <div>capital: {country.capital}</div>
                    <div>area: {country.area}</div>

                    <h4>languages: </h4>
                    <ul>
                      {Object.entries(country.languages).map(
                        ([code, language]) => (
                          <li key={code}>{language}</li>
                        )
                      )}
                    </ul>

                    <img src={country.flags.png} alt={country.flags.alt} />
                  </div>
                )
              )
            )
          ) : (
            filteredCountries.map((country, index) => (
              <li key={index}>{country.name.common}</li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
