import React, { useEffect, useState } from 'react';
import './styles.css';

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
	editable = true,
	...props
}) {
	const [localData, setLocalData] = useState(data);
	const [localHeaders, setLocalHeaders] = useState(headers);
	const [currentRow, setCurrentRow] = useState(null);

	useEffect(() => {
		setLocalData(data);
	}, [data]);

	useEffect(() => {
		setLocalHeaders(headers);
	}, [headers]);

    useEffect(() => {
        if (csvString) {
            const [headers, ...rows] = csvString.trim().split('\n');
            setLocalHeaders(headers.split(',').map((header) => header.trim()));
            setLocalData(rows.map((row) => row.split(',').map((cell) => cell.trim())));
        }
    }, [csvString]);

	return (
		<>
			<div className="csv-editor">
				<table {...props} className="csv-editor-table">
					<thead>
						<tr>
							{localHeaders.map((header, i) => (
								<th key={i} style={headersStyle && headersStyle[header]}>
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{localData.map((row, i) => (
							<tr
								key={i}
								className={editable ? 'editable' : ''}
								onClick={() => (editable ? setCurrentRow(i) : null)}
							>
								{row.map((cell, j) => (
									<td key={j} style={dataStyle && dataStyle[headers[j]]}>
										{cell}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
