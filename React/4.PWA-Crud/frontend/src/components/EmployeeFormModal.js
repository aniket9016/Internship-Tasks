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
  Avatar,
  Paper
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
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profile_image: "Please select a valid image file" }));
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profile_image: "Image size should be less than 5MB" }));
        return;
      }

      setForm((prev) => ({ ...prev, profile_image: file }));
      setPreview(URL.createObjectURL(file));
      setExistingImage(null);
      setErrors(prev => ({ ...prev, profile_image: "" }));
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, profile_image: null }));
    setPreview(null);
    setExistingImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!form.first_name.trim()) {
      newErrors.first_name = "First name is required.";
    } else if (form.first_name.trim().length < 2) {
      newErrors.first_name = "First name must be at least 2 characters.";
    }
    
    if (!form.last_name.trim()) {
      newErrors.last_name = "Last name is required.";
    } else if (form.last_name.trim().length < 2) {
      newErrors.last_name = "Last name must be at least 2 characters.";
    }
    
    if (!form.age || form.age < 18 || form.age > 65) {
      newErrors.age = "Age must be between 18 and 65.";
    }
    
    if (!form.city.trim()) {
      newErrors.city = "City is required.";
    } else if (form.city.trim().length < 2) {
      newErrors.city = "City must be at least 2 characters.";
    }
    
    if (!form.mobile.match(/^[0-9]{10}$/)) {
      newErrors.mobile = "Mobile must be exactly 10 digits.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    for (const key in form) {
      if (form[key] !== null && form[key] !== undefined) {
        formData.append(key, form[key]);
      }
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

  const currentImage = preview || existingImage;

  return (
    <Dialog open={show} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 2 }}>
        <Typography variant="h5" component="div">
          {initialData ? "Edit Employee" : "Add Employee"}
        </Typography>
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
        <DialogContent sx={{ pt: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Profile Image Section */}
            <Paper elevation={1} sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom color="primary">
                Profile Image
              </Typography>

              <Box sx={{ mb: 3, position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={currentImage}
                  sx={{
                    width: 140,
                    height: 140,
                    margin: '0 auto',
                    border: '4px solid',
                    borderColor: 'primary.light',
                    boxShadow: 3
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
                sx={{ mb: 1 }}
              >
                {currentImage ? "Change Image" : "Upload Image"}
              </Button>
              
              {errors.profile_image && (
                <Typography variant="caption" color="error" display="block">
                  {errors.profile_image}
                </Typography>
              )}
              
              <Typography variant="caption" color="text.secondary" display="block">
                Max size: 5MB. Supported formats: JPG, PNG, GIF
              </Typography>
            </Paper>

            {/* Personal Information */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Personal Information
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
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

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
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
            </Paper>

            {/* Work Information */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Work Information
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
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
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Operations">Operations</MenuItem>
                  </Select>
                </FormControl>

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

              <TextField
                name="mobile"
                label="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                error={!!errors.mobile}
                helperText={errors.mobile}
                required
                fullWidth
                inputProps={{ maxLength: 10 }}
                placeholder="Enter 10-digit mobile number"
              />
            </Paper>
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: 3, gap: 1 }}>
          <Button onClick={handleClose} variant="outlined" size="large">
            Cancel
          </Button>
          <Button type="submit" variant="contained" size="large">
            {initialData ? "Update Employee" : "Add Employee"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}