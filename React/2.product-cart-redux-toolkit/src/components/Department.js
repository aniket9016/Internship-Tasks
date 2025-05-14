import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import {
  AddCircle,
  Edit,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommonModal from "../components/CommonModal";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedDept, setSelectedDept] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const fetchDepartments = useCallback(async () => {
    try {
      const res = await axiosInstance.get("https://localhost:7227/api/Department");
      setDepartments(res.data);
    } catch (error) {
      console.error("Error fetching departments", error);
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const openModal = (type, dept = null) => {
    setModalType(type);
    setSelectedDept(dept);
    setName(dept?.name || "");
    setDescription(dept?.description || "");
    setErrors({});
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType(null);
    setSelectedDept(null);
    setName("");
    setDescription("");
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async () => {
    if (!validate()) return;
    try {
      const res = await axiosInstance.post("https://localhost:7227/api/Department", {
        name,
        description,
      });
      setDepartments([...departments, res.data]);
      toast.success("Department added!");
      closeModal();
    } catch (error) {
      console.error("Error adding department", error);
      toast.error("Failed to add department.");
    }
  };

  const handleUpdate = async () => {
    if (!validate()) return;
    try {
      await axiosInstance.put(`https://localhost:7227/api/Department/${selectedDept.id}`, {
        id: selectedDept.id,
        name,
        description,
      });
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === selectedDept.id ? { ...dept, name, description } : dept
        )
      );
      toast.success("Department updated!");
      closeModal();
    } catch (error) {
      console.error("Error updating department", error);
      toast.error("Failed to update department.");
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`https://localhost:7227/api/Department/${selectedDept.id}`);
      setDepartments((prev) => prev.filter((d) => d.id !== selectedDept.id));
      toast.success("Department deleted!");
      closeModal();
    } catch (error) {
      console.error("Error deleting department", error);
      toast.error("Failed to delete department.");
    }
  };

  const renderModalContent = () => {
    if (modalType === "add" || modalType === "edit") {
      return (
        <Stack spacing={2}>
          <TextField
            label="Department Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
          />
        </Stack>
      );
    }

    if (modalType === "delete") {
      return (
        <Typography>
          Are you sure you want to delete <strong>{selectedDept?.name}</strong>?
        </Typography>
      );
    }

    return null;
  };

  const renderModalFooter = () => {
    if (modalType === "add") {
      return (
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      );
    }

    if (modalType === "edit") {
      return (
        <Button variant="contained" color="warning" onClick={handleUpdate}>
          Update
        </Button>
      );
    }

    if (modalType === "delete") {
      return (
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      );
    }

    return null;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary.dark">
        Department Management
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={() => openModal("add")}
        >
          Add New
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.light" }}>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((dept) => (
              <TableRow key={dept.id} hover>
                <TableCell>{dept.name}</TableCell>
                <TableCell>{dept.description}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      color="primary"
                      onClick={() => openModal("edit", dept)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => openModal("delete", dept)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {departments.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No departments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CommonModal
        show={modalVisible}
        title={
          modalType === "add"
            ? "Add Department"
            : modalType === "edit"
            ? "Edit Department"
            : "Delete Department"
        }
        body={renderModalContent()}
        footer={
          <>
            <Button onClick={closeModal} variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            {renderModalFooter()}
          </>
        }
        onClose={closeModal}
      />
    </Box>
  );
};

export default Department;
