import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readEmployee } from "../actions/employeeAction";
import { readDepartment } from "../actions/departmentAction";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Image,
} from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { variables } from "../components/url_constant";

const COLORS = [
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#FF6384",
  "#4BC0C0",
];

function Home({ theme }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector((state) => state.employeeList || []);
  const departments = useSelector((state) => state.departmentList || []);

  useEffect(() => {
    dispatch(readEmployee());
    dispatch(readDepartment());
  }, [dispatch]);

  const empPerDept = departments?.map((dept) => {
    const count = employees.filter(
      (emp) => emp.department === dept.departmentName
    ).length;
    return { name: dept.departmentName, value: count };
  });

  const cardStyle = {
    backgroundColor: theme === "dark" ? "#1f1f1f" : "#ffffff",
    color: theme === "dark" ? "#f0f0f0" : "#1f1f1f",
    height: "180px",
  };

  return (
    <Container fluid className="tempclass mt-4 mb-5">
      <Row>
        <Col md={6} className="mb-4">
          <Row>
            <Col md={12} className="mb-3">
              <Card className="text-center shadow" style={cardStyle}>
                <Card.Body>
                  <FontAwesomeIcon icon={faUsers} size="2x" className="mb-2" />
                  <h5>Total Employees</h5>
                  <h3>{employees.length}</h3>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/employee")}
                  >
                    View Employees
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12}>
              <Card className="text-center shadow" style={cardStyle}>
                <Card.Body>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    size="2x"
                    className="mb-2"
                  />
                  <h5>Total Departments</h5>
                  <h3>{departments.length}</h3>
                  <Button
                    variant="success"
                    onClick={() => navigate("/department")}
                  >
                    View Departments
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Card
            className="text-center shadow"
            style={{
              backgroundColor: theme === "dark" ? "#1f1f1f" : "#ffffff",
              color: theme === "dark" ? "#f0f0f0" : "#1f1f1f",
              height: "380px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card.Header>
              <strong>Employees per Department</strong>
            </Card.Header>
            <Card.Body style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={empPerDept}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                    label
                  >
                    {empPerDept.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5 mb-4">
        <Col md={6}>
          <Card className="shadow mb-4" style={cardStyle}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Department List</h5>
              <Button
                variant="success"
                size="sm"
                onClick={() => navigate("/department")}
              >
                <i className="fas fa-plus me-1"></i> Add
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table
                striped
                bordered
                hover
                size="sm"
                variant={theme === "dark" ? "dark" : "light"}
                className="mb-0"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Department Name</th>
                  </tr>
                </thead>
                <tbody>
                  {departments?.length > 0 ? (
                    departments.map((dept) => (
                      <tr key={dept.id}>
                        <td>{dept.id}</td>
                        <td>{dept.departmentName}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">
                        No departments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow mb-4" style={cardStyle}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Employee List</h5>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate("/employee")}
              >
                <i className="fas fa-plus me-1"></i> Add
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table
                striped
                bordered
                hover
                size="sm"
                variant={theme === "dark" ? "dark" : "light"}
                className="mb-0"
              >
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {employees?.length > 0 ? (
                    employees.map((emp) => (
                      <tr key={emp.id}>
                        <td>
                          <Image
                            src={
                              emp.profilePic
                                ? `${variables.BASE_URL}${emp.profilePic}`
                                : "https://via.placeholder.com/40"
                            }
                            roundedCircle
                            width="40"
                            height="40"
                            alt="Profile"
                          />
                        </td>
                        <td>{emp.employeeName}</td>
                        <td>{emp.department}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
