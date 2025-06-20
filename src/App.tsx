import React, { useState, useEffect } from "react";
import { projects } from "./data/projects";
import { ProjectCard } from "./components/ProjectCard";
import { Navbar } from "./components/Navbar";

import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  CssBaseline,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { TypeAnimation } from "react-type-animation";

function App() {
  // State för dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Spara dark mode i localStorage och läs initialt
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) {
      setDarkMode(saved === "true");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  // Skapa themes
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#6a1b9a",
      },
      background: {
        default: "#f3e5f5",
        paper: "#fff",
      },
      text: {
        primary: "#000",
        secondary: "#555",
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ce93d8",
      },
      background: {
        default: "#000000",
        paper: "#fff",
      },
      text: {
        primary: "#fff",
        secondary: "#ddd",
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
    },
  });

  const theme = darkMode ? darkTheme : lightTheme;

  // Media query för mobil (om du vill)
  const isMobile = useMediaQuery("(max-width:960px)");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Dark mode knapp centrerad högst upp */}
      <Box
        sx={{
          position: "fixed",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: (theme) => theme.zIndex.tooltip,
          color: theme.palette.text.primary,
        }}
      >
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          color="inherit"
          aria-label="toggle dark mode"
          size="large"
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Box
        sx={{
          minHeight: "100vh",
          px: { xs: 2, sm: 8 },
          py: 12,
          bgcolor: "background.default",
          color: "text.primary",
          transition: "background-color 0.5s ease, color 0.5s ease",
          userSelect: "none",
        }}
      >
        <Container maxWidth="md" sx={{ mb: 16, textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            fontWeight={800}
            gutterBottom
            sx={{
              fontSize: { xs: "3rem", md: "4rem" },
              textShadow: darkMode
                ? "0 2px 8px rgba(255, 255, 255, 0.3)"
                : "0 2px 5px rgba(0,0,0,0.2)",
              mb: 2,
              color: "text.primary",
            }}
          >
            🧠 My AI Portfolio
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
          >
            Cutting-edge AI projects with futuristic design and modern tech.
          </Typography>

          {/* Wrapper Box med flex column för animation + knapp */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mx: "auto",
              mb: 4,
              maxWidth: 400,
              color: theme.palette.primary.main,
              fontWeight: 700,
              fontSize: { xs: "1rem", md: "1.3rem" },
              userSelect: "none",
            }}
          >
            {/* Animated text utan box */}
            <TypeAnimation
              sequence={[
                "AI-receipt-analys",
                2000,
                "AI-transcription & Editor tool",
                2000,
                "E-commerce + AI chatbot",
                2000,
              ]}
              wrapper="span"
              speed={45}
              repeat={Infinity}
            />

            {/* Knapp under animationen */}
            <Button
              variant="contained"
              color="primary"
              href="#projects"
              size="large"
              sx={{ px: 5, py: 1.5, fontWeight: 600, boxShadow: 3, width: "100%" }}
            >
              Explore Projects
            </Button>
          </Box>
        </Container>

        <Container maxWidth="lg" component="main" id="projects" sx={{ mb: 16 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              width: "100%",
              maxWidth: "1200px",
              mx: "auto",
            }}
          >
            {projects.map((project) => (
              <Box key={project.title} sx={{ width: "100%" }}>
                <ProjectCard project={project} />
              </Box>
            ))}
          </Box>
        </Container>

        <Box
          component="footer"
          id="contact"
          sx={{
            mt: 16,
            textAlign: "center",
            fontSize: "0.875rem",
            color: "text.secondary",
            userSelect: "none",
          }}
        >
          &copy; 2025 Peter’s AI Portfolio. All rights reserved.
          <br />
          Contact me at:{" "}
          <a
            href="mailto:your.email@example.com"
            style={{ color: theme.palette.primary.main }}
          >
            pmolen.swe@gmail.com
          </a>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
