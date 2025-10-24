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

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [current, setCurrent] = useState<"transcription" | "foodaify" | "aicss">("foodaify");
  const [cgptQuote, setCgptQuote] = useState("");

  const IMAGE_FRAME_W = 220; // px
  const IMAGE_FRAME_H = 200; // px

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
    const interval = setInterval(updateQuote, 5000);
    return () => clearInterval(interval);
  }, []);

  const images: Record<"transcription" | "foodaify" | "aicss", string> = {
    transcription: "/images/transcription.png",
    foodaify: "/images/foodaify.png",
    aicss: "/images/aicss.png",
  };

  // 🔁 Enkelt bildspel (utan att ta bort/lägga till img-element)
  useEffect(() => {
    const order: Array<"transcription" | "foodaify" | "aicss"> = [
      "transcription",
      "foodaify",
      "aicss",
    ];
    let i = order.indexOf(current);
    const id = setInterval(() => {
      i = (i + 1) % order.length;
      setCurrent(order[i]);
    }, 3000);
    return () => clearInterval(id);
  }, [current]);

  // Förladda
  useEffect(() => {
    Object.values(images).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Dark mode
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

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#6a1b9a" },
      background: { default: "#f3e5f5", paper: "#fff" },
      text: { primary: "#000", secondary: "#555" },
    },
    typography: { fontFamily: "'Inter', sans-serif" },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#ce93d8" },
      background: { default: "#0A0F1C", paper: "#fff" },
      text: { primary: "#fff", secondary: "#ddd" },
    },
    typography: { fontFamily: "'Inter', sans-serif" },
  });

  const theme = darkMode ? darkTheme : lightTheme;
  const isMobile = useMediaQuery("(max-width:960px)");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Bakgrundseffekt */}
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
          opacity: darkMode ? 0.65 : 0.4,
          transition: "opacity 1.5s ease, background 1.5s ease",
          background: darkMode
            ? `radial-gradient(circle at 20% 20%, rgba(0,255,191,0.45) 0%, rgba(0,191,255,0.4) 25%, rgba(50,205,50,0.35) 55%, rgba(72,61,139,0.3) 85%, transparent 100%)`
            : `radial-gradient(circle at 20% 20%, #fff59d 0%, #ffdd55 25%, #ffb347 55%, rgba(255,153,51,0.3) 80%, transparent 100%)`,
        }}
      />

      {/* Dark mode knapp */}
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
        {/* Bakgrundsbilder */}
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
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}

        {!isMobile && (
          <Box
            sx={{
              position: "fixed",
              top: "66%",
              left: 0,
              width: { xs: "40%", md: "22%" },
              height: "60vh",
              backgroundImage: `url(${main2})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}

        <Container
  maxWidth="md"
  sx={{
    mb: 16,
    textAlign: "center",
    position: "relative",
    zIndex: 2, // 🧱 ser till att texten ligger ovanpå bilderna
  }}
>
  <Typography
    variant="h2"
    component="h1"
    fontWeight={800}
    gutterBottom
    sx={{
      fontSize: { xs: "3rem", md: "4rem" },
      mb: 2,
      wordWrap: "break-word", // ✅ bryt långa ord
      overflowWrap: "break-word",
      whiteSpace: "normal", // ✅ förhindra textoverflow
    }}
  >
    𖡎 My AI Portfolio
  </Typography>

  <Typography
    variant="h5"
    sx={{
      mb: 2,
      maxWidth: "600px", // ✅ förhindra för långa rader
      mx: "auto", // centrera texten
      lineHeight: 1.4,
      wordWrap: "break-word",
    }}
  >
    Cutting-edge AI projects with futuristic design and modern tech.
  </Typography>

  <Typography
    variant="subtitle1"
    sx={{
      mb: 6,
      fontSize: 18,
      maxWidth: "600px",
      mx: "auto",
      lineHeight: 1.4,
      whiteSpace: "normal",
    }}
  >
    Educated in C# and AI but codes in any language.
  </Typography>

  <Typography
    variant="subtitle1"
    sx={{
      mb: 6,
      fontSize: 18,
      fontStyle: "italic",
      color: darkMode ? "#ffb347" : "#00bcd4",
      maxWidth: "600px",
      mx: "auto",
    }}
  >
    According to CGPT: {cgptQuote}
  </Typography>

  <Typography
    variant="overline"
    sx={{
      mb: 4,
      fontSize: 14,
      display: "block",
      letterSpacing: 2,
    }}
  >
    My projects:
  </Typography>


          {/* ✅ Bildspel utan minsta layout-hopp */}
<Box
  sx={{
    position: "relative",
    width: IMAGE_FRAME_W,
    height: IMAGE_FRAME_H,
    mx: "auto",
    mb: 4,
    borderRadius: 3,
    overflow: "hidden",
    border: `3px solid ${
      darkMode
        ? "rgba(206,147,216,0.6)"
        : "rgba(106,27,154,0.4)"
    }`,
    boxShadow: darkMode
      ? "0 8px 20px rgba(206,147,216,0.4)"
      : "0 8px 20px rgba(106,27,154,0.3)",
    backgroundColor: "#000",
    flexShrink: 0,

    // 🧱 HÅRD LAYOUT-LÅSNING (fixar höjd-hopp)
    minHeight: `${IMAGE_FRAME_H}px`,
    maxHeight: `${IMAGE_FRAME_H}px`,
    lineHeight: 0,
    display: "block",
  }}
>

            {/* Alla tre bilder ligger ovanpå varandra – bara opacity växlar */}
            {(
              Object.keys(images) as Array<"transcription" | "foodaify" | "aicss">
            ).map((key) => (
              <img
                key={key}
                src={images[key]}
                alt={key}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",       
                  objectPosition: "center",
                  display: "block",
                  transition: "opacity 450ms ease-in-out",
                  opacity: current === key ? 1 : 0, // 🔁 Växla synlighet
                  pointerEvents: "none",
                }}
              />
            ))}
          </Box>

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
              maxWidth: IMAGE_FRAME_W,
              mx: "auto",
            }}
          >
            Explore Projects
          </Button>
        </Container>

        {/* Projects */}
<Container maxWidth="lg" component="main" id="projects" sx={{ mb: 16 }}>
{isMobile ? (
  <Box sx={{ mt: 2 }}>
    {/* 👇 Lägg till denna lilla text ovanför korten */}
    <Typography
      variant="body2"
      sx={{
        textAlign: "center",
        mb: 2,
        opacity: 0.8,
        fontStyle: "italic",
        fontSize: 14,
        animation: "pulse 2s infinite",
        "@keyframes pulse": {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
      }}
    >
      👉 Swipe sideways to explore more projects →
    </Typography>

    {/* 🔹 Själva scrollbaren */}
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        gap: 3,
        pb: 2,
        px: 2,
        mx: -2,
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {projects.map((project) => (
        <Box
          key={project.title}
          sx={{
            flex: "0 0 105%", // bredd per kort
            scrollSnapAlign: "start",
            borderRadius: 2,
          }}
        >
          <ProjectCard project={project} />
        </Box>
      ))}
    </Box>
  </Box>
  ) : (
    // 💻 Desktop-vy (oförändrad)
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
  )}
</Container>


        {/* Footer */}
        <Box
          component="footer"
          id="contact"
          sx={{
            mt: 16,
            textAlign: "center",
            fontSize: "0.875rem",
            color: "text.secondary",
          }}
        >
          &copy; 2025 Peter’s AI Portfolio. All rights reserved.
          <br />
          Contact me at:{" "}
          <a
            href="mailto:pmolen.swe@gmail.com"
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
