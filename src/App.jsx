import React from "react";
import Router from "./Router";
import "./assets/reset.css";
import "./assets/style.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Header } from "./components/Header";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main className="c-main">
        <Router />
      </main>
    </ThemeProvider>
  );
};

export default App;
