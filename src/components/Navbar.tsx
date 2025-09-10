import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Navbar({ darkMode, setDarkMode: _setDarkMode }: NavbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200); // visas efter 200px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleMenuClose();
  };

  const menuItems = [
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
    ...(showScrollTop
      ? [{ label: <ArrowUpwardIcon />, action: scrollToTop }]
      : []),
  ];

  if (!isMobile) return null;

  return (
    <AppBar
      position="fixed"
      color={darkMode ? "default" : "primary"}
      sx={{
        bgcolor: darkMode ? "grey.900" : "primary.main",
        color: darkMode ? "grey.100" : "primary.contrastText",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          component="a"
          href="#"
          sx={{
            textDecoration: "none",
            fontWeight: "bold",
            color: darkMode ? "grey.100" : "primary.contrastText",
          }}
        >
          AI Portfolio
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            size="large"
          >
            {menuAnchorEl ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              bgcolor: "white",
              color: "black",
              mt: 1,
              minWidth: 150,
              borderRadius: 2,
              boxShadow: 3,
            },
          }}
        >
          {menuItems.map(({ label, href, action }, index) => {
            const isArrowIcon =
              React.isValidElement(label) && label.type === ArrowUpwardIcon;

            return (
              <MenuItem
                key={index}
                component={href ? "a" : "button"}
                href={href}
                onClick={() => {
                  if (action) action();
                  else handleMenuClose();
                }}
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  textAlign: "center",
                  color: theme.palette.primary.main,
                  ...(isArrowIcon && {
                    gap: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                  }),
                  "&:hover": {
                    bgcolor: "primary.light",
                    color: "white",
                  },
                }}
              >
                {isArrowIcon ? (
                  <ArrowUpwardIcon
                    sx={{
                      fontSize: 30, // större
                      color: "#1976d2 !important"
                    }}
                  />
                ) : (
                  label
                )}
              </MenuItem>
            );
          })}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
