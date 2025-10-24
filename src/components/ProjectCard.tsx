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
    reflectionX: 50, // 🌞 solreflektionens position (x%)
    reflectionY: 50, // 🌞 solreflektionens position (y%)
  });

  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showVideo ? "hidden" : "";
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

    setStyle((prev) => ({
      ...prev,
      transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg)`,
      boxShadow: `${-shadowX.toFixed(1)}px ${-shadowY.toFixed(
        1
      )}px 30px rgba(0,0,0,0.3)`,
      reflectionX: (x / rect.width) * 100,
      reflectionY: (y / rect.height) * 100,
    }));
  };

  const handleMouseLeave = () => {
    setStyle((prev) => ({
      ...prev,
      transform: "rotateX(0deg) rotateY(0deg)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      reflectionX: 50,
      reflectionY: 50,
    }));
  };

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
      const translateY =
        20 -
        Math.min(
          20,
          (1 - Math.min(distanceFromCenter / (windowHeight / 1.5), 1)) * 20
        );
      const fadeDistance = windowHeight * 0.4;
      const opacity =
        distanceFromCenter < fadeDistance
          ? 1
          : Math.max(
              0,
              1 -
                (distanceFromCenter - fadeDistance) /
                  (windowHeight - fadeDistance)
            );

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
          setStyle((prev) => ({ ...prev, opacity: 1, translateY: 0 }));
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

  const getYoutubeThumbnail = (id: string) =>
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
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
        borderRadius: 4,
        backdropFilter: "blur(14px) saturate(180%)",
        background: isDarkMode
          ? "linear-gradient(145deg, rgba(40,40,45,0.4), rgba(20,20,25,0.2))"
          : "linear-gradient(145deg, rgba(255,255,255,0.4), rgba(255,255,255,0.15))",
        border: "1px solid rgba(255,255,255,0.25)",
        transform: `${style.transform} translateY(${style.yOffset}px) scale(${style.scale}) translateY(${style.translateY}px)`,
        transition:
          "transform 0.3s ease, box-shadow 0.4s ease, opacity 0.6s ease, border-color 0.3s ease",
        transformStyle: "preserve-3d",
        perspective: 1000,
        boxShadow: "0 8px 32px rgba(31,38,135,0.37)",
        position: "relative",
        overflow: "hidden",
        opacity: style.opacity,
        "&:hover": {
          boxShadow: "0 12px 45px rgba(31,38,135,0.6)",
          borderColor: "rgba(255,255,255,0.45)",
        },

        // 🌞 realistisk solreflektion (ljusprick)
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(
            circle at ${style.reflectionX}% ${style.reflectionY}%,
            rgba(144, 238, 144, 0.35) 0%,    /* soft aurora green core */
            rgba(0, 255, 128, 0.25) 10%,     /* vibrant green glow */
            rgba(0, 206, 209, 0.18) 25%,     /* turquoise edge */
            rgba(72, 61, 139, 0.12) 40%,     /* deep aurora blue */
            transparent 70%
          )`,
          mixBlendMode: "screen",
          opacity: 0,
          transition: "opacity 0.5s ease, background 0.25s ease",
          pointerEvents: "none",
          filter: "blur(0.5px) saturate(120%) brightness(1)",
        },
        "&:hover::before": {
          opacity: 1,
        },


      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            background: "linear-gradient(90deg, #4fd1ff, #ff5bbd, #ff9350)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          gutterBottom
        >
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
              sx={{
                mr: 0.5,
                mb: 0.5,
                backdropFilter: "blur(6px)",
                backgroundColor: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </Stack>
      </CardContent>

      {/* 🎥 Video Section */}
      {project.youtubeId ? (
        <Box
          sx={{
            px: 2,
            position: "relative",
            cursor: "pointer",
            borderRadius: 3,
            overflow: "hidden",
            userSelect: "none",
            aspectRatio: "16 / 9",
          }}
          onClick={() => !showVideo && setShowVideo(true)}
        >
          {!showVideo ? (
            <>
              <img
                src={getYoutubeThumbnail(project.youtubeId)}
                alt={`${project.title} thumbnail`}
                style={{
                  width: "100%",
                  borderRadius: 12,
                  display: "block",
                }}
                draggable={false}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              >
                <PlayCircleOutlineIcon sx={{ fontSize: 44 }} />
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
                  backgroundColor: "rgba(0,0,0,0.4)",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                }}
              >
                <CloseIcon />
              </IconButton>
              <iframe
                width="100%"
                height="100%"
                src={getYoutubeEmbedUrl(project.youtubeId)}
                title={`${project.title} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: 12 }}
              />
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
          <Button
            size="small"
            component="a"
            href={project.sourceCode === "ask" ? undefined : project.sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            variant={project.sourceCode === "ask" ? "outlined" : "outlined"}
            disabled={project.sourceCode === "ask"}
            sx={{
              fontWeight: 700,
              color: project.sourceCode === "ask" ? "#6a1b9a" : "inherit",
              borderColor: "#6a1b9a",
            }}
          >
            {project.sourceCode === "ask"
              ? "Ask for the source code"
              : "Source Code"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
