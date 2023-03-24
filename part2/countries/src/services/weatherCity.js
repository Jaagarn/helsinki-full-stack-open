import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY

const baseUrl = "http://api.weatherapi.com/v1";

const getByCity = (city) => {
  const request = axios.get(
    `${baseUrl}/current.json?key=${api_key}&q=${city}`
  );
  return request.then((response) => response.data);
};

export default { getByCity };
