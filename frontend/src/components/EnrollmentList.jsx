import React, { useContext, useState } from "react";
import { EnrollmentContext } from "../context/EnrollmentContext.jsx";
import { Modal, Button } from "react-bootstrap";

export const EnrollmentList = () => {
  const { enrollments, students, courses, updateEnrollment, deleteEnrollment, fetchEnrollments } =
    useContext(EnrollmentContext);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleSave = async () => {
    try {
      await updateEnrollment(editId, {
        student: { id: editData.student.id },
        course: { id: editData.course.id },
        status: editData.status,
      });
      setEditId(null);
      fetchEnrollments();
      setAlertMessage({ type: "success", text: "Enrollment updated successfully!" });
    } catch (err) {
      console.error(err);
      setAlertMessage({ type: "danger", text: "Failed to update enrollment" });
    }
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const handleDeleteConfirm = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEnrollment(deleteId);
      setShowConfirm(false);
      setDeleteId(null);
      fetchEnrollments();
      setAlertMessage({ type: "warning", text: "Enrollment deleted successfully!" });
    } catch (err) {
      console.error(err);
      setAlertMessage({ type: "danger", text: "Failed to delete enrollment" });
    }
    setTimeout(() => setAlertMessage(null), 3000);
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-3">Enrollments</h2>

      {alertMessage && (
        <div className={`alert alert-${alertMessage.type} text-center`} role="alert">
          {alertMessage.text}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((e) => (
              <tr key={e.id}>
                {editId === e.id ? (
                  <>
                    <td>
                      <select
                        className="form-select"
                        value={editData.student?.id || ""}
                        onChange={(ev) =>
                          setEditData({
                            ...editData,
                            student: students.find((s) => s.id === Number(ev.target.value)),
                          })
                        }
                      >
                        {students.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={editData.course?.id || ""}
                        onChange={(ev) =>
                          setEditData({
                            ...editData,
                            course: courses.find((c) => c.id === Number(ev.target.value)),
                          })
                        }
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={editData.status || ""}
                        onChange={(ev) =>
                          setEditData({ ...editData, status: ev.target.value })
                        }
                      >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Dropped">Dropped</option>
                      </select>
                    </td>
                    <td className="d-flex gap-2">
                      <button className="btn btn-success btn-sm flex-fill" onClick={handleSave}>
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm flex-fill"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{e.student?.name}</td>
                    <td>{e.course?.name}</td>
                    <td>{e.status}</td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-warning btn-sm flex-fill"
                        onClick={() => {
                          setEditId(e.id);
                          setEditData(e);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm flex-fill"
                        onClick={() => handleDeleteConfirm(e.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- DELETE CONFIRM MODAL --- */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this enrollment?</Modal.Body>
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
