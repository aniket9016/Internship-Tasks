import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
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
} from "@mui/icons-material";

const Header = ({ title }) => {
  const cartCount = useSelector((state) => state.cart.items.length);
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

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
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
        </Toolbar>
      </AppBar>

      <Box ></Box>
    </>
  );
};

export default Header;
