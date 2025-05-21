import React, { useState } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";

const DashboardTable = ({ data, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");

  // Get unique branches for filter options
  const branches = [...new Set(data.map(item => item.branch))].sort();

  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesBranch = branchFilter ? item.branch === branchFilter : true;
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="p-3">
      <Row className="mb-3">
        <Col md={9}>
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={3} className="d-flex justify-content-end ">
          <Form.Select
            className="bg-primary text-white mt-4 mt-md-0"
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
          >
            <option value="">All Branches</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.branch}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Button
                  variant="none"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(user)}
                >
                  ✏️
                </Button>
                <Button
                  variant="none"
                  size="sm"
                  onClick={() => onDelete(user.id)}
                >
                  ✖
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DashboardTable;