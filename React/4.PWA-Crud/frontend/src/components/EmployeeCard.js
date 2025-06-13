import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  WifiOff as OfflineIcon,
} from "@mui/icons-material";

export default function EmployeeCard({
  emp,
  onEdit,
  onDelete,
  onView,
  isOffline = false,
  onDeleteOffline,
}) {
  let imageUrl = "https://via.placeholder.com/150"; // Default fallback

  if (emp.profile_image) {
    if (typeof emp.profile_image === "string") {
      imageUrl = `http://localhost:5000/uploads/${emp.profile_image}`;
    } else if (emp.profile_image instanceof Blob || emp.profile_image instanceof File) {
      imageUrl = URL.createObjectURL(emp.profile_image);
    } else if (emp.profile_image.data && emp.profile_image.type) {
      try {
        const blob = new Blob([new Uint8Array(emp.profile_image.data)], {
          type: emp.profile_image.type,
        });
        imageUrl = URL.createObjectURL(blob);
      } catch (err) {
        console.error("Invalid offline image format", err);
      }
    }
  } else if (emp.image_url) {
    imageUrl = emp.image_url;
  }

  return (
    <Card
      sx={{
        maxWidth: 280,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxShadow: 4,
        borderRadius: 2,
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: 8,
          transform: "translateY(-4px)",
        },
      }}
    >
      {isOffline && (
        <Chip
          icon={<OfflineIcon />}
          label="Offline"
          color="warning"
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 1,
          }}
        />
      )}

      <CardMedia
        component="img"
        height="180"
        image={imageUrl}
        alt="Employee"
        sx={{
          objectFit: "cover",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />

      <CardContent sx={{ flexGrow: 1, textAlign: "center", paddingBottom: 1.5 }}>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          {emp.first_name} {emp.last_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {emp.department} — {emp.city}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Tooltip title="View">
            <IconButton
              onClick={() => onView?.(emp)}
              sx={{
                bgcolor: "info.main",
                color: "white",
                "&:hover": { bgcolor: "info.dark" },
              }}
            >
              <ViewIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton
              onClick={() => onEdit?.(emp)}
              sx={{
                bgcolor: "warning.main",
                color: "white",
                "&:hover": { bgcolor: "warning.dark" },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              onClick={() =>
                isOffline ? onDeleteOffline?.(emp.localId) : onDelete?.(emp.id)
              }
              sx={{
                bgcolor: "error.main",
                color: "white",
                "&:hover": { bgcolor: "error.dark" },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
}
