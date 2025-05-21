import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardTable from '../components/DashboardTable';
import { Button, Modal, Form } from 'react-bootstrap';

const MainLayout = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Rahul Sharma', branch: 'MCA', email: 'rahul.sharma@gmail.com', phone: 9876543210 },
    { id: 2, name: 'Priya Patel', branch: 'BSC', email: 'priya.patel@gmail.com', phone: 8765432109 },
    { id: 3, name: 'Amit Singh', branch: 'BCA', email: 'amit.singh@gmail.com', phone: 7654321098 },
    { id: 4, name: 'Neha Gupta', branch: 'MBA', email: 'neha.gupta@gmail.com', phone: 6543210987 },
    { id: 5, name: 'Vikram Joshi', branch: 'MCA', email: 'vikram.joshi@gmail.com', phone: 7432109876 },
    { id: 6, name: 'Anjali Reddy', branch: 'BSC', email: 'anjali.reddy@gmail.com', phone: 8321098765 },
    { id: 7, name: 'Rohan Malhotra', branch: 'BCA', email: 'rohan.malhotra@gmail.com', phone: 9210987654 },
    { id: 8, name: 'Sneha Iyer', branch: 'MBA', email: 'sneha.iyer@gmail.com', phone: 8109876543 },
    { id: 9, name: 'Arjun Kapoor', branch: 'MCA', email: 'arjun.kapoor@gmail.com', phone: 7098765432 },
    { id: 10, name: 'Divya Nair', branch: 'BSC', email: 'divya.nair@gmail.com', phone: 8987654321 },
    { id: 11, name: 'Karan Mehta', branch: 'BCA', email: 'karan.mehta@gmail.com', phone: 9876543210 },
    { id: 12, name: 'Pooja Desai', branch: 'MBA', email: 'pooja.desai@gmail.com', phone: 8765432109 },
    { id: 13, name: 'Ravi Verma', branch: 'MCA', email: 'ravi.verma@gmail.com', phone: 7654321098 },
    { id: 14, name: 'Shreya Chatterjee', branch: 'BSC', email: 'shreya.chatterjee@gmail.com', phone: 6543210987 },
    { id: 15, name: 'Aditya Rao', branch: 'BCA', email: 'aditya.rao@gmail.com', phone: 7432109876 },
    { id: 16, name: 'Meera Banerjee', branch: 'MBA', email: 'meera.banerjee@gmail.com', phone: 8321098765 },
    { id: 17, name: 'Suresh Kumar', branch: 'MCA', email: 'suresh.kumar@gmail.com', phone: 9210987654 },
    { id: 18, name: 'Kavita Mishra', branch: 'BSC', email: 'kavita.mishra@gmail.com', phone: 8109876543 },
    { id: 19, name: 'Nikhil Saxena', branch: 'BCA', email: 'nikhil.saxena@gmail.com', phone: 7098765432 },
    { id: 20, name: 'Ananya Das', branch: 'MBA', email: 'ananya.das@gmail.com', phone: 8987654321 }
 ]);

  const [nextId, setNextId] = useState(21);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', branch: '', email: '',phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleAddStudent = () => {
    setFormData({ name: '', branch: '', email: '' ,phone:''});
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setFormData({ name: student.name, branch: student.branch, email: student.email,phone: student.phone });
    setEditId(student.id);
    setIsEditing(true);
    setShowModal(true);
  };

  // Delete student than id reassignment
  const handleDeleteStudent = (idToDelete) => {
    const updated = students.filter((student) => student.id !== idToDelete);
    const reIndexed = updated.map((student, index) => ({
      ...student,
      id: index + 1,
    }));
    setStudents(reIndexed);
    setNextId(reIndexed.length + 1);
  };

  // Remove student than Id reassignment
  const handleRemoveStudent = () => {
    const updated = students.slice(0, -1);
    const reIndexed = updated.map((student, index) => ({
      ...student,
      id: index + 1,
    }));
    setStudents(reIndexed);
    setNextId(reIndexed.length + 1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: '', branch: '', email: '' });
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setStudents(prev =>
        prev.map(student =>
          student.id === editId ? { ...student, ...formData } : student
        )
      );
    } else {
      const newStudent = { ...formData, id: nextId };
      const updated = [...students, newStudent];
      setStudents(updated);
      setNextId(updated.length + 1); // ID becomes count + 1
    }
    handleCloseModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      
      {sidebarVisible && (
        <Sidebar
          onAddStudent={handleAddStudent}
          onRemoveStudent={handleRemoveStudent}
        />
      )}

      <div className="flex-grow-1">
        <div className="p-2 border-bottom d-flex justify-content-start align-items-center">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setSidebarVisible(!sidebarVisible)}
          >
            {sidebarVisible ? '✖ ' : '☰'}
          </Button>
          <h2 className='m-auto text-primary'>Register Student</h2>
        </div>

        <DashboardTable
          data={students}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Update Student' : 'Add Student'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Branch</Form.Label>
              <Form.Select
              required
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              >
                <option value="">Select branch</option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
                <option value="BSC">BSC</option>
                <option value="BCA">BCA</option>
                <option value="MCA WITH FULL STACK">MCA WITH FULL STACK</option>
                <option value="MBA FINANCE">MBA FINANCE</option>
                <option value="BSC COMPUTER SCIENCE">BSC COMPUTER SCIENCE</option>
                <option value="BCA WITH WEB DEVELOPMENT">BCA WITH WEB DEVELOPMENT</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                required
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default MainLayout;
