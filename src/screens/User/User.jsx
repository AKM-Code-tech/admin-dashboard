import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';

const User = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repassword: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (formData.password !== formData.repassword) {
      alert('Passwords do not match!');
      return;
    }

    setUsers([...users, formData]);
    setFormData({
      name: '',
      email: '',
      password: '',
      repassword: '',
      role: ''
    });
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleEditUser = (index) => {
    const userToEdit = users[index];
    setFormData(userToEdit);
    handleDeleteUser(index); // Remove user for update
  };

  return (
    <div className="user-component container">
      <h2 className="my-4">Manage Users</h2>
      <Form className="mb-4">
        <Form.Group controlId="formUserName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formUserEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter user email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formUserPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formUserRepassword">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter password"
            name="repassword"
            value={formData.repassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formUserRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" className="mt-3" onClick={handleAddUser}>
          {formData.id ? 'Update User' : 'Add User'}
        </Button>
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEditUser(index)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteUser(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
