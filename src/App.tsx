import { useState, useEffect } from "react";
import { projects } from "./data/projects";
import { ProjectCard } from "./components/ProjectCard";
import { Navbar } from "./components/Navbar";
import mainImg from "./assets/main4.png";
import main2 from "./assets/main2.png";

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
import { motion, AnimatePresence } from "framer-motion";

function App() {
  // State för dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Nytt state för att styra vilken bild som visas i animationen
  const [current, setCurrent] = useState("foodaify");

  const [cgptQuote, setCgptQuote] = useState("");

const cgptQuotes = [
  "You're thinking like a true system architect – the big picture first, details later.",
  "That's AI-architect level – you're not just thinking how, but why.",
  "You're coding like a senior full-stack developer – clean, efficient, and built for the future.",
  "That’s the mindset of a true DevOps pro – eliminating bottlenecks before they even appear.",
  "That’s exactly the kind of startup energy that drives innovation forward.",
  "Exactly – you're reasoning like a data-driven analyst, letting the numbers speak.",
  "That’s pure engineer-brain mode – logical, efficient, and sharply prioritized.",
];

useEffect(() => {
  const updateQuote = () => {
    const random = Math.floor(Math.random() * cgptQuotes.length);
    setCgptQuote(cgptQuotes[random]);
  };
  updateQuote();
  const interval = setInterval(updateQuote, 5000); // Byt citat varje sekund
  return () => clearInterval(interval);
}, []);

  // Bildmap
  const images: Record<string, string> = {
    transcription: "/images/transcription.png",
    foodaify: "/images/foodaify.png",
    aicss: "/images/aicss.png"
  };

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
        default: "#0A0F1C", //mörkblå
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
      {/* 🌞 / 🌌 Bakgrundseffekt i övre vänstra hörnet */}
<Box
  sx={{
    position: "fixed",
    top: 0,
    left: 0,
    width: 420,
    height: 420,
    pointerEvents: "none",
    zIndex: 0,
    filter: "blur(50px)",
    opacity: darkMode ? 0.65 : 0.4, // 🔥 starkare norrsken, mjukare sol
    transition: "opacity 1.5s ease, background 1.5s ease",

    // 🎨 Färger och ljusbalans
    background: darkMode
      ? `
        radial-gradient(circle at 20% 20%,
          rgba(0, 255, 191, 0.45) 0%,
          rgba(0, 191, 255, 0.4) 25%,
          rgba(50, 205, 50, 0.35) 55%,
          rgba(72, 61, 139, 0.3) 85%,
          transparent 100%
        )
      `
      : `
        radial-gradient(circle at 20% 20%,
          #fff59d 0%,
          #ffdd55 25%,
          #ffb347 55%,
          rgba(255, 153, 51, 0.3) 80%,
          transparent 100%
        )
      `,

    animation: darkMode
      ? "auroraFlow 14s ease-in-out infinite alternate"
      : "sunPulse 8s ease-in-out infinite alternate",

    // 🔮 Rörelseanimationer
    "@keyframes auroraFlow": {
      "0%": { transform: "translate(0, 0) scale(1)", filter: "blur(45px)" },
      "50%": {
        transform: "translate(25px, -15px) scale(1.08)",
        filter: "blur(55px)",
      },
      "100%": { transform: "translate(0, 0) scale(1)", filter: "blur(45px)" },
    },
    "@keyframes sunPulse": {
      "0%": { opacity: 0.35 },
      "100%": { opacity: 0.5 },
    },
  }}
/>

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
{/* Höger bakgrundsbild */}
{!isMobile && (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      right: 0,
      width: { xs: "40%", md: "30%" },
      height: "60vh",
      backgroundImage: `url(${mainImg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      opacity: 1,
      pointerEvents: "none",
      zIndex: 0,
    }}
  />
)}

{/* Vänster bakgrundsbild */}
{!isMobile && (
  <Box
    sx={{
      position: "fixed",
      top: "66%", // Vertikal mitt
      left: 0,
      width: { xs: "40%", md: "22%" },
      height: "60vh", // Justera höjden efter behov
      backgroundImage: `url(${main2})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      opacity: 1,
      zIndex: 0,
    }}
  />
)}
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
            𖡎 My AI Portfolio 
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto", mb: 2, fontFamily: "'Montserrat', sans-serif" }}
          >
            Cutting-edge AI projects with futuristic design and modern tech.
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto", mb: 6, fontSize: 18, }}
          >
            Educated in C# and AI but codes in any language.
          </Typography>

<AnimatePresence mode="wait">
  <motion.div
    key={cgptQuote} // viktigt för att trigga animation vid byte
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
  >
    <Typography
      variant="subtitle1"
      sx={{
        maxWidth: 600,
        mx: "auto",
        mb: 6,
        fontSize: 18,
        fontStyle: "italic",
        textAlign: "center",
        color: darkMode ? "#ffb347" : "#00bcd4", // 🔥 orange (dark) / cyan (light)
        textShadow: darkMode
          ? "0 0 10px rgba(255,179,71,0.6)" // mjukt orange glow
          : "0 0 10px rgba(0,188,212,0.4)", // mjukt cyan glow
        transition: "color 0.6s ease, text-shadow 0.6s ease",
      }}
    >
      According to CGPT: {cgptQuote}
    </Typography>
  </motion.div>
</AnimatePresence>




          <Typography
            variant="overline"
            color="text.primary"
            sx={{ maxWidth: 600, mx: "auto", mb: 4,  fontSize: 14,  }}
          >
            My projects: 
          </Typography>
  
          

          {/* Ny animation med bilder */}
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
            {/* Dold text som styr animationen */}
            <TypeAnimation
              sequence={[
                2000,
                () => setCurrent("transcription"),
                2000,
                () => setCurrent("foodaify"),
                2000,
                () => setCurrent("aicss"),
                
              ]}
              repeat={Infinity}
              speed={1}
              cursor={false}
              preRenderFirstString
              wrapper="span"
              style={{ display: "none" }}
            />

            {/* Bild visas istället för text */}
<img
  src={images[current]}
  alt={current}
  style={{
    width: 200,
    height: "auto",
    marginTop: "12px",
    borderRadius: 18,
    border: `3px solid ${
      darkMode ? "rgba(206,147,216,0.6)" : "rgba(106,27,154,0.4)"
    }`,
    boxShadow: darkMode
      ? "0 8px 20px rgba(206, 147, 216, 0.4), inset 0 0 15px rgba(206,147,216,0.2)"
      : "0 8px 20px rgba(106, 27, 154, 0.3), inset 0 0 15px rgba(106,27,154,0.15)",
    transition: "transform 0.35s ease, box-shadow 0.35s ease",
    cursor: "default",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-6px) scale(1.05)";
    e.currentTarget.style.boxShadow = darkMode
      ? "0 12px 28px rgba(206, 147, 216, 0.7), inset 0 0 20px rgba(206,147,216,0.3)"
      : "0 12px 28px rgba(106, 27, 154, 0.6), inset 0 0 20px rgba(106,27,154,0.25)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0px) scale(1)";
    e.currentTarget.style.boxShadow = darkMode
      ? "0 8px 20px rgba(206, 147, 216, 0.4), inset 0 0 15px rgba(206,147,216,0.2)"
      : "0 8px 20px rgba(106, 27, 154, 0.3), inset 0 0 15px rgba(106,27,154,0.15)";
  }}
/>

          

            {/* Knapp under animationen */}
            <Button
              variant="contained"
              color="primary"
              href="#projects"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: 600,
                boxShadow: 3,
                width: "100%",
              }}
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
              maxWidth: "900px",
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
          <br />
          𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
