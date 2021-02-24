import React, { useState, useEffect, useMemo } from "react";

import getData from "../../lib/getData";
import Table from "./Table";

function TableContainer() {
  const [data, setData] = useState([]);
  const columns = useMemo(
    () => [
      {
        Header: "General",
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Birth year",
            accessor: "birth_year"
          },
          {
            Header: "Gender",
            accessor: "gender"
          }
        ]
      },
      {
        Header: "Physical appearance",
        columns: [
          {
            Header: "Height",
            accessor: "height"
          },
          {
            Header: "Mass",
            accessor: "mass"
          },
          {
            Header: "Hair color",
            accessor: "hair_color"
          },
          {
            Header: "Skin color",
            accessor: "skin_color"
          }
        ]
      }
    ],
    []
  );

  useEffect(() => {
    getData().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <Table columns={columns} data={data} />
  );
}

export default TableContainer;