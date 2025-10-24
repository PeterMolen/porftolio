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
  useMediaQuery,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

export const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery("(max-width:960px)");
  const [expanded, setExpanded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // 🌈 Animation & reflection state
  const [style, setStyle] = useState({
    transform: "rotateX(0deg) rotateY(0deg)",
    yOffset: 0,
    scale: 1,
    opacity: 1, // 👈 synlig från start
    translateY: 0,
    reflectionX: 50,
    reflectionY: 50,
  });

  // 🎬 Stop scroll när video är aktiv
  useEffect(() => {
    document.body.style.overflow = showVideo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showVideo]);

  // 🌠 Mouse tilt-effekt
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
    setStyle((prev) => ({
      ...prev,
      transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
      reflectionX: (x / rect.width) * 100,
      reflectionY: (y / rect.height) * 100,
    }));
  };

  const handleMouseLeave = () => {
    setStyle((prev) => ({
      ...prev,
      transform: "rotateX(0deg) rotateY(0deg)",
      reflectionX: 50,
      reflectionY: 50,
    }));
  };

  // 🧠 Fallback – gör kort synligt även om observern missar
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStyle((prev) => ({ ...prev, opacity: 1, translateY: 0 }));
    }, 600);
    return () => clearTimeout(timeout);
  }, []);

  // 🎞️ YouTube helpers
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
        borderRadius: 4,
        backdropFilter: "blur(14px) saturate(180%)",
        background: isDarkMode
          ? "linear-gradient(145deg, rgba(40,40,45,0.4), rgba(20,20,25,0.2))"
          : "linear-gradient(145deg, rgba(255,255,255,0.4), rgba(255,255,255,0.15))",
        border: "1px solid rgba(255,255,255,0.25)",
        transform: `${style.transform} translateY(${style.yOffset}px) scale(${style.scale})`,
        transition: "transform 0.3s ease, box-shadow 0.4s ease, opacity 0.6s ease",
        boxShadow: "0 8px 32px rgba(31,38,135,0.37)",
        opacity: style.opacity > 0 ? style.opacity : 1, // 👈 alltid synligt
        overflow: "visible",
        ...(isMobile && {
          maxHeight: expanded ? "none" : 570,
          overflow: "hidden",
          transition: "max-height 0.5s ease, transform 0.3s ease",
        }),
        "&:hover": {
          boxShadow: "0 12px 45px rgba(31,38,135,0.6)",
          borderColor: "rgba(255,255,255,0.45)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at ${style.reflectionX}% ${style.reflectionY}%, rgba(144,238,144,0.35) 0%, rgba(0,255,128,0.25) 10%, rgba(0,206,209,0.18) 25%, rgba(72,61,139,0.12) 40%, transparent 70%)`,
          mixBlendMode: "screen",
          opacity: 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        },
        "&:hover::before": {
          opacity: 1,
        },
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          position: "relative",
          transition: "max-height 0.5s ease",
          ...(isMobile && {
            maxHeight: expanded ? "800px" : "600px",
            overflow: "hidden",
          }),
        }}
      >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          background: "linear-gradient(90deg, #4fd1ff, #ff5bbd, #ff9350)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          textAlign: "center", // valfritt, men ser ofta snyggare ut
        }}
        gutterBottom
      >
        {project.title}
      </Typography>

        {/* 🎥 Video direkt under titel */}
        {project.youtubeId ? (
          <Box
            sx={{
              position: "relative",
              cursor: "pointer",
              borderRadius: 3,
              overflow: "hidden",
              userSelect: "none",
              aspectRatio: "16 / 9",
              mb: 2,
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
          project.videoUrl && (
            <video
              controls
              style={{ width: "100%", borderRadius: 12, marginBottom: 16 }}
              src={project.videoUrl}
            />
          )
        )}

        {/* 📝 Beskrivning och features */}
        <Typography
          variant="body2"
          color="text.primary"
          mb={2}
          sx={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
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

        {/* 🌫️ Fade vid kollapsat läge */}
        {isMobile && !expanded && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50px",
              background: isDarkMode
                ? "linear-gradient(to top, rgba(0,0,0,0.9), transparent)"
                : "linear-gradient(to top, rgba(255,255,255,0.9), transparent)",
            }}
          />
        )}
      </CardContent>

      {/* 📱 Visa mer / mindre */}
      {isMobile && (
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Button
            variant="text"
            onClick={() => setExpanded(!expanded)}
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            {expanded ? "Visa mindre ▲" : "Visa mer ▼"}
          </Button>
        </Box>
      )}

      {/* 🔗 Actions */}
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
            variant="outlined"
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
