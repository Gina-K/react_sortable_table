import React from "react";
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider
} from "@material-ui/core";

import TableContainer from "./Components/Table/TableContainer";

const style = {
  fontSize: "4rem",
  textAlign: "center",
  color: "#FFE81F"
};

function App() {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#FFE81F",
      },
      type: "dark",
    },
  });

  return (
    <MuiThemeProvider theme={darkTheme}>
      <CssBaseline />
      <h1 style={style}>THE STAR WARS CHARACTERS</h1>
      <TableContainer />
    </MuiThemeProvider>
  );
}

export default App;
