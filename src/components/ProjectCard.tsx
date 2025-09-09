import type { Project } from "../data/projects";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Chip,
  Box,
  useTheme,
  IconButton,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

export const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [style, setStyle] = useState({
    transform: "rotateX(0deg) rotateY(0deg)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    background: "",
    yOffset: 0,
    scale: 1,
    opacity: 0,
    translateY: 20,
  });

  // State för om videon ska visas inline eller bara thumbnail
  const [showVideo, setShowVideo] = useState(false);

  // Hindra scroll i bakgrunden när video visas
  useEffect(() => {
    if (showVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup på unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [showVideo]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const maxRotation = 10;
    const rotateX = ((centerY - y) / centerY) * maxRotation;
    const rotateY = ((x - centerX) / centerX) * maxRotation;

    const shadowX = ((x - centerX) / centerX) * 20;
    const shadowY = ((y - centerY) / centerY) * 20;

    const highlight = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 80%)`;

    setStyle((prev) => ({
      ...prev,
      transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
      boxShadow: `${-shadowX.toFixed(1)}px ${-shadowY.toFixed(1)}px 30px rgba(0,0,0,0.3)`,
      background: highlight,
    }));
  };

  const handleMouseLeave = () => {
    setStyle((prev) => ({
      ...prev,
      transform: "rotateX(0deg) rotateY(0deg)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      background: "none",
    }));
  };

  // Scroll + fade-in + parallax
  useEffect(() => {
    const handleScroll = () => {
  if (!cardRef.current) return;
  const rect = cardRef.current.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const cardMiddle = rect.top + rect.height / 2;
  const distanceFromCenter = Math.abs(windowHeight / 2 - cardMiddle);
  const maxOffset = 30;

  const yOffset = ((rect.top / windowHeight) - 0.5) * maxOffset;

  const scale = 1 - Math.min(distanceFromCenter / windowHeight, 0.2);
  const translateY = 20 - Math.min(20, (1 - Math.min(distanceFromCenter / (windowHeight / 1.5), 1)) * 20);

  // Fade-in när kortet kommer in, men fördröjd fade-out när det lämnar
  const fadeDistance = windowHeight * 0.4; // större värde = längre tid innan den börjar försvinna
  const opacity =
    distanceFromCenter < fadeDistance
      ? 1 // helt opakt tills vi når slutet av scroll
      : Math.max(0, 1 - (distanceFromCenter - fadeDistance) / (windowHeight - fadeDistance));

  setStyle((prev) => ({
    ...prev,
    yOffset,
    scale,
    opacity,
    translateY,
  }));
};


    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStyle((prev) => ({
            ...prev,
            opacity: 1,
            translateY: 0,
          }));
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Funktion för att få YouTube thumbnail URL från youtubeId
  const getYoutubeThumbnail = (id: string) =>
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  // YouTube embed URL
  const getYoutubeEmbedUrl = (id: string) =>
    `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;

  return (
    <Card
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: 350,
        backdropFilter: "blur(10px)",
        backgroundColor: isDarkMode
          ? "rgba(18,18,18,0.9)"
          : "rgba(255,255,255,0.85)",
        borderRadius: 3,
        transform: `${style.transform} translateY(${style.yOffset}px) scale(${style.scale}) translateY(${style.translateY}px)`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease, opacity 0.6s ease",
        transformStyle: "preserve-3d",
        perspective: 1000,
        boxShadow: style.boxShadow,
        backgroundImage: style.background,
        position: "relative",
        overflow: "hidden",
        opacity: style.opacity,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" color="primary" gutterBottom fontWeight={600}>
          {project.title}
        </Typography>

        <Typography variant="body2" color="text.primary" mb={2}>
          {project.description}
        </Typography>

        {project.coreFeatures && (
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            {project.coreFeatures.map((feature, i) => (
              <li key={i}>
                <Typography variant="body2" color="text.primary">
                  {feature}
                </Typography>
              </li>
            ))}
          </Box>
        )}

        <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
          {project.tech.map((techItem, i) => (
            <Chip
              key={i}
              label={techItem}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mr: 0.5, mb: 0.5 }}
            />
          ))}
        </Stack>
      </CardContent>

      {/* YouTube video handling */}
      {project.youtubeId ? (
        <Box
          sx={{
            px: 2,
            position: "relative",
            cursor: "pointer",
            borderRadius: 2,
            overflow: "hidden",
            userSelect: "none",
            aspectRatio: "16 / 9",
          }}
          onClick={() => !showVideo && setShowVideo(true)}
          aria-label="Play video"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              if (!showVideo) setShowVideo(true);
            }
          }}
        >
          {!showVideo ? (
            <>
              <img
                src={getYoutubeThumbnail(project.youtubeId)}
                alt={`${project.title} video thumbnail`}
                style={{
                  width: "100%",
                  borderRadius: 12,
                  display: "block",
                  userSelect: "none",
                }}
                draggable={false}
                loading="lazy"
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  borderRadius: "50%",
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <PlayCircleOutlineIcon sx={{ fontSize: 48 }} />
              </Box>
            </>
          ) : (
            <>
              <IconButton
                aria-label="Close video"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVideo(false);
                }}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 10,
                  color: "white",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.7)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
              <iframe
                loading="lazy"
                width="100%"
                height="100%"
                src={getYoutubeEmbedUrl(project.youtubeId)}
                title={`${project.title} YouTube video player`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: 12 }}
              ></iframe>
            </>
          )}
        </Box>
      ) : (
        <video
          controls
          style={{ width: "100%", borderRadius: 12 }}
          src={project.videoUrl}
        />
      )}

<CardActions
  sx={{
    px: 2,
    pt: 2,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 1,
  }}
>
  {project.liveDemo && (
    <Button
      size="small"
      component="a"
      href={project.liveDemo}
      target="_blank"
      rel="noopener noreferrer"
      color="primary"
      variant="contained"
    >
      Live Demo
    </Button>
  )}

{project.sourceCode && (
  project.sourceCode === "ask" ? (
    <Button
      size="small"
      disabled
      variant="outlined"
      sx={{
        fontWeight: 700,              
        color: "#6a1b9a !important",     
        borderColor: "#6a1b9a !important",
        fontStyle: "normal !important"   
      }}
    >
      Ask for the source code
    </Button>
  ) : (
    <Button
      size="small"
      component="a"
      href={project.sourceCode}
      target="_blank"
      rel="noopener noreferrer"
      color="primary"
      variant="outlined"
    >
      Source Code
    </Button>
  )
)}
</CardActions>

    </Card>
  );
};

