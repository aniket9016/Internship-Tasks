import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployee } from "../api";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
  Paper
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  LocationCity as CityIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Cake as AgeIcon
} from "@mui/icons-material";
import { toast } from "react-toastify";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const { data } = await getEmployee(id);
        setEmp(data);
      } catch {
        toast.error("Failed to load employee details");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!emp) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Employee not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back to Home
      </Button>

      <Card sx={{ boxShadow: 4 }}>
        <CardMedia
          component="img"
          height="300"
          image={emp.image_url || "https://via.placeholder.com/300"}
          alt={`${emp.first_name} ${emp.last_name}`}
          sx={{ objectFit: 'cover' }}
        />
        
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            {emp.first_name} {emp.last_name}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
            <Paper elevation={1} sx={{ p: 2, flex: '1 1 250px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Gender
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {emp.gender}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={1} sx={{ p: 2, flex: '1 1 250px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AgeIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Age
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {emp.age} years
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={1} sx={{ p: 2, flex: '1 1 250px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CityIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    City
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {emp.city}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={1} sx={{ p: 2, flex: '1 1 250px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {emp.department}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={1} sx={{ p: 2, flex: '1 1 250px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Mobile
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {emp.mobile}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}