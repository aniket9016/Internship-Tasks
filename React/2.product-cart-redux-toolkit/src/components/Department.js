import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import {
  AddCircle,
  Edit,
  Update,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editDepartment, setEditDepartment] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get(
          "https://localhost:7227/api/Department"
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments", error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchDepartments();
  }, [navigate]);

  const handleAddDepartment = async () => {
    try {
      await axiosInstance.post("https://localhost:7227/api/Department", {
        name: newDepartment,
        description: newDescription,
      });
      setDepartments([
        ...departments,
        { name: newDepartment, description: newDescription },
      ]);
      setNewDepartment("");
      setNewDescription("");
      toast.success("Department added successfully!");
    } catch (error) {
      console.error("Error adding department", error);
      toast.error("Failed to add department!");
    }
  };

  const handleUpdateDepartment = async (id) => {
    try {
      await axiosInstance.put(`https://localhost:7227/api/Department/${id}`, {
        id: id,
        name: editName,
        description: editDescription,
      });
      setDepartments(
        departments.map((dept) =>
          dept.id === id
            ? { ...dept, name: editName, description: editDescription }
            : dept
        )
      );
      setEditDepartment(null);
      setEditName("");
      setEditDescription("");
      toast.success("Department updated successfully!");
    } catch (error) {
      console.error("Error updating department", error);
      toast.error("Failed to update department!");
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await axiosInstance.delete(`https://localhost:7227/api/Department/${id}`);
      setDepartments(departments.filter((dept) => dept.id !== id));
      toast.success("Department deleted successfully!");
    } catch (error) {
      console.error("Error deleting department", error);
      toast.error("Failed to delete department!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Departments
      </Typography>

      <Box mb={3} display="flex" alignItems="center">
        <TextField
          label="New Department"
          variant="outlined"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
          sx={{ marginRight: 2, width: 300 }}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          sx={{ marginRight: 2, width: 300 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddDepartment}
          startIcon={<AddCircle />}
          sx={{ width: 200 }}
        >
          Add Department
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
                Department Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
                Description
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.length > 0 ? (
              departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell>
                    {editDepartment === dept.id ? (
                      <TextField
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      dept.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editDepartment === dept.id ? (
                      <TextField
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    ) : (
                      dept.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editDepartment === dept.id ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleUpdateDepartment(dept.id)}
                        startIcon={<Update />}
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setEditDepartment(dept.id);
                          setEditName(dept.name);
                          setEditDescription(dept.description);
                        }}
                        startIcon={<Edit />}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteDepartment(dept.id)}
                      startIcon={<DeleteIcon />}
                      sx={{ marginLeft: 1 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No departments found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Department;
