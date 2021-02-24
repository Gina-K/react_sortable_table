import axios from "axios";

const getData = async () => {
  let totalResult = [];

  let result = await axios("https://swapi.dev/api/people/");
  totalResult = totalResult.concat(result.data.results);

  while (result.data.next) {
    result = await axios(result.data.next);
    totalResult = totalResult.concat(result.data.results);
  }

  return totalResult;
};

export default getData;