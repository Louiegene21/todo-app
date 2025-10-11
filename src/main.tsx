import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1e3c72" },
    secondary: { main: "#6dd5fa" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: { fontWeight: 600 },
    body1: { fontWeight: 400 },
  },
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
