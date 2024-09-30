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
export default function CSV_EDITOR({ headers, data, headersStyle = {}, dataStyle = {}, ...props }) {
	const [localData, setLocalData] = useState(data);
	const [localHeaders, setLocalHeaders] = useState(headers);

	useEffect(() => {
		setLocalData(data);
	}, [data]);

	useEffect(() => {
		setLocalHeaders(headers);
	}, [headers]);

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
							<tr key={i}>
								{row.map((cell, j) => (
									<td style={dataStyle && dataStyle[headers[j]]} key={j}>
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
