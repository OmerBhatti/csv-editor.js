import React, { useEffect, useState } from 'react';
import './styles.css';
import './modalStyles.css';

function Modal({ open, data, setLocalData, headers, onDataChange, currentRow, setCurrentRow, onSuccess, onClose }) {
	const [formData, setFormData] = useState([]);

	useEffect(() => {
		if (currentRow !== null && data && data[currentRow]) {
			setFormData(data[currentRow]);
		} else {
			setFormData([]);
		}
	}, [currentRow, data]);

	const handleInputChange = (e, index) => {
		const { value } = e.target;
		const updatedFormData = [...formData];
		updatedFormData[index] = value;
		setFormData(updatedFormData);
	};

	const handleSave = () => {
		const updatedData = [...data];
		if (currentRow !== null) {
			updatedData[currentRow] = formData;
		} else {
			updatedData.push(formData);
		}
		setLocalData(updatedData);
		onDataChange(updatedData);
		onSuccess(formData);
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
				<div className="csv-modal-actions">
					<button onClick={handleSave}>Save</button>
					<button onClick={handleClose}>Cancel</button>
				</div>
			</div>
		</div>
	);
}

/**
 * CSV_EDITOR Component
 *
 * A simple CSV editor that displays data in a table format. This component
 * allows for customizable headers and data to be passed in, and provides
 * callbacks for when the data changes or when a file is uploaded.
 *
 */
export default function CSV_EDITOR({
	csvString = '',
	headers = [],
	data = [],
	headersStyle = {},
	dataStyle = {},
	editable = false,
	onDataChange = () => {},
	...props
}) {
	const [localData, setLocalData] = useState(data);
	const [localHeaders, setLocalHeaders] = useState(headers);
	const [showModal, setShowModal] = useState(false);
	const [currentRow, setCurrentRow] = useState(null);
	const [clickTimeout, setClickTimeout] = useState(null);

	useEffect(() => {
		setLocalData(data);
	}, [data]);

	useEffect(() => {
		setLocalHeaders(headers);
	}, [headers]);

	useEffect(() => {
		if (csvString) {
			const [headers, ...rows] = csvString.trim().split('\n');
			setLocalHeaders(headers.split(',').map(header => header.trim()));
			setLocalData(rows.map(row => row.split(',').map(cell => cell.trim())));
		}
	}, [csvString]);

	const addColumn = () => {
		const newHeaders = [...localHeaders, 'New Column'];
		setLocalHeaders(newHeaders);
		const newData = [...localData];
		newData.forEach(row => {
			row.push('');
		});
		setLocalData(newData);
	};

	const renameHeader = index => {
		const newHeaders = [...localHeaders];
		const newName = prompt('Enter new header name', newHeaders[index]);
		if (newName) {
			newHeaders[index] = newName;
			setLocalHeaders(newHeaders);
		}
	};

	const removeColumn = index => {
		const newHeaders = [...localHeaders];
		newHeaders.splice(index, 1);
		setLocalHeaders(newHeaders);
		const newData = [...localData];
		newData.forEach(row => {
			row.splice(index, 1);
		});
		setLocalData(newData);
	};

	const removeRow = index => {
		const newData = [...localData];
		newData.splice(index, 1);
		setLocalData(newData);
	};

	const handleHeaderClick = index => {
		if (clickTimeout) {
			clearTimeout(clickTimeout);
			setClickTimeout(null);
			const deleteConfirm = window.confirm('Are you sure you want to delete this column?');
			if (!deleteConfirm) return;
			removeColumn(index);
		} else {
			const timeout = setTimeout(() => {
				renameHeader(index);
				setClickTimeout(null);
			}, 250);
			setClickTimeout(timeout);
		}
	};

	const handleRowClick = index => {
		if (!editable) return;
		if (clickTimeout) {
			clearTimeout(clickTimeout);
			setClickTimeout(null);
			const deleteConfirm = window.confirm('Are you sure you want to delete this row?');
			if (!deleteConfirm) return;
			removeRow(index);
		} else {
			const timeout = setTimeout(() => {
				if (index) {
					setCurrentRow(index);
				}
				setShowModal(true);
				setClickTimeout(null);
			}, 250);
			setClickTimeout(timeout);
		}
	};

	return (
		<>
			<Modal
				open={showModal}
				setShowModal={setShowModal}
				data={localData}
				setLocalData={setLocalData}
				headers={localHeaders}
				onDataChange={onDataChange}
				currentRow={currentRow}
				setCurrentRow={setCurrentRow}
				onSuccess={row => console.log(row)}
				onClose={() => {
					setShowModal(false);
					setCurrentRow(null);
				}}
			/>
			<div className="csv-editor">
				<table {...props} className="csv-editor-table">
					<thead>
						<tr>
							{localHeaders.map((header, i) => (
								<th
									key={i}
									onClick={() => (editable ? handleHeaderClick(i) : null)} // Single & Double click handler
									style={headersStyle && headersStyle[header]}
								>
									{header}
								</th>
							))}
						</tr>
						{editable && (
							<button className="add-column" onClick={addColumn}>
								+
							</button>
						)}
					</thead>
					<tbody>
						{localData.map((row, i) => (
							<tr
								key={i}
								className={editable ? 'editable' : ''}
								onClick={() => (editable ? handleRowClick(i) : null)} // Single & Double click handler for row
							>
								{row.map((cell, j) => (
									<td key={j} style={dataStyle && dataStyle[localHeaders[j]]}>
										{cell}
									</td>
								))}
							</tr>
						))}
						{editable && (
							<button className="add-row" onClick={() => handleRowClick()}>
								+
							</button>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
}
