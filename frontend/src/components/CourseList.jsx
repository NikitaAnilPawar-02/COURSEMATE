import React, { useContext, useState } from "react";
import { EnrollmentContext } from "../context/EnrollmentContext.jsx";
import { Modal, Button } from "react-bootstrap";

export const CourseList = () => {
  const { courses, editCourse, deleteCourse } = useContext(EnrollmentContext);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleEdit = (course) => {
    setEditId(course.id);
    setEditData(course);
  };

  const handleSave = async () => {
    if (!editData.name || !editData.duration) {
      setAlertMessage({ type: "danger", text: "All fields are required!" });
      return;
    }

    try {
      await editCourse(editData);
      setAlertMessage({ type: "success", text: "Course updated successfully!" });
      setEditId(null);
      setTimeout(() => setAlertMessage(null), 3000);
    } catch (error) {
      console.error(error);
      setAlertMessage({ type: "danger", text: "Failed to update course." });
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteCourse(deleteId);
      setShowModal(false);
      setAlertMessage({ type: "warning", text: "Course deleted!" });
      setTimeout(() => setAlertMessage(null), 3000);
    } catch (error) {
      console.error(error);
      setAlertMessage({ type: "danger", text: "Failed to delete course." });
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3 text-center">Course List</h4>

      {alertMessage && (
        <div
          className={`alert alert-${alertMessage.type} text-center`}
          role="alert"
        >
          {alertMessage.text}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Start</th>
              <th>End</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                {editId === course.id ? (
                  <>
                    <td>
                      <input
                        className="form-control"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={editData.duration}
                        onChange={(e) =>
                          setEditData({ ...editData, duration: e.target.value })
                        }
                      >
                        <option value="4 weeks">4 Weeks</option>
                        <option value="8 weeks">8 Weeks</option>
                        <option value="12 weeks">12 Weeks</option>
                        <option value="16 weeks">16 Weeks</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        value={editData.startDate}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            startDate: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        value={editData.endDate}
                        onChange={(e) =>
                          setEditData({ ...editData, endDate: e.target.value })
                        }
                      />
                    </td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-success btn-sm flex-fill"
                        onClick={handleSave}
                      >
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
                    <td>{course.name}</td>
                    <td>{course.description}</td>
                    <td>{course.duration}</td>
                    <td>{course.startDate}</td>
                    <td>{course.endDate}</td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-warning btn-sm flex-fill"
                        onClick={() => handleEdit(course)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm flex-fill"
                        onClick={() => confirmDelete(course.id)}
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this course?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
