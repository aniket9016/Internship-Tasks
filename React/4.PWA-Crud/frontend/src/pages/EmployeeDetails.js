import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployee, deleteEmployee, updateEmployee } from "../api";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
  Paper,
  Avatar,
  Alert
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  LocationCity as CityIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Cake as AgeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Wc as GenderIcon,
  Badge as BadgeIcon,
  Wifi as OnlineIcon,
  CloudOff as OfflineIcon
} from "@mui/icons-material";
import { toast } from "react-toastify";

// Import the same modals used in HomePage
import EmployeeFormModal from "../components/EmployeeFormModal";
import ConfirmModal from "../components/ConfirmModal";

// Import offline utilities
import {
  saveEmployeeOffline,
  getOfflineEmployees,
  deleteOfflineEmployee
} from "../utils/idb";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        
        // Check if this is a local ID (offline employee)
        if (id && id.startsWith('local-')) {
          const offlineEmployees = await getOfflineEmployees();
          const localEmployee = offlineEmployees.find(emp => 
            emp.localId === id || `local-${offlineEmployees.indexOf(emp)}` === id
          );
          
          if (localEmployee) {
            setEmp(localEmployee);
          } else {
            toast.error("Offline employee not found");
          }
        } else {
          // Fetch online employee
          const { data } = await getEmployee(id);
          setEmp(data);
        }
      } catch (err) {
        console.error("Failed to fetch employee:", err);
        toast.error("Failed to load employee details");
      } finally {
        setLoading(false);
      }
    };
    
    if (id && id !== 'undefined') {
      fetchEmployee();
    } else {
      setLoading(false);
      toast.error("Invalid employee ID");
    }

    // Handle online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Back online!");
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning("You're offline. Changes will be saved locally.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [id]);

  const getImageUrl = (employee) => {
    // Handle offline images
    if (employee?.profile_image?.data && employee?.profile_image?.type) {
      try {
        const blob = new Blob([new Uint8Array(employee.profile_image.data)], {
          type: employee.profile_image.type
        });
        return URL.createObjectURL(blob);
      } catch (err) {
        console.error("Error creating blob URL:", err);
        return null;
      }
    }
    
    // Handle online images
    if (typeof employee?.profile_image === "string" && employee.profile_image) {
      return `http://localhost:5000/uploads/${employee.profile_image}`;
    }
    
    if (employee?.image_url) {
      return employee.image_url;
    }
    
    return null;
  };

  const saveOffline = async (formData, action) => {
    try {
      const plain = { offlineAction: action };
      for (let [k, v] of formData.entries()) {
        if (k === "profile_image" && v instanceof File) {
          const buffer = await v.arrayBuffer();
          plain[k] = { data: Array.from(new Uint8Array(buffer)), type: v.type };
          plain.imageName = v.name;
        } else {
          plain[k] = v;
        }
      }
      
      // Add the employee ID for updates
      if (action === 'edit' && emp.id) {
        plain.id = emp.id;
      }
      
      await saveEmployeeOffline(plain, action);
      toast.success(`Employee ${action === 'edit' ? 'updated' : 'deleted'} offline`);
    } catch (err) {
      console.error("Offline save error:", err);
      throw err;
    }
  };

  const handleEdit = () => {
    if (!isOnline && !emp.localId) {
      toast.warning("Cannot edit online employee while offline");
      return;
    }
    setShowEditModal(true);
  };

  const handleDelete = () => {
    if (!isOnline && !emp.localId) {
      toast.warning("Cannot delete online employee while offline");
      return;
    }
    setShowDeleteModal(true);
  };

  const handleSaveEdit = async (formData) => {
    try {
      setUpdating(true);
      
      if (emp.localId) {
        // Update offline employee
        const plain = { offlineAction: 'edit' };
        for (let [k, v] of formData.entries()) {
          if (k === "profile_image" && v instanceof File) {
            const buffer = await v.arrayBuffer();
            plain[k] = { data: Array.from(new Uint8Array(buffer)), type: v.type };
            plain.imageName = v.name;
          } else {
            plain[k] = v;
          }
        }
        
        // Keep the original localId and other metadata
        plain.localId = emp.localId;
        plain.timestamp = emp.timestamp;
        
        // Save the updated offline employee
        await saveEmployeeOffline(plain, 'edit');
        
        // Update local state
        setEmp({ ...emp, ...plain });
        toast.success("Offline employee updated successfully");
        
      } else if (isOnline) {
        // Online update
        await updateEmployee(emp.id, formData);
        toast.success("Employee updated successfully");
        
        // Refresh employee data
        const { data } = await getEmployee(id);
        setEmp(data);
      } else {
        // Offline update for online employee
        formData.append("id", emp.id);
        await saveOffline(formData, "edit");
      }
      
      setShowEditModal(false);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update employee");
    } finally {
      setUpdating(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      
      if (emp.localId) {
        // Delete offline employee immediately
        await deleteOfflineEmployee(emp.localId);
        toast.success("Offline employee deleted");
        navigate("/");
      } else if (isOnline) {
        // Online delete
        await deleteEmployee(emp.id);
        toast.success("Employee deleted successfully");
        navigate("/");
      } else {
        // Mark for offline deletion
        const formData = new FormData();
        Object.entries(emp).forEach(([k, v]) => {
          if (v !== null && v !== undefined) {
            formData.append(k, v);
          }
        });
        formData.append("id", emp.id);
        await saveOffline(formData, "delete");
        navigate("/");
      }
      
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete employee");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '50vh',
        mt: 4 
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading employee details...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!emp) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6">
            Employee not found
          </Typography>
          <Typography variant="body2">
            The requested employee could not be found or may have been deleted.
          </Typography>
        </Alert>
        
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          variant="contained"
          size="large"
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  const imageUrl = getImageUrl(emp);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        mb: 3,
        flexWrap: "wrap",
        gap: 2
      }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          variant="outlined"
          size="large"
        >
          Back to Home
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            icon={isOnline ? <OnlineIcon /> : <OfflineIcon />}
            label={isOnline ? "Online" : "Offline"}
            color={isOnline ? "success" : "error"}
            variant="filled"
          />
          
          {emp.localId && (
            <Chip
              label="Offline Data"
              color="warning"
              variant="filled"
            />
          )}
        </Box>
      </Box>

      {/* Offline Alert */}
      {!isOnline && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            You are currently offline. Changes will be saved locally and synced when you're back online.
          </Typography>
        </Alert>
      )}

      {/* Main Content */}
      <Card sx={{ 
        boxShadow: 4,
        borderRadius: 3,
        overflow: 'hidden'
      }}>
        {/* Profile Header */}
        <Box sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          p: 4,
          textAlign: 'center',
          position: 'relative'
        }}>
          <Avatar
            src={imageUrl}
            alt={`${emp.first_name} ${emp.last_name}`}
            sx={{
              width: 140,
              height: 140,
              margin: '0 auto 2rem',
              border: '4px solid white',
              boxShadow: 4
            }}
          >
            {!imageUrl && <PersonIcon sx={{ fontSize: 60 }} />}
          </Avatar>
          
          <Typography variant="h3" sx={{ 
            fontWeight: 'bold',
            mb: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            {emp.first_name} {emp.last_name}
          </Typography>
          
          <Chip
            icon={<BadgeIcon />}
            label={emp.department}
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              height: 40
            }}
          />
        </Box>
        
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom color="primary" sx={{ 
            mb: 3,
            fontWeight: 'bold',
            borderBottom: '2px solid',
            borderColor: 'primary.light',
            pb: 1
          }}>
            Employee Information
          </Typography>
          
          {/* Information Grid */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3
          }}>
            {/* Personal Information */}
            <Paper elevation={2} sx={{ 
              p: 3,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #f8f9ff 30%, #e8f2ff 90%)'
            }}>
              <Typography variant="h6" color="primary" sx={{ 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <PersonIcon />
                Personal Details
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <GenderIcon color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Gender
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {emp.gender}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <AgeIcon color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Age
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {emp.age} years old
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CityIcon color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {emp.city}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Work Information */}
            <Paper elevation={2} sx={{ 
              p: 3,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #fff8f0 30%, #fff0e0 90%)'
            }}>
              <Typography variant="h6" color="primary" sx={{ 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <BusinessIcon />
                Work Details
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <BadgeIcon color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Department
                    </Typography>
                    <Chip 
                      label={emp.department}
                      color="primary"
                      variant="outlined"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PhoneIcon color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Mobile Number
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      +91 {emp.mobile}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: 2,
            mt: 4,
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
            flexWrap: 'wrap'
          }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              disabled={updating}
              size="large"
              sx={{ minWidth: 150 }}
            >
              {updating ? "Updating..." : "Edit Employee"}
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              disabled={deleting}
              size="large"
              sx={{ minWidth: 150 }}
            >
              {deleting ? "Deleting..." : "Delete Employee"}
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/")}
              size="large"
              sx={{ minWidth: 150 }}
            >
              Back to List
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <EmployeeFormModal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
        }}
        onSave={handleSaveEdit}
        initialData={emp}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        title="Delete Employee"
        message={`Are you sure you want to delete ${emp.first_name} ${emp.last_name}? This action cannot be undone.`}
      />
    </Container>
  );
}