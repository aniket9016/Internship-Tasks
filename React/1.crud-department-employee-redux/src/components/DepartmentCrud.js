import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  readDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../actions/departmentAction";
import { Button, Form, Table, Container, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import CustomModal from "./CustomModal";
import TablePagination from "@mui/material/TablePagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function DepartmentCrud({ theme, toggleTheme }) {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departmentList);

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({ id: 0, departmentName: "" });
  const [selectedDept, setSelectedDept] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ffffff',
      },
      text: {
        primary: '#ffffff',
        secondary: '#cccccc',
      },
    },
    components: {
      MuiTablePagination: {
        styleOverrides: {
          root: {
            color: '#ffffff',
            backgroundColor: 'transparent',
          },
          selectIcon: {
            color: '#ffffff',
          },
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await dispatch(readDepartment());

      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, departmentName: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id === 0) {
      await dispatch(
        createDepartment({ departmentName: formData.departmentName })
      );
    } else {
      await dispatch(updateDepartment(formData.id, formData));
    }
    dispatch(readDepartment());
    closeModal();
  };

  const handleEdit = (dept) => {
    setFormData(dept);
    setModalType("edit");
    setShowModal(true);
  };

  const handleView = (dept) => {
    setSelectedDept(dept);
    setModalType("view");
    setShowModal(true);
  };

  const handleDelete = (dept) => {
    setSelectedDept(dept);
    setModalType("delete");
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedDept?.id) {
      dispatch(deleteDepartment(selectedDept.id));
      dispatch(readDepartment());
    }
    closeModal();
  };

  const openAddModal = () => {
    setFormData({ id: 0, departmentName: "" });
    setModalType("add");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setFormData({ id: 0, departmentName: "" });
    setSelectedDept(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const departmentsToShow = departments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const from = departments.length === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min((page + 1) * rowsPerPage, departments.length);
  const countText = `${from}-${to} of ${departments.length}`;

  const getModalContent = () => {
    switch (modalType) {
      case "add":
      case "edit":
        return {
          title: modalType === "add" ? "Add Department" : "Edit Department",
          body: (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="departmentName">
                <Form.Label>Department Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.departmentName}
                  onChange={handleChange}
                  required
                  placeholder="Enter department name"
                />
              </Form.Group>
            </Form>
          ),
          footerButtons: [
            {
              label: "Cancel",
              props: { variant: "secondary", onClick: closeModal },
            },
            {
              label: modalType === "add" ? "Create" : "Update",
              props: {
                variant: "primary",
                type: "submit",
                onClick: handleSubmit,
              },
            },
          ],
        };

      case "view":
        return {
          title: "View Department",
          body: (
            <Form>
              <Form.Group controlId="viewDepartmentName">
                <Form.Label>Department Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedDept?.departmentName || ""}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>
            </Form>
          ),
          footerButtons: [
            {
              label: "Close",
              props: { variant: "secondary", onClick: closeModal },
            },
          ],
        };

      case "delete":
        return {
          title: "Confirm Deletion",
          body: <p>Are you sure you want to delete this department?</p>,
          footerButtons: [
            {
              label: "Cancel",
              props: { variant: "secondary", onClick: closeModal },
            },
            {
              label: "Delete",
              props: { variant: "danger", onClick: confirmDelete },
            },
          ],
        };

      default:
        return {};
    }
  };

  const modalConfig = getModalContent();

  return (
    <Container fluid className={`mb-4 ${theme}`}>
      <div className="employee-dark-card p-4 rounded shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-uppercase text-white">Department Management</h3>
          <div className="d-flex gap-2">
            <Button className="btn-custom-add" onClick={openAddModal}>
              <FontAwesomeIcon icon={faReact} className="me-2" />
              Add Department
            </Button>
          </div>
        </div>
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-5">
                  <Spinner animation="border" variant="light" />
                  <div className="mt-2 text-light">Loading departments...</div>
                </td>
              </tr>
            ) : departments?.length > 0 ? (
              departmentsToShow.map((dept) => (
                <tr key={dept.id}>
                  <td>{dept.id}</td>
                  <td>{dept.departmentName}</td>
                  <td>
                    <Button
                      className="btn-icon view me-2"
                      size="sm"
                      onClick={() => handleView(dept)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <Button
                      className="btn-icon edit me-2"
                      size="sm"
                      onClick={() => handleEdit(dept)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      className="btn-icon delete"
                      size="sm"
                      onClick={() => handleDelete(dept)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-light">
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {departments.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-white">{countText}</div>
            <ThemeProvider theme={darkTheme}>
              <TablePagination
                component="div"
                count={departments.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage="Rows per page:"
                sx={{
                  color: '#ffffff',
                  '.MuiTablePagination-selectIcon': {
                    color: '#ffffff',
                  },
                  '.MuiTablePagination-select': {
                    color: '#ffffff',
                  },
                  '.MuiTablePagination-selectLabel': {
                    color: '#ffffff',
                  },
                  '.MuiTablePagination-displayedRows': {
                    color: '#ffffff',
                  },
                  '.MuiTablePagination-actions': {
                    color: '#ffffff',
                  },
                  '.MuiIconButton-root': {
                    color: '#ffffff',
                  },
                  '.Mui-disabled': {
                    color: '#666666 !important',
                  }
                }}
              />
            </ThemeProvider>
          </div>
        )}
      </div>

      <CustomModal
        show={showModal}
        onHide={closeModal}
        title={modalConfig.title}
        body={modalConfig.body}
        footerButtons={modalConfig.footerButtons}
      />
    </Container>
  );
}

export default DepartmentCrud;