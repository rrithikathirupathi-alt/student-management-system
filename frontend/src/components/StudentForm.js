import React, { useState, useEffect } from 'react';

const DEPARTMENTS = [
  { value: 'CSE', label: 'Computer Science' },
  { value: 'ECE', label: 'Electronics & Communication' },
  { value: 'MECH', label: 'Mechanical' },
  { value: 'CIVIL', label: 'Civil' },
  { value: 'EEE', label: 'Electrical & Electronics' },
];

const EMPTY_FORM = { name: '', roll_no: '', email: '', department: 'CSE', year: 1 };

export default function StudentForm({ editingStudent, onSave, onCancel, serverErrors }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [clientErrors, setClientErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name,
        roll_no: editingStudent.roll_no,
        email: editingStudent.email,
        department: editingStudent.department,
        year: editingStudent.year,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setClientErrors({});
  }, [editingStudent]);

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.roll_no.trim()) errors.roll_no = 'Roll number is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email';
    if (form.year < 1 || form.year > 4) errors.year = 'Year must be between 1 and 4';
    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...form, year: Number(form.year) });
  };

  const errorFor = (field) => clientErrors[field] || (serverErrors && serverErrors[field]?.[0]);

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>

      <label>
        Name
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errorFor('name') && <span className="field-error">{errorFor('name')}</span>}
      </label>

      <label>
        Roll No
        <input
          type="text"
          value={form.roll_no}
          onChange={(e) => setForm({ ...form, roll_no: e.target.value })}
        />
        {errorFor('roll_no') && <span className="field-error">{errorFor('roll_no')}</span>}
      </label>

      <label>
        Email
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errorFor('email') && <span className="field-error">{errorFor('email')}</span>}
      </label>

      <label>
        Department
        <select
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          {DEPARTMENTS.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </label>

      <label>
        Year
        <input
          type="number"
          min="1"
          max="4"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
        />
        {errorFor('year') && <span className="field-error">{errorFor('year')}</span>}
      </label>

      <div className="form-actions">
        <button type="submit">{editingStudent ? 'Update' : 'Add'}</button>
        {editingStudent && (
          <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}
