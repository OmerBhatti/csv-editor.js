import React, { useState, useEffect } from "react";
import "./Modal.css"; // Optional CSS file for styling

const Modal = ({
  open,
  setLocalData,
  data,
  headers,
  onDataChange,
  currentRow,
  setCurrentRow,
  onSuccess,
  onClose,
}) => {
  const [formData, setFormData] = useState({});

  // Effect to update formData when currentRow or data changes
  useEffect(() => {
    if (currentRow !== null && data && data[currentRow]) {
      setFormData(data[currentRow]);
    } else {
      setFormData({});
    }
  }, [currentRow, data]);

  // Handle form input changes
  const handleInputChange = (e, header) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [header]: value,
    }));
  };

  // Handle save operation
  const handleSave = () => {
    const updatedData = [...data];
    if (currentRow !== null) {
      updatedData[currentRow] = formData; // Update the existing row
    } else {
      updatedData.push(formData); // Add a new row
    }
    setLocalData(updatedData);
    onDataChange(updatedData);
    onSuccess(formData); // Callback for success
    handleClose();
  };

  // Handle close operation
  const handleClose = () => {
    setCurrentRow(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>{currentRow !== null ? "Edit Row" : "Add New Row"}</h3>
        <div className="modal-content">
          {headers.map((header, index) => (
            <div key={index} className="modal-input">
              <label>{header}:</label>
              <input
                type="text"
                value={formData[header] || ""}
                onChange={(e) => handleInputChange(e, header)}
              />
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
