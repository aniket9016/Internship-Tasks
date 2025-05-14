import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const UserList = () => {
  const { users, deleteUser } = useContext(UserContext);

  return (
    <div>
      <h2>User List</h2>
      <Link to="/add" className="btn btn-success mb-3">Add User</Link>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td><td>{user.name}</td><td>{user.email}</td>
              <td>
                <Link to={`/edit/${user.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
