import React, { useState, useEffect, useCallback } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import { getStudents, createStudent, updateStudent, deleteStudent } from './api';
import './App.css';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);
  const [serverErrors, setServerErrors] = useState({});

  const fetchStudents = useCallback(async (q = '') => {
    setLoading(true);
    try {
      const res = await getStudents(q);
      setStudents(res.data.results ?? res.data); // handles paginated or plain list
    } catch (err) {
      setMessage({ type: 'error', text: 'Could not reach the backend. Is the Django server running?' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSave = async (data) => {
    setServerErrors({});
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, data);
        setMessage({ type: 'success', text: 'Student updated successfully.' });
      } else {
        await createStudent(data);
        setMessage({ type: 'success', text: 'Student added successfully.' });
      }
      setEditingStudent(null);
      fetchStudents(search);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setServerErrors(err.response.data);
        setMessage({ type: 'error', text: 'Please fix the errors below.' });
      } else {
        setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student record?')) return;
    try {
      await deleteStudent(id);
      setMessage({ type: 'success', text: 'Student deleted.' });
      fetchStudents(search);
    } catch (err) {
      setMessage({ type: 'error', text: 'Could not delete student.' });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents(search);
  };

  return (
    <div className="app">
      <header>
        <h1>Student Management System</h1>
      </header>

      {message && (
        <div className={`banner ${message.type}`}>
          {message.text}
          <button className="close-btn" onClick={() => setMessage(null)}>×</button>
        </div>
      )}

      <div className="main-layout">
        <section className="form-section">
          <StudentForm
            editingStudent={editingStudent}
            onSave={handleSave}
            onCancel={() => setEditingStudent(null)}
            serverErrors={serverErrors}
          />
        </section>

        <section className="list-section">
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search by name, roll no, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <StudentList
            students={students}
            onEdit={setEditingStudent}
            onDelete={handleDelete}
            loading={loading}
          />
        </section>
      </div>
    </div>
  );
}
