import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  readEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../actions/employeeAction";
import { readDepartment } from "../actions/departmentAction";
import { Button, Form, Table, Container, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faEye,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import CustomModal from "./CustomModal";
import { variables } from "../components/url_constant";
import TablePagination from "@mui/material/TablePagination";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Import for custom theme

function EmployeeCrud({ theme, toggleTheme }) {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employeeList);
  const departments = useSelector((state) => state.departmentList);

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [formData, setFormData] = useState({
    id: 0,
    employeeName: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    email: "",
    profilePic: "",
    department: "",
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ffffff",
      },
      text: {
        primary: "#ffffff",
        secondary: "#cccccc",
      },
    },
    components: {
      MuiTablePagination: {
        styleOverrides: {
          root: {
            color: "#ffffff",
            backgroundColor: "transparent",
          },
          selectIcon: {
            color: "#ffffff",
          },
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      await dispatch(readEmployee());
      await dispatch(readDepartment());

      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData({ ...formData, profilePic: file.name });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    for (let key in formData) {
      formPayload.append(key, formData[key]);
    }
    if (selectedFile) {
      formPayload.append("profilePic", selectedFile);
    }

    if (formData.id === 0) {
      await dispatch(createEmployee(formPayload));
    } else {
      await dispatch(updateEmployee(formData.id, formPayload));
    }

    dispatch(readEmployee());
    closeModal();
  };

  const handleEdit = (emp) => {
    setFormData({
      id: emp.id,
      employeeName: emp.employeeName,
      dateOfBirth: emp.dateOfBirth?.split("T")[0] || "",
      address: emp.address,
      phone: emp.phone,
      email: emp.email,
      profilePic: emp.profilePic,
      department: emp.department,
    });
    setSelectedFile(null);
    setModalType("edit");
    setShowModal(true);
  };

  const handleView = (emp) => {
    setSelectedEmp(emp);
    setModalType("view");
    setShowModal(true);
  };

  const handleDelete = (emp) => {
    setSelectedEmp(emp);
    setModalType("delete");
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedEmp?.id) {
      dispatch(deleteEmployee(selectedEmp.id));
      dispatch(readEmployee());
    }
    closeModal();
  };

  const openAddModal = () => {
    setFormData({
      id: 0,
      employeeName: "",
      dateOfBirth: "",
      address: "",
      phone: "",
      email: "",
      profilePic: "",
      department: "",
    });
    setSelectedFile(null);
    setModalType("add");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setFormData({
      id: 0,
      employeeName: "",
      dateOfBirth: "",
      address: "",
      phone: "",
      email: "",
      profilePic: "",
      department: "",
    });
    setSelectedEmp(null);
    setSelectedFile(null);
  };

  const getModalContent = () => {
    const commonForm = (
      <>
        <Form.Group className="mb-2">
          <Form.Label>Employee Name</Form.Label>
          <Form.Control
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleFileChange}
          />
          {selectedFile ? (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          ) : formData.profilePic ? (
            <div className="mt-2">
              <img
                src={`${variables.BASE_URL}${formData.profilePic}`}
                alt="Current"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.departmentName}>
                {dept.departmentName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </>
    );

    switch (modalType) {
      case "add":
      case "edit":
        return {
          title: modalType === "add" ? "Add Employee" : "Edit Employee",
          body: <Form onSubmit={handleSubmit}>{commonForm}</Form>,
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
          title: "View Employee",
          body: (
            <Form>
              {Object.entries(selectedEmp || {}).map(([key, value]) => (
                <Form.Group key={key} className="mb-2">
                  <Form.Label>{key}</Form.Label>
                  <Form.Control readOnly value={value} />
                </Form.Group>
              ))}
              {selectedEmp?.profilePic && (
                <img
                  src={`${variables.BASE_URL}${selectedEmp.profilePic}`}
                  alt="Profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )}
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
          body: <p>Are you sure you want to delete this employee?</p>,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const employeesToShow = employees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const from = employees.length === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min((page + 1) * rowsPerPage, employees.length);
  const countText = `${from}-${to} of ${employees.length}`;

  return (
    <Container fluid className={`mb-4 ${theme}`}>
      <div className="employee-dark-card p-4 rounded shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-uppercase text-white">Employee Management</h3>
          <Button className="btn-custom-add" onClick={openAddModal}>
            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
            Add Employee
          </Button>
        </div>

        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Profile Pic</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-5">
                  <Spinner animation="border" variant="light" />
                  <div className="mt-2 text-light">Loading employees...</div>
                </td>
              </tr>
            ) : employees?.length > 0 ? (
              employeesToShow.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.employeeName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>
                    <img
                      src={`${variables.BASE_URL}${emp.profilePic}`}
                      alt="Profile"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{emp.department}</td>
                  <td>
                    <Button
                      className="btn-icon view me-2"
                      size="sm"
                      onClick={() => handleView(emp)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <Button
                      className="btn-icon edit me-2"
                      size="sm"
                      onClick={() => handleEdit(emp)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      className="btn-icon delete"
                      size="sm"
                      onClick={() => handleDelete(emp)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-light">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>  
        </Table>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-white">{countText}</div>
          <ThemeProvider theme={darkTheme}>
            <TablePagination
              component="div"
              count={employees.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage="Rows per page:"
              sx={{
                color: "#ffffff",
                ".MuiTablePagination-selectIcon": {
                  color: "#ffffff",
                },
                ".MuiTablePagination-select": {
                  color: "#ffffff",
                },
                ".MuiTablePagination-selectLabel": {
                  color: "#ffffff",
                },
                ".MuiTablePagination-displayedRows": {
                  color: "#ffffff",
                },
                ".MuiTablePagination-actions": {
                  color: "#ffffff",
                },
                ".MuiIconButton-root": {
                  color: "#ffffff",
                },
                ".Mui-disabled": {
                  color: "#666666 !important",
                },
              }}
            />
          </ThemeProvider>
        </div>
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

export default EmployeeCrud;
