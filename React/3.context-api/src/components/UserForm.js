import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = () => {
  const { users, addUser, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (isEdit) {
      const user = users.find(u => u.id === parseInt(id));
      if (user) setForm({ name: user.name, email: user.email });
    }
  }, [id, users,isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateUser(parseInt(id), form);
    } else {
      addUser({ ...form, id: Date.now() }); // Simulate ID
    }
    navigate("/");
  };

  return (
    <div>
      <h2>{isEdit ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <button className="btn btn-primary" type="submit">{isEdit ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default UserForm;
