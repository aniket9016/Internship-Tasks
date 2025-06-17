import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Divider,
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
  CloudSync as CloudSyncIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import {
  getEmployees,
  deleteEmployee,
  addEmployee,
  updateEmployee,
} from "../api";
import {
  saveEmployeeOffline,
  getOfflineEmployees,
  deleteOfflineEmployee,
} from "../utils/idb";

import EmployeeFormModal from "../components/EmployeeFormModal";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";

import NotificationButton from "../components/NotificationButton";


// Local storage keys
const STORAGE_KEYS = {
  SEARCH_TERM: "employee_search_term",
  DEPARTMENT_FILTER: "employee_department_filter",
  CITY_FILTER: "employee_city_filter",
  STATUS_FILTER: "employee_status_filter",
  FILTERS_EXPANDED: "employee_filters_expanded",
};

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

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const navigate = useNavigate();

  // Load saved search/filter data from localStorage on component mount
  useEffect(() => {
    const savedSearchTerm =
      localStorage.getItem(STORAGE_KEYS.SEARCH_TERM) || "";
    const savedDepartmentFilter =
      localStorage.getItem(STORAGE_KEYS.DEPARTMENT_FILTER) || "";
    const savedCityFilter =
      localStorage.getItem(STORAGE_KEYS.CITY_FILTER) || "";
    const savedStatusFilter =
      localStorage.getItem(STORAGE_KEYS.STATUS_FILTER) || "";
    const savedFiltersExpanded =
      localStorage.getItem(STORAGE_KEYS.FILTERS_EXPANDED) === "true";

    setSearchTerm(savedSearchTerm);
    setDepartmentFilter(savedDepartmentFilter);
    setCityFilter(savedCityFilter);
    setStatusFilter(savedStatusFilter);
    setFiltersExpanded(savedFiltersExpanded);
  }, []);

  // Save search/filter data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEARCH_TERM, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEPARTMENT_FILTER, departmentFilter);
  }, [departmentFilter]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CITY_FILTER, cityFilter);
  }, [cityFilter]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATUS_FILTER, statusFilter);
  }, [statusFilter]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.FILTERS_EXPANDED,
      filtersExpanded.toString()
    );
  }, [filtersExpanded]);

  const fetchEmployees = useCallback(
    async (showRefreshIndicator = false) => {
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
    },
    [isOnline]
  );

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

  // Combine all employees data
  const allEmployees = useMemo(
    () => [
      ...employees,
      ...offlineEmployees.map((e, i) => ({
        ...e,
        id: e.id || e.localId || `local-${i}`,
        isOffline: true,
      })),
    ],
    [employees, offlineEmployees]
  );

  // Get unique filter options
  const filterOptions = useMemo(() => {
    const departments = [
      ...new Set(allEmployees.map((e) => e.department).filter(Boolean)),
    ];
    const cities = [
      ...new Set(allEmployees.map((e) => e.city).filter(Boolean)),
    ];

    return {
      departments: departments.sort(),
      cities: cities.sort(),
      statuses: [
        { value: "online", label: "Online" },
        { value: "offline", label: "Offline" },
        { value: "new", label: "New (Pending)" },
        { value: "modified", label: "Modified" },
        { value: "deleted", label: "To Delete" },
      ],
    };
  }, [allEmployees]);

  // Filter and search employees
  const filteredEmployees = useMemo(() => {
    let filtered = [...allEmployees];

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (emp) =>
          emp.first_name?.toLowerCase().includes(search) ||
          emp.last_name?.toLowerCase().includes(search) ||
          emp.department?.toLowerCase().includes(search) ||
          emp.city?.toLowerCase().includes(search) ||
          emp.mobile?.includes(search) ||
          emp.email?.toLowerCase().includes(search)
      );
    }

    // Apply department filter
    if (departmentFilter) {
      filtered = filtered.filter((emp) => emp.department === departmentFilter);
    }

    // Apply city filter
    if (cityFilter) {
      filtered = filtered.filter((emp) => emp.city === cityFilter);
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((emp) => {
        const isOffline = !!emp.localId;
        const actionType = emp.offlineAction;

        switch (statusFilter) {
          case "online":
            return !isOffline;
          case "offline":
            return isOffline;
          case "new":
            return actionType === "add";
          case "modified":
            return actionType === "edit";
          case "deleted":
            return actionType === "delete";
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [allEmployees, searchTerm, departmentFilter, cityFilter, statusFilter]);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("");
    setCityFilter("");
    setStatusFilter("");

    // Clear from localStorage
    Object.values(STORAGE_KEYS).forEach((key) => {
      if (key !== STORAGE_KEYS.FILTERS_EXPANDED) {
        localStorage.removeItem(key);
      }
    });

    toast.success("All filters cleared");
  };

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm.trim()) count++;
    if (departmentFilter) count++;
    if (cityFilter) count++;
    if (statusFilter) count++;
    return count;
  }, [searchTerm, departmentFilter, cityFilter, statusFilter]);

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
          console.error(
            `Failed to sync employee ${emp.first_name} ${emp.last_name}:`,
            syncError
          );
          errorCount++;
        }
      }

      if (syncedCount > 0) {
        toast.success(
          `Successfully synced ${syncedCount} employee(s)${
            errorCount > 0 ? ` (${errorCount} failed)` : ""
          }`
        );
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
          type: val.type || "image/jpeg",
        });
        formData.append(key, blob, emp.imageName || "image.jpg");
      } else if (val !== null && val !== undefined && val !== "") {
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
      toast.error(
        selectedEmp ? "Failed to update employee" : "Failed to add employee"
      );
    }
  };

  const saveOffline = async (formData, action, existingEmployee = null) => {
    try {
      const employeeData = {
        offlineAction: action,
        timestamp: new Date().toISOString(),
      };

      // Convert FormData to plain object
      for (let [key, value] of formData.entries()) {
        if (key === "profile_image" && value instanceof File) {
          const buffer = await value.arrayBuffer();
          employeeData[key] = {
            data: Array.from(new Uint8Array(buffer)),
            type: value.type,
            name: value.name,
          };
          employeeData.imageName = value.name;
        } else {
          employeeData[key] = value;
        }
      }

      // Preserve existing employee data for edits
      if (action === "edit" && existingEmployee) {
        if (existingEmployee.localId) {
          employeeData.localId = existingEmployee.localId;
        } else {
          employeeData.id = existingEmployee.id;
        }
      }

      await saveEmployeeOffline(employeeData);
      await loadOfflineEmployees();

      const actionText = action === "add" ? "added" : "updated";
      toast.success(
        `Employee ${actionText} offline - will sync when back online`
      );
    } catch (err) {
      console.error("Offline save error:", err);
      throw err;
    }
  };

  const handleDelete = async () => {
    try {
      const employeeToDelete = [...employees, ...offlineEmployees].find(
        (e) => e.id === deleteId || e.localId === deleteId
      );

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
          timestamp: new Date().toISOString(),
        };
        await saveEmployeeOffline(deleteData);
        toast.success(
          "Employee marked for deletion - will sync when back online"
        );
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
          type: row.profile_image.type,
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
              border: "2px solid",
              borderColor: row.localId ? "warning.main" : "primary.light",
            }}
          >
            {!imageUrl && <PersonIcon />}
          </Avatar>
        );
      },
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
            fontWeight: row.localId ? "bold" : "normal",
            color: row.localId ? "warning.main" : "inherit",
          }}
        >
          {value}
        </Typography>
      ),
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
            fontWeight: row.localId ? "bold" : "normal",
            color: row.localId ? "warning.main" : "inherit",
          }}
        >
          {value}
        </Typography>
      ),
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
      ),
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
      minWidth: 120,
      renderCell: ({ value }) => (
        <Typography variant="body2">
          {value ? `+91 ${value}` : "N/A"}
        </Typography>
      ),
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
          label =
            actionType === "add"
              ? "New"
              : actionType === "edit"
              ? "Modified"
              : actionType === "delete"
              ? "Deleted"
              : label;
          color = actionType === "delete" ? "error" : color;
        }

        return (
          <Chip label={label} size="small" color={color} variant="filled" />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 0.5 }}>
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
      ),
    },
  ];

  // Calculate statistics
  const stats = {
    total: allEmployees.length,
    filtered: filteredEmployees.length,
    online: employees.length,
    offline: offlineEmployees.length,
    pending: offlineEmployees.filter((e) => e.offlineAction === "add").length,
    modified: offlineEmployees.filter((e) => e.offlineAction === "edit").length,
    toDelete: offlineEmployees.filter((e) => e.offlineAction === "delete")
      .length,
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, pb: 4 }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <DashboardIcon fontSize="large" />
              Employee Manager
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Progressive Web Application
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
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
                  {refreshing ? (
                    <CircularProgress size={20} />
                  ) : (
                    <RefreshIcon />
                  )}
                </IconButton>
              </Tooltip>
            )}

            {isOnline && offlineEmployees.length > 0 && (
              <Badge badgeContent={offlineEmployees.length} color="warning">
                <Button
                  variant="outlined"
                  startIcon={
                    syncing ? <CircularProgress size={18} /> : <CloudSyncIcon />
                  }
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
            <Card
              sx={{ bgcolor: "primary.light", color: "primary.contrastText" }}
            >
              <CardContent sx={{ textAlign: "center", py: 2 }}>
                <GroupIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {stats.total}
                </Typography>
                <Typography variant="body2">Total Employees</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "info.light", color: "info.contrastText" }}>
              <CardContent sx={{ textAlign: "center", py: 2 }}>
                <SearchIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {stats.filtered}
                </Typography>
                <Typography variant="body2">Filtered Results</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{ bgcolor: "success.light", color: "success.contrastText" }}
            >
              <CardContent sx={{ textAlign: "center", py: 2 }}>
                <OnlineIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {stats.online}
                </Typography>
                <Typography variant="body2">Online Records</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{ bgcolor: "warning.light", color: "warning.contrastText" }}
            >
              <CardContent sx={{ textAlign: "center", py: 2 }}>
                <OfflineIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {stats.offline}
                </Typography>
                <Typography variant="body2">Pending Sync</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filter Section */}
        <Paper sx={{ mb: 3, p: 3, borderRadius: 2, bgcolor: "#fafafa" }}>
          {/* Main Search Bar */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search employees by name, department, city, mobile, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(0,0,0,0.6)" }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearchTerm("")}
                      sx={{ color: "rgba(0,0,0,0.6)" }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "white",
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                  "& input::placeholder": {
                    color: "rgba(0,0,0,0.7)",
                  },
                },
              }}
              variant="outlined"
              size="medium"
            />
          </Box>

          {/* Advanced Filters */}
          <Accordion
            expanded={filtersExpanded}
            onChange={() => setFiltersExpanded(!filtersExpanded)}
            sx={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              "&:before": { display: "none" },
              borderRadius: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                bgcolor: "grey.100",
                borderRadius: "4px 4px 0 0",
                minHeight: 56,
                border: "1px solid grey",
                "&.Mui-expanded": {
                  minHeight: 56,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Badge badgeContent={activeFiltersCount} color="primary">
                  <FilterIcon
                    sx={{
                      color: activeFiltersCount > 0 ? "black" : "grey.600",
                    }}
                  />
                </Badge>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "rgba(0,0,0,0.8)", fontWeight: 500 }}
                >
                  Advanced Filters
                </Typography>
                {activeFiltersCount > 0 && (
                  <Button
                    size="small"
                    startIcon={<ClearIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      clearAllFilters();
                    }}
                    sx={{
                      ml: "auto",
                      color: "rgba(0,0,0,0.6)",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.08)" },
                    }}
                  >
                    Clear All
                  </Button>
                )}
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "white", pt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      label="Department"
                      sx={{
                        bgcolor: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(0,0,0,0.3)",
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>All Departments</em>
                      </MenuItem>
                      {filterOptions.departments.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>City</InputLabel>
                    <Select
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      label="City"
                      sx={{
                        bgcolor: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(0,0,0,0.3)",
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>All Cities</em>
                      </MenuItem>
                      {filterOptions.cities.map((city) => (
                        <MenuItem key={city} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      label="Status"
                      sx={{
                        bgcolor: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(0,0,0,0.3)",
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>All Status</em>
                      </MenuItem>
                      {filterOptions.statuses.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                          {status.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Active Filters Display */}
              {activeFiltersCount > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, color: "rgba(0,0,0,0.7)" }}
                  >
                    Active Filters:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {searchTerm && (
                      <Chip
                        label={`Search: "${searchTerm}"`}
                        onDelete={() => setSearchTerm("")}
                        size="small"
                        sx={{
                          bgcolor: "rgba(0,0,0,0.08)",
                          color: "rgba(0,0,0,0.8)",
                        }}
                      />
                    )}
                    {departmentFilter && (
                      <Chip
                        label={`Department: ${departmentFilter}`}
                        onDelete={() => setDepartmentFilter("")}
                        size="small"
                        sx={{
                          bgcolor: "rgba(0,0,0,0.08)",
                          color: "rgba(0,0,0,0.8)",
                        }}
                      />
                    )}
                    {cityFilter && (
                      <Chip
                        label={`City: ${cityFilter}`}
                        onDelete={() => setCityFilter("")}
                        size="small"
                        sx={{
                          bgcolor: "rgba(0,0,0,0.08)",
                          color: "rgba(0,0,0,0.8)",
                        }}
                      />
                    )}
                    {statusFilter && (
                      <Chip
                        label={`Status: ${
                          filterOptions.statuses.find(
                            (s) => s.value === statusFilter
                          )?.label
                        }`}
                        onDelete={() => setStatusFilter("")}
                        size="small"
                        sx={{
                          bgcolor: "rgba(0,0,0,0.08)",
                          color: "rgba(0,0,0,0.8)",
                        }}
                      />
                    )}
                  </Stack>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        </Paper>

        {/* Status Alerts */}
        {!isOnline && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Offline Mode:</strong> All changes will be saved locally
              and synced when you're back online.
              {stats.offline > 0 &&
                ` You have ${stats.offline} pending changes.`}
            </Typography>
          </Alert>
        )}

        {offlineEmployees.length > 0 && isOnline && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Sync Available:</strong> You have {stats.pending} new,{" "}
              {stats.modified} modified, and {stats.toDelete} deleted
              employee(s) waiting to be synced.
            </Typography>
          </Alert>
        )}

        {/* Results Info */}
        {activeFiltersCount > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {stats.filtered} of {stats.total} employees
              {stats.filtered !== stats.total && " (filtered)"}
            </Typography>
          </Box>
        )}

        {/* Data Grid */}
        <Paper
          sx={{
            height: 600,
            width: "100%",
            boxShadow: 3,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <DataGrid
            rows={filteredEmployees}
            columns={columns}
            getRowId={(row) => row.id || row.localId || Math.random()}
            disableRowSelectionOnClick
            disableColumnFilter
            loading={loading}
            pageSizeOptions={[10, 25, 50, 100]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            sx={{
              "& .MuiDataGrid-cell": {
                display: "flex",
                alignItems: "center",
              },
              "& .MuiDataGrid-row:hover": {
                bgcolor: "action.hover",
              },
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "primary.light",
                color: "primary.contrastText",
                fontWeight: "bold",
              },
            }}
            slots={{
              noRowsOverlay: () => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    gap: 2,
                  }}
                >
                  <PersonIcon sx={{ fontSize: 60, color: "text.secondary" }} />
                  <Typography variant="h6" color="text.secondary">
                    {activeFiltersCount > 0
                      ? "No employees match your filters"
                      : "No employees found"}
                  </Typography>
                  {activeFiltersCount > 0 ? (
                    <Button
                      variant="outlined"
                      startIcon={<ClearIcon />}
                      onClick={clearAllFilters}
                    >
                      Clear All Filters
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setShowForm(true)}
                    >
                      Add First Employee
                    </Button>
                  )}
                </Box>
              ),
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
      <NotificationButton />
    </>
  );
}
