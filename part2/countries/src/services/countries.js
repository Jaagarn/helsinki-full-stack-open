import axios from "axios";

const baseUrl = "https://restcountries.com";

const getAll = () => {
  const request = axios.get(`${baseUrl}/v3.1/all`);
  return request.then((response) => response.data);
};

const getByName = (name) => {
  const request = axios.get(`${baseUrl}/v3.1/name/${name}`);
  return request.then((response) => response.data);
};

export default { getAll, getByName };
