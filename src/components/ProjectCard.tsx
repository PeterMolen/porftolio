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
} from "@mui/material";

export const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Card
      elevation={8}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: 350,
        backdropFilter: "blur(10px)",
        backgroundColor: isDarkMode ? "rgba(18,18,18,0.9)" : "rgba(255,255,255,0.7)",
        borderRadius: 3,
        transition: "box-shadow 0.5s",
        "&:hover": {
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        },
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

      {project.videoUrl && (
        <Box sx={{ px: 2 }}>
          <video
            src={project.videoUrl}
            controls
            style={{
              width: "100%",
              borderRadius: 12,
              border: "1px solid #c5cae9",
              boxShadow: "0 2px 10px rgba(99, 102, 241, 0.3)",
            }}
          />
        </Box>
      )}

      <CardActions sx={{ mt: 2, px: 2, pb: 2, gap: 2 }}>
        <Button
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="primary"
          fullWidth
        >
          GitHub
        </Button>

        {project.liveDemo && (
          <Button
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="success"
            fullWidth
          >
            Live Demo
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
