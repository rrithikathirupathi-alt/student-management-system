import React from 'react';

export default function StudentList({ students, onEdit, onDelete, loading }) {
  if (loading) return <p className="status-text">Loading students...</p>;
  if (students.length === 0) return <p className="status-text">No students found.</p>;

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Roll No</th>
          <th>Email</th>
          <th>Department</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.roll_no}</td>
            <td>{s.email}</td>
            <td>{s.department}</td>
            <td>{s.year}</td>
            <td>
              <button onClick={() => onEdit(s)}>Edit</button>
              <button className="danger" onClick={() => onDelete(s.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
