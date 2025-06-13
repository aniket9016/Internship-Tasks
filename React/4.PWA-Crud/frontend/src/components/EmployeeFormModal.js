import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  IconButton,
  Typography,
  Avatar
} from "@mui/material";
import {
  Close as CloseIcon,
  CloudUpload as UploadIcon
} from "@mui/icons-material";

export default function EmployeeFormModal({ show, onHide, onSave, initialData }) {
  const defaultForm = {
    first_name: "",
    last_name: "",
    age: "",
    city: "",
    department: "IT",
    gender: "Male",
    mobile: "",
    profile_image: null,
  };

  const [form, setForm] = useState(defaultForm);
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [errors, setErrors] = useState({});
  const firstNameRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (show && firstNameRef.current) {
      setTimeout(() => firstNameRef.current.focus(), 100);
    }

    let objectUrl = null;

    if (initialData) {
      setForm({
        ...defaultForm,
        ...initialData,
        profile_image: null,
      });

      if (initialData.image_url) {
        setExistingImage(initialData.image_url);
      } else if (
        initialData.profile_image &&
        initialData.profile_image.data &&
        initialData.profile_image.type
      ) {
        try {
          const blob = new Blob([new Uint8Array(initialData.profile_image.data)], {
            type: initialData.profile_image.type,
          });
          objectUrl = URL.createObjectURL(blob);
          setExistingImage(objectUrl);
        } catch (err) {
          console.error("Failed to parse offline image blob", err);
          setExistingImage(null);
        }
      } else {
        setExistingImage(null);
      }

      setPreview(null);
    } else {
      setForm(defaultForm);
      setPreview(null);
      setExistingImage(null);
    }

    setErrors({});

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, profile_image: file }));
      setPreview(URL.createObjectURL(file));
      setExistingImage(null);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.first_name.trim()) newErrors.first_name = "First name is required.";
    if (!form.last_name.trim()) newErrors.last_name = "Last name is required.";
    if (!form.age || form.age < 18 || form.age > 65) newErrors.age = "Age must be 18–65.";
    if (!form.city.trim()) newErrors.city = "City is required.";
    if (!form.mobile.match(/^[0-9]{10}$/)) newErrors.mobile = "Mobile must be 10 digits.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    for (const key in form) {
      if (form[key] !== null) formData.append(key, form[key]);
    }

    if (initialData?.id) {
      formData.append("id", initialData.id);
    }

    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setForm(defaultForm);
    setPreview(null);
    setExistingImage(null);
    setErrors({});
    onHide();
  };

  return (
    <Dialog open={show} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {initialData ? "Edit Employee" : "Add Employee"}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Profile Image Section */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Profile Image
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Avatar
                  src={preview || existingImage}
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto',
                    mb: 2
                  }}
                />
              </Box>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                onClick={() => fileInputRef.current.click()}
              >
                Upload Image
              </Button>
            </Box>

            {/* Form Fields */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                inputRef={firstNameRef}
                name="first_name"
                label="First Name"
                value={form.first_name}
                onChange={handleChange}
                error={!!errors.first_name}
                helperText={errors.first_name}
                required
                fullWidth
              />

              <TextField
                name="last_name"
                label="Last Name"
                value={form.last_name}
                onChange={handleChange}
                error={!!errors.last_name}
                helperText={errors.last_name}
                required
                fullWidth
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                name="age"
                label="Age"
                type="number"
                value={form.age}
                onChange={handleChange}
                error={!!errors.age}
                helperText={errors.age}
                required
                fullWidth
                InputProps={{ inputProps: { min: 18, max: 65 } }}
              />

              <TextField
                name="city"
                label="City"
                value={form.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
                required
                fullWidth
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  label="Department"
                >
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                </Select>
              </FormControl>

              <TextField
                name="mobile"
                label="Mobile"
                value={form.mobile}
                onChange={handleChange}
                error={!!errors.mobile}
                helperText={errors.mobile}
                required
                fullWidth
                inputProps={{ maxLength: 10 }}
              />
            </Box>

            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: 3 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {initialData ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
