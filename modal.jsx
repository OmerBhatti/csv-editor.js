import React, { useEffect, useState } from 'react';
import './modalStyles.css';

export default function Modal({ open, data, setLocalData, headers, onDataChange, currentRow, setCurrentRow, onClose }) {
	const [formData, setFormData] = useState([]);
    const [error, setError] = useState(null);

	useEffect(() => {
		if (currentRow !== null && data && data[currentRow]) {
			setFormData(data[currentRow]);
		} else {
			setFormData([]);
		}
	}, [currentRow, data]);

	const handleInputChange = (e, index) => {
        setError(null);
		const { value } = e.target;
		const updatedFormData = [...formData];
		updatedFormData[index] = value;
		setFormData(updatedFormData);
	};

	const handleSave = () => {
        setError(null);
		const containsInvalidValue = formData.some(item => item === '' || item === undefined || item === null);
        if (containsInvalidValue || formData.length !== headers.length) {
            setError('Please fill all the fields');
            return;
        }
		const updatedData = [...data];
		if (currentRow !== null && currentRow !== undefined) {
			updatedData[currentRow] = formData;
		} else {
			updatedData.push(formData);
		}
		setLocalData(updatedData);
		onDataChange(updatedData);
		handleClose();
	};

	// Handle close operation
	const handleClose = () => {
		setCurrentRow(null);
		onClose();
	};

	if (!open) return null;

	return (
		<div className="csv-modal-overlay">
			<div className="csv-modal-container">
				<h3>{currentRow !== null ? 'Edit Row' : 'Add New Row'}</h3>
				<div className="csv-modal-content">
					{headers.map((header, index) => (
						<div key={index} className="csv-modal-input">
							<label>{header}:</label>
							<input
								type="text"
								value={formData[index] || ''}
								onChange={e => handleInputChange(e, index)}
							/>
						</div>
					))}
				</div>
                {error && <div className="csv-modal-error">{error}</div>}
				<div className="csv-modal-actions">
					<button onClick={handleSave}>Save</button>
					<button onClick={handleClose}>Cancel</button>
				</div>
			</div>
		</div>
	);
}