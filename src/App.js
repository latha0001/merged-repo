import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import PrizeManagement from "./components/PrizeManagement";
import EnrollmentConfirmation from "./components/EnrollmentConfirmation";
import RaffleEngine from "./components/RaffleEngine";
import About from "./components/About";
import Navbar from "./components/Navbar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1C1C1C",
    },
    secondary: {
      main: "#D4AF37",
    },
    background: {
      default: "#FAFAFA",
    },
  },
  typography: {
    fontFamily: '"Inter", "DM Serif Display", sans-serif',
    h1: {
      fontFamily: '"DM Serif Display", serif',
    },
    h2: {
      fontFamily: '"DM Serif Display", serif',
    },
    h3: {
      fontFamily: '"DM Serif Display", serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrizeManagement />} />
          <Route path="/raffle" element={<RaffleEngine />} />
          <Route path="/confirmation" element={<EnrollmentConfirmation />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
