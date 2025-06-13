import React, { useEffect, useState } from "react";
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
  CircularProgress
} from "@mui/material";
import {
  Add as AddIcon,
  Sync as SyncIcon,
  Wifi as OnlineIcon,
  CloudOff as OfflineIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
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
  deleteOfflineEmployee,
  clearOfflineEmployees
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
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const { data } = await getEmployees();
      setEmployees(data);
    } catch (err) {
      if (isOnline) toast.error("Failed to fetch employees");
    }
  };

  const loadOfflineEmployees = async () => {
    const offline = await getOfflineEmployees();
    setOfflineEmployees(offline);
  };

  useEffect(() => {
    fetchEmployees();
    loadOfflineEmployees();
    window.addEventListener("online", () => {
      setIsOnline(true);
      handleSync();
    });
    window.addEventListener("offline", () => setIsOnline(false));
    return () => {
      window.removeEventListener("online", handleSync);
      window.removeEventListener("offline", () => {});
    };
  }, []);

  const handleSync = async () => {
    if (!isOnline) return;
    setSyncing(true);
    try {
      const offlineData = await getOfflineEmployees();
      for (const emp of offlineData) {
        const formData = new FormData();
        Object.entries(emp).forEach(([key, val]) => {
          if (key !== "localId" && key !== "offlineAction") {
            if (key === "profile_image" && val?.data) {
              const blob = new Blob([new Uint8Array(val.data)], {
                type: val.type || "image/jpeg"
              });
              formData.append(key, blob, emp.imageName || "image.jpg");
            } else {
              formData.append(key, val);
            }
          }
        });
        if (emp.offlineAction === "add") await addEmployee(formData);
        if (emp.offlineAction === "edit") await updateEmployee(emp.id, formData);
        if (emp.offlineAction === "delete") await deleteEmployee(emp.id);
        toast.success(`Synced: ${emp.first_name} ${emp.last_name}`);
      }
      await clearOfflineEmployees();
      setOfflineEmployees([]);
      fetchEmployees();
    } catch (err) {
      toast.error("Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedEmp) {
        if (isOnline) {
          await updateEmployee(selectedEmp.id, formData);
          toast.success("Updated successfully");
          fetchEmployees();
        } else {
          formData.append("id", selectedEmp.id);
          await saveOffline(formData, "edit");
        }
      } else {
        if (isOnline) {
          await addEmployee(formData);
          toast.success("Added successfully");
          fetchEmployees();
        } else {
          await saveOffline(formData, "add");
        }
      }
      setShowForm(false);
      setSelectedEmp(null);
    } catch (err) {
      toast.error("Save failed");
    }
  };

  const saveOffline = async (formData, action) => {
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
    await saveEmployeeOffline(plain, action);
    loadOfflineEmployees();
    toast.success("Saved offline");
  };

  const handleDelete = async () => {
    try {
      if (!isOnline) {
        const emp = employees.find((e) => e.id === deleteId);
        const formData = new FormData();
        Object.entries(emp).forEach(([k, v]) => formData.append(k, v));
        formData.append("id", emp.id);
        await saveOffline(formData, "delete");
        loadOfflineEmployees();
      } else {
        await deleteEmployee(deleteId);
        fetchEmployees();
      }
      setShowDelete(false);
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const columns = [
    {
      field: "profile",
      headerName: "Image",
      width: 80,
      renderCell: ({ row }) => {
        let url = "https://via.placeholder.com/50";
        if (row.profile_image?.data && row.profile_image?.type) {
          const blob = new Blob([new Uint8Array(row.profile_image.data)], {
            type: row.profile_image.type
          });
          url = URL.createObjectURL(blob);
        } else if (typeof row.profile_image === "string") {
          url = `http://localhost:5000/uploads/${row.profile_image}`;
        }
        return <Avatar src={url} alt={row.first_name} />;
      }
    },
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: ({ row }) => (
        <Box>
          <Tooltip title="View">
            <IconButton color="info" onClick={() => navigate(`/employee/${row.id}`)}>
              <ViewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              color="warning"
              onClick={() => {
                if (!isOnline && !row.localId) return toast.warning("Can't edit online employee offline");
                setSelectedEmp(row);
                setShowForm(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => {
                if (!isOnline && !row.localId) return toast.warning("Can't delete online employee offline");
                if (row.localId) {
                  deleteOfflineEmployee(row.localId).then(() => loadOfflineEmployees());
                } else {
                  setDeleteId(row.id);
                  setShowDelete(true);
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h4">Employee Manager (PWA)</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            icon={isOnline ? <OnlineIcon /> : <OfflineIcon />}
            label={isOnline ? "Online" : "Offline"}
            color={isOnline ? "success" : "error"}
          />
          {isOnline && offlineEmployees.length > 0 && (
            <Button
              variant="outlined"
              startIcon={syncing ? <CircularProgress size={18} /> : <SyncIcon />}
              onClick={handleSync}
              disabled={syncing}
            >
              {syncing ? "Syncing..." : `Sync ${offlineEmployees.length} items`}
            </Button>
          )}
          <Button startIcon={<AddIcon />} onClick={() => setShowForm(true)} variant="contained">
            Add
          </Button>
        </Box>
      </Box>

      {!isOnline && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          You are offline. Changes will sync when back online.
        </Alert>
      )}

      <Paper sx={{ height: 600 }}>
        <DataGrid
          rows={[...employees, ...offlineEmployees.map((e, i) => ({ ...e, id: e.id || `local-${i}` }))]}
          columns={columns}
          getRowId={(row) => row.id || row.localId || row.email || Math.random()}
          disableRowSelectionOnClick
        />
      </Paper>

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
        onCancel={() => setShowDelete(false)}
      />
    </Container>
  );
}
