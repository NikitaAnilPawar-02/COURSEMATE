import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export const StudentList = ({ students, onStudentUpdated }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleEdit = (student) => {
    setEditId(student.id);
    setEditData(student);
  };

  const handleSave = async () => {
    if (!editData.name || !editData.email) {
      setAlertMessage({ type: "danger", text: "Name and email are required!" });
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/students/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error("Failed to update student");

      setAlertMessage({ type: "success", text: "Student updated successfully!" });
      setEditId(null);

      if (onStudentUpdated) onStudentUpdated();
    } catch (err) {
      console.error(err);
      setAlertMessage({ type: "danger", text: "Error updating student" });
    }

    setTimeout(() => setAlertMessage(null), 3000);
  };

  const handleDeleteConfirm = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/students/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete student");

      setAlertMessage({ type: "warning", text: "Student deleted successfully!" });
      setShowConfirm(false);
      setDeleteId(null);

      if (onStudentUpdated) onStudentUpdated();
    } catch (err) {
      console.error(err);
      setAlertMessage({ type: "danger", text: "Error deleting student" });
    }

    setTimeout(() => setAlertMessage(null), 3000);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="text-center mb-3">Student List</h4>

      {alertMessage && (
        <div className={`alert alert-${alertMessage.type} text-center`} role="alert">
          {alertMessage.text}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Parent Name</th>
              <th>Parent Phone</th>
              <th style={{ width: "180px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <React.Fragment key={student.id}>
                <tr>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.dob}</td>
                  <td>{student.gender}</td>
                  <td>{student.parentName}</td>
                  <td>{student.parentPhone}</td>
                  <td className="d-flex gap-2">
                    <button
                      className="btn btn-warning btn-sm flex-fill"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm flex-fill"
                      onClick={() => handleDeleteConfirm(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Expanded Row for Editing */}
                {editId === student.id && (
                  <tr>
                    <td colSpan={8}>
                      <div className="p-3 bg-light border rounded">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label>Name</label>
                            <input
                              className="form-control"
                              value={editData.name}
                              onChange={(e) =>
                                setEditData({ ...editData, name: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label>Email</label>
                            <input
                              className="form-control"
                              value={editData.email}
                              onChange={(e) =>
                                setEditData({ ...editData, email: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label>Phone</label>
                            <input
                              className="form-control"
                              value={editData.phone}
                              onChange={(e) =>
                                setEditData({ ...editData, phone: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label>DOB</label>
                            <input
                              type="date"
                              className="form-control"
                              value={editData.dob}
                              onChange={(e) =>
                                setEditData({ ...editData, dob: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label>Gender</label>
                            <select
                              className="form-select"
                              value={editData.gender}
                              onChange={(e) =>
                                setEditData({ ...editData, gender: e.target.value })
                              }
                            >
                              <option value="">Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label>Parent Name</label>
                            <input
                              className="form-control"
                              value={editData.parentName}
                              onChange={(e) =>
                                setEditData({ ...editData, parentName: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label>Parent Phone</label>
                            <input
                              className="form-control"
                              value={editData.parentPhone}
                              onChange={(e) =>
                                setEditData({ ...editData, parentPhone: e.target.value })
                              }
                            />
                          </div>
                          <div className="col-12 d-flex gap-2 mt-2">
                            <button
                              className="btn btn-success"
                              onClick={handleSave}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={() => setEditId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
