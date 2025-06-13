import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Alert,
  Paper,
  Avatar,
  Tooltip,
  IconButton,
  CircularProgress,
  Badge,
  Card,
  CardContent,
  Grid
} from "@mui/material";
import {
  Add as AddIcon,
  Sync as SyncIcon,
  Wifi as OnlineIcon,
  CloudOff as OfflineIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Refresh as RefreshIcon,
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  CloudSync as CloudSyncIcon
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import {
  getEmployees,
  deleteEmployee,
  addEmployee,
  updateEmployee
} from "../api";
import {
  saveEmployeeOffline,
  getOfflineEmployees,
  deleteOfflineEmployee
} from "../utils/idb";

import EmployeeFormModal from "../components/EmployeeFormModal";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";

export default function HomePage() {
  const [employees, setEmployees] = useState([]);
  const [offlineEmployees, setOfflineEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncing, setSyncing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const navigate = useNavigate();

  const fetchEmployees = useCallback(async (showRefreshIndicator = false) => {
    if (!isOnline) return;
    
    try {
      if (showRefreshIndicator) setRefreshing(true);
      else setLoading(true);
      
      const { data } = await getEmployees();
      setEmployees(data);
      
      if (showRefreshIndicator) {
        toast.success("Employee data refreshed successfully");
      }
    } catch (err) {
      toast.error("Failed to fetch employees from server");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [isOnline]);

  const loadOfflineEmployees = useCallback(async () => {
    try {
      const offline = await getOfflineEmployees();
      setOfflineEmployees(offline);
    } catch (err) {
      console.error("Error loading offline employees:", err);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
    loadOfflineEmployees();
    
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Back online! You can now sync your data.");
      fetchEmployees(true);
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
  }, [fetchEmployees, loadOfflineEmployees]);

  const handleSync = async () => {
    if (!isOnline) {
      toast.warning("Cannot sync while offline");
      return;
    }
    
    setSyncing(true);
    try {
      const offlineData = await getOfflineEmployees();
      
      if (offlineData.length === 0) {
        toast.info("No offline data to sync");
        return;
      }

      let syncedCount = 0;
      let errorCount = 0;

      for (const emp of offlineData) {
        try {
          await syncSingleEmployee(emp);
          await deleteOfflineEmployee(emp.localId);
          syncedCount++;
        } catch (syncError) {
          console.error(`Failed to sync employee ${emp.first_name} ${emp.last_name}:`, syncError);
          errorCount++;
        }
      }
      
      if (syncedCount > 0) {
        toast.success(`Successfully synced ${syncedCount} employee(s)${errorCount > 0 ? ` (${errorCount} failed)` : ''}`);
        setLastSyncTime(new Date());
        await loadOfflineEmployees();
        await fetchEmployees();
      } else if (errorCount > 0) {
        toast.error(`Failed to sync ${errorCount} employee(s)`);
      }
      
    } catch (err) {
      console.error("Sync error:", err);
      toast.error("Sync operation failed");
    } finally {
      setSyncing(false);
    }
  };

  const syncSingleEmployee = async (emp) => {
    const formData = createFormDataFromEmployee(emp);
    
    switch (emp.offlineAction) {
      case "add":
        await addEmployee(formData);
        break;
      case "edit":
        await updateEmployee(emp.id, formData);
        break;
      case "delete":
        await deleteEmployee(emp.id);
        break;
      default:
        throw new Error(`Unknown offline action: ${emp.offlineAction}`);
    }
  };

  const createFormDataFromEmployee = (emp) => {
    const formData = new FormData();
    
    Object.entries(emp).forEach(([key, val]) => {
      if (["localId", "offlineAction", "timestamp"].includes(key)) {
        return; // Skip these fields
      }
      
      if (key === "profile_image" && val?.data) {
        // Handle offline image data
        const blob = new Blob([new Uint8Array(val.data)], {
          type: val.type || "image/jpeg"
        });
        formData.append(key, blob, emp.imageName || "image.jpg");
      } else if (val !== null && val !== undefined && val !== '') {
        formData.append(key, val.toString());
      }
    });
    
    return formData;
  };

  const handleSave = async (formData) => {
    try {
      if (selectedEmp) {
        // Update existing employee
        if (isOnline && !selectedEmp.localId) {
          await updateEmployee(selectedEmp.id, formData);
          toast.success("Employee updated successfully");
          await fetchEmployees();
        } else {
          await saveOffline(formData, "edit", selectedEmp);
        }
      } else {
        // Add new employee
        if (isOnline) {
          await addEmployee(formData);
          toast.success("Employee added successfully");
          await fetchEmployees();
        } else {
          await saveOffline(formData, "add");
        }
      }
      setShowForm(false);
      setSelectedEmp(null);
    } catch (err) {
      console.error("Save error:", err);
      toast.error(selectedEmp ? "Failed to update employee" : "Failed to add employee");
    }
  };

  const saveOffline = async (formData, action, existingEmployee = null) => {
    try {
      const employeeData = { 
        offlineAction: action,
        timestamp: new Date().toISOString()
      };
      
      // Convert FormData to plain object
      for (let [key, value] of formData.entries()) {
        if (key === "profile_image" && value instanceof File) {
          const buffer = await value.arrayBuffer();
          employeeData[key] = { 
            data: Array.from(new Uint8Array(buffer)), 
            type: value.type,
            name: value.name
          };
          employeeData.imageName = value.name;
        } else {
          employeeData[key] = value;
        }
      }
      
      // Preserve existing employee data for edits
      if (action === 'edit' && existingEmployee) {
        if (existingEmployee.localId) {
          employeeData.localId = existingEmployee.localId;
        } else {
          employeeData.id = existingEmployee.id;
        }
      }
      
      await saveEmployeeOffline(employeeData);
      await loadOfflineEmployees();
      
      const actionText = action === 'add' ? 'added' : 'updated';
      toast.success(`Employee ${actionText} offline - will sync when back online`);
    } catch (err) {
      console.error("Offline save error:", err);
      throw err;
    }
  };

  const handleDelete = async () => {
    try {
      const employeeToDelete = [...employees, ...offlineEmployees]
        .find(e => (e.id === deleteId) || (e.localId === deleteId));
      
      if (!employeeToDelete) {
        toast.error("Employee not found");
        return;
      }

      if (employeeToDelete.localId) {
        // Delete offline employee immediately
        await deleteOfflineEmployee(employeeToDelete.localId);
        await loadOfflineEmployees();
        toast.success("Offline employee deleted");
      } else if (!isOnline) {
        // Mark online employee for offline deletion
        const deleteData = {
          ...employeeToDelete,
          offlineAction: "delete",
          timestamp: new Date().toISOString()
        };
        await saveEmployeeOffline(deleteData);
        toast.success("Employee marked for deletion - will sync when back online");
      } else {
        // Delete online employee immediately
        await deleteEmployee(deleteId);
        toast.success("Employee deleted successfully");
        await fetchEmployees();
      }
      
      setShowDelete(false);
      setDeleteId(null);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete employee");
    }
  };

  const handleEdit = (employee) => {
    if (!isOnline && !employee.localId) {
      toast.warning("Cannot edit online employee while offline");
      return;
    }
    setSelectedEmp(employee);
    setShowForm(true);
  };

  const handleDeleteClick = (employee) => {
    setDeleteId(employee.id || employee.localId);
    setShowDelete(true);
  };

  const handleViewDetails = (employee) => {
    if (employee.localId) {
      toast.info("Offline employees don't have detail pages yet");
      return;
    }
    navigate(`/employee/${employee.id}`);
  };

  const getImageUrl = (row) => {
    // Handle offline images
    if (row.profile_image?.data && row.profile_image?.type) {
      try {
        const blob = new Blob([new Uint8Array(row.profile_image.data)], {
          type: row.profile_image.type
        });
        return URL.createObjectURL(blob);
      } catch (err) {
        console.error("Error creating blob URL:", err);
        return null;
      }
    }
    
    // Handle online images
    if (typeof row.profile_image === "string" && row.profile_image) {
      return `http://localhost:5000/uploads/${row.profile_image}`;
    }
    
    return row.image_url || null;
  };

  const columns = [
    {
      field: "profile",
      headerName: "Image",
      width: 80,
      renderCell: ({ row }) => {
        const imageUrl = getImageUrl(row);
        return (
          <Avatar
            src={imageUrl}
            alt={`${row.first_name} ${row.last_name}`}
            sx={{
              width: 50,
              height: 50,
              border: '2px solid',
              borderColor: row.localId ? 'warning.main' : 'primary.light',
            }}
          >
            {!imageUrl && <PersonIcon />}
          </Avatar>
        );
      }
    },
    { 
      field: "first_name", 
      headerName: "First Name", 
      flex: 1,
      minWidth: 120,
      renderCell: ({ value, row }) => (
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: row.localId ? 'bold' : 'normal',
            color: row.localId ? 'warning.main' : 'inherit'
          }}
        >
          {value}
        </Typography>
      )
    },
    { 
      field: "last_name", 
      headerName: "Last Name", 
      flex: 1,
      minWidth: 120,
      renderCell: ({ value, row }) => (
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: row.localId ? 'bold' : 'normal',
            color: row.localId ? 'warning.main' : 'inherit'
          }}
        >
          {value}
        </Typography>
      )
    },
    { 
      field: "department", 
      headerName: "Department", 
      flex: 1,
      minWidth: 100,
      renderCell: ({ value, row }) => (
        <Chip 
          label={value} 
          size="small" 
          variant={row.localId ? "filled" : "outlined"}
          color={row.localId ? "warning" : "default"}
        />
      )
    },
    { 
      field: "city", 
      headerName: "City", 
      flex: 1,
      minWidth: 100
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
      minWidth: 120,
      renderCell: ({ value }) => (
        <Typography variant="body2">
          {value ? `+91 ${value}` : 'N/A'}
        </Typography>
      )
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: ({ row }) => {
        const isOffline = !!row.localId;
        const actionType = row.offlineAction;
        
        let label = isOffline ? "Offline" : "Online";
        let color = isOffline ? "warning" : "success";
        
        if (actionType) {
          label = actionType === 'add' ? 'New' : 
                  actionType === 'edit' ? 'Modified' : 
                  actionType === 'delete' ? 'Deleted' : label;
          color = actionType === 'delete' ? 'error' : color;
        }
        
        return (
          <Chip
            label={label}
            size="small"
            color={color}
            variant="filled"
          />
        );
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="View Details">
            <IconButton 
              color="info" 
              size="small"
              onClick={() => handleViewDetails(row)}
              disabled={!!row.localId}
            >
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Edit Employee">
            <IconButton
              color="warning"
              size="small"
              onClick={() => handleEdit(row)}
              disabled={!isOnline && !row.localId}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Delete Employee">
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDeleteClick(row)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  const allEmployees = [
    ...employees,
    ...offlineEmployees.map((e, i) => ({ 
      ...e, 
      id: e.id || e.localId || `local-${i}`,
      isOffline: true
    }))
  ];

  // Calculate statistics
  const stats = {
    total: allEmployees.length,
    online: employees.length,
    offline: offlineEmployees.length,
    pending: offlineEmployees.filter(e => e.offlineAction === 'add').length,
    modified: offlineEmployees.filter(e => e.offlineAction === 'edit').length,
    toDelete: offlineEmployees.filter(e => e.offlineAction === 'delete').length
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, pb: 4 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        mb: 3,
        flexWrap: "wrap",
        gap: 2
      }}>
        <Box>
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <DashboardIcon fontSize="large" />
            Employee Manager
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Progressive Web Application
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Chip
            icon={isOnline ? <OnlineIcon /> : <OfflineIcon />}
            label={isOnline ? "Online" : "Offline"}
            color={isOnline ? "success" : "error"}
            variant="filled"
          />
          
          {isOnline && (
            <Tooltip title="Refresh Data">
              <IconButton
                color="primary"
                onClick={() => fetchEmployees(true)}
                disabled={refreshing}
              >
                {refreshing ? <CircularProgress size={20} /> : <RefreshIcon />}
              </IconButton>
            </Tooltip>
          )}
          
          {isOnline && offlineEmployees.length > 0 && (
            <Badge badgeContent={offlineEmployees.length} color="warning">
              <Button
                variant="outlined"
                startIcon={syncing ? <CircularProgress size={18} /> : <CloudSyncIcon />}
                onClick={handleSync}
                disabled={syncing}
                color="warning"
              >
                {syncing ? "Syncing..." : "Sync Data"}
              </Button>
            </Badge>
          )}
          
          <Button 
            startIcon={<AddIcon />} 
            onClick={() => setShowForm(true)} 
            variant="contained"
            size="large"
          >
            Add Employee
          </Button>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <GroupIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {stats.total}
              </Typography>
              <Typography variant="body2">
                Total Employees
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <OnlineIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {stats.online}
              </Typography>
              <Typography variant="body2">
                Online Records
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'warning.light', color: 'warning.contrastText' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <OfflineIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {stats.offline}
              </Typography>
              <Typography variant="body2">
                Pending Sync
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'info.light', color: 'info.contrastText' }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <SyncIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {lastSyncTime ? 'Synced' : 'Never'}
              </Typography>
              <Typography variant="body2">
                {lastSyncTime ? lastSyncTime.toLocaleTimeString() : 'Last Sync'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Status Alerts */}
      {!isOnline && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Offline Mode:</strong> All changes will be saved locally and synced when you're back online.
            {stats.offline > 0 && ` You have ${stats.offline} pending changes.`}
          </Typography>
        </Alert>
      )}

      {offlineEmployees.length > 0 && isOnline && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Sync Available:</strong> You have {stats.pending} new, {stats.modified} modified, 
            and {stats.toDelete} deleted employee(s) waiting to be synced.
          </Typography>
        </Alert>
      )}

      {/* Data Grid */}
      <Paper sx={{ 
        height: 600, 
        width: '100%',
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden'
      }}>
        <DataGrid
          rows={allEmployees}
          columns={columns}
          getRowId={(row) => row.id || row.localId || Math.random()}
          disableRowSelectionOnClick
          loading={loading}
          pageSizeOptions={[10, 25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          sx={{
            '& .MuiDataGrid-cell': {
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiDataGrid-row:hover': {
              bgcolor: 'action.hover',
            },
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              fontWeight: 'bold',
            },
          }}
          slots={{
            noRowsOverlay: () => (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                gap: 2
              }}>
                <PersonIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
                <Typography variant="h6" color="text.secondary">
                  No employees found
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setShowForm(true)}
                >
                  Add First Employee
                </Button>
              </Box>
            )
          }}
        />
      </Paper>

      {/* Modals */}
      <EmployeeFormModal
        show={showForm}
        onHide={() => {
          setShowForm(false);
          setSelectedEmp(null);
        }}
        onSave={handleSave}
        initialData={selectedEmp}
      />

      <ConfirmModal
        show={showDelete}
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDelete(false);
          setDeleteId(null);
        }}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
      />
    </Container>
  );
}