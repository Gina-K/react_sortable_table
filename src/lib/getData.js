import axios from "axios";

const getData = async () => {
  const result = await axios("https://swapi.dev/api/people/");
  return result.data.results;
}

export default getData;