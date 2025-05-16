import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { ExitToApp, Login as LoginIcon } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Home,
  Business,
  ShoppingCart,
  Countertops,
  Assignment,
  People,
  PersonAdd,
  Domain,
} from "@mui/icons-material";

const Header = ({ title }) => {
  const cartCount = useSelector((state) => state.cart.items.length);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const navLinks = [
    { label: "Home", path: "/", icon: <Home /> },
    { label: "Products", path: "/product", icon: <Business /> },
    { label: "Cart", path: "/cart", icon: <ShoppingCart /> },
    { label: "Counter", path: "/counter", icon: <Countertops /> },
    { label: "Todo", path: "/todo", icon: <Assignment /> },
    { label: "Student", path: "/student", icon: <People /> },
    { label: "Register", path: "/register", icon: <PersonAdd /> },
  ];

  if (isAuthenticated) {
    navLinks.push({
      label: "Department",
      path: "/department",
      icon: <Domain />,
    });
  }

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerToggle}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{ width: 240 }}
          role="presentation"
          onClick={handleDrawerToggle}
        >
          <List>
            {navLinks.map((link) => (
              <ListItem
                button
                key={link.path}
                component={NavLink}
                to={link.path}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#0288d1" : "transparent",
                  color: isActive ? "#fff" : "inherit",
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              flexGrow: 1,
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>

          <IconButton
            component={NavLink}
            to="/cart"
            color="inherit"
            sx={{ ml: 2 }}
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {isAuthenticated ? (
            <>
              <IconButton onClick={handleLogout} color="inherit">
                <ExitToApp />
              </IconButton>
              <Typography variant="body1" color="inherit" sx={{ ml: 1 }}>
                Logout
              </Typography>
            </>
          ) : (
            <>
              <IconButton component={NavLink} to="/login" color="inherit">
                <LoginIcon />
              </IconButton>
              <Typography variant="body1" color="inherit" sx={{ ml: 1 }}>
                Login
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box></Box>
    </>
  );
};

export default Header;
