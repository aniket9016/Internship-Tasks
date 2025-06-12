import React from 'react';

export default function EmployeeList({ employees, onEdit, onDelete, onView }) {
  return (
    <div className="list">
      {employees.map(emp => (
        <div key={emp.id} className="item">
          <strong>{emp.first_name} {emp.last_name} ({emp.gender})</strong>
          <div>City: {emp.city}, Dept: {emp.department}, Mobile: {emp.mobile}</div>
          {emp.image_url && <img src={emp.image_url} alt="profile" width="60" />}
          <div>
            <button onClick={() => onView(emp)}>👁 View</button>
            <button onClick={() => onEdit(emp)}>✏ Edit</button>
            <button onClick={() => onDelete(emp.id)}>🗑 Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}