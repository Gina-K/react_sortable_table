import React, {useState, useEffect} from "react";

import getData from "../../lib/getData";

function TableContainer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((res) => {
      setData(res);
    })
  }, []);

  console.log(data);

  return (
    <div>
      the table container
    </div>
  );
}

export default TableContainer;