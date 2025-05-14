import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const API = "https://jsonplaceholder.typicode.com/users";

  const fetchUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (user) => {
    const res = await axios.post(API, user);
    setUsers([res.data, ...users]);
  };

  const updateUser = async (id, updatedUser) => {
    await axios.put(`${API}/${id}`, updatedUser);
    setUsers(users.map((u) => (u.id === id ? { ...u, ...updatedUser } : u)));
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`);
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
