import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Switch,
  Slider,
  Rating,
  Autocomplete,
  Grid,
  Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CommonModal from "./CommonModal";

function Register() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formContent = (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" display="flex" flexDirection="column" gap={2}>
        <TextField label="Name" fullWidth required />
        <TextField label="Email" type="email" fullWidth required />
        <TextField label="Password" type="password" fullWidth required />
        <TextField label="Age" type="number" fullWidth />

        <Box>
          <Typography>Gender</Typography>
          <RadioGroup row>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </Box>

        <Box>
          <Typography>Hobbies</Typography>
          <FormGroup row>
            <FormControlLabel control={<Checkbox />} label="Reading" />
            <FormControlLabel control={<Checkbox />} label="Gaming" />
            <FormControlLabel control={<Checkbox />} label="Traveling" />
          </FormGroup>
        </Box>

        <DatePicker
          label="Date of Birth"
          renderInput={(params) => <TextField fullWidth {...params} />}
        />

        <Button variant="outlined" component="label">
          Upload File
          <input type="file" hidden />
        </Button>

        <FormControlLabel control={<Switch />} label="Agree to terms" />

        <Box>
          <Typography gutterBottom>Experience Level</Typography>
          <Slider
            step={1}
            marks
            min={0}
            max={10}
            valueLabelDisplay="auto"
            defaultValue={5}
          />
        </Box>

        <Box>
          <Typography gutterBottom>Rating</Typography>
          <Rating defaultValue={2} />
        </Box>

        <Autocomplete
          options={["India", "USA", "UK", "Canada"]}
          renderInput={(params) => <TextField {...params} label="Country" />}
        />

        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </Box>
    </LocalizationProvider>
  );

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mb: 5 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Our Community!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Join us by creating a profile. It only takes a minute to get started.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6">✔ Easy Registration</Typography>
            <Typography variant="body2" color="text.secondary">
              Our simple form makes signing up a breeze.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6">✔ Customizable Profile</Typography>
            <Typography variant="body2" color="text.secondary">
              Add details like hobbies, country, and more.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6">✔ Secure & Private</Typography>
            <Typography variant="body2" color="text.secondary">
              We value your privacy and data security.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box textAlign="center" mt={6}>
        <Typography variant="h5" gutterBottom>
          Ready to get started?
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Register
        </Button>
      </Box>

      <CommonModal
        show={open}
        title="Register"
        body={formContent}
        onClose={handleClose}
      />
    </Container>
  );
}

export default Register;
