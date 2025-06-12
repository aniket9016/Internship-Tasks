import React from 'react';

export default function EmployeeModal({ employee, onClose }) {
  if (!employee) return null;

  return (
    <div className="modal">
      <div className="modal-box">
        <h3>{employee.first_name} {employee.last_name}</h3>
        {employee.image_url && <img src={employee.image_url} alt="profile" />}
        <p><strong>Gender:</strong> {employee.gender}</p>
        <p><strong>Age:</strong> {employee.age}</p>
        <p><strong>City:</strong> {employee.city}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Mobile:</strong> {employee.mobile}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}