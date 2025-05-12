import React from "react";
import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.dark",
        color: "white",
        py: 2,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" component="p" sx={{ m: 0 }}>
          &copy; 2025 Aniket. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
