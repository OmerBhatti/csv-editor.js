# CSV_EDITOR

`CSV_EDITOR` is a simple React component that provides a user-friendly CSV editor in a table format. It allows you to import CSV data, view it in a structured format, and make edits to headers and data cells. The component is highly customizable, enabling various styles and callbacks to be passed as props.

## Features

- Display and edit CSV data in a table format.
- Add or remove columns and rows dynamically.
- Editable headers and data cells.
- Supports both single and double-click events for editing and deleting.
- Customizable styles for headers and data.
- Modal window to handle row editing.
- Callback function when data changes.

## Installation

Install the package using npm or yarn:

```bash
npm install csv-editor.js
```
or
```bash
yarn add csv-editor.js
```

## Usage

Here’s a basic example of how to use the CSV_EDITOR component:

```javascript
import React, { useState } from 'react';
import CSVEditor from 'csv-editor.js';

const Example = () => {
  const [headers, setHeaders] = useState(
    ['First Name', 'Last Name', 'Age']
  );
  const [data, setData] = useState([
    ['John', 'Doe', '30'],
    ['Jane', 'Smith', '25'],
  ]);

  const handleDataChange = (updatedData) => {
    setData(updatedData);
    console.log('Data changed:', updatedData);
  };

  return (
    <CSVEditor
      csvString={`
        First Name,Last Name,Age
        John,Doe,30
        Jane,Smith,25
      `}
      headers={headers}  // not necessary if csvString is given
      data={data}  // not necessary if csvString is given
      editable={true}
      onDataChange={handleDataChange}
      headersStyle={{
        'First Name': { color: 'blue' },
        'Age': { color: 'red', textAlign: 'right' }
      }}
      dataStyle={{
        Age: { textAlign: 'center' }
      }}
    />
  );
};

export default Example;
```

## Props

The `CSV_EDITOR` component accepts the following props:

| Prop Name       | Type        | Default     | Description                                                                 |
|-----------------|-------------|-------------|-----------------------------------------------------------------------------|
| `csvString`     | `string`    | `''`        | A CSV-formatted string used to initialize the table.                        |
| `headers`       | `array`     | `[]`        | An array of column headers to be displayed in the table.                    |
| `data`          | `array`     | `[]`        | An array of arrays representing the rows of the CSV data.                   |
| `headersStyle`  | `object`    | `{}`        | Custom styles for specific headers. Each key is a header name.              |
| `dataStyle`     | `object`    | `{}`        | Custom styles for specific data cells, where each key is a header name.     |
| `editable`      | `boolean`   | `false`     | Enables or disables editing mode for rows, headers, and cells.              |
| `onDataChange`  | `function`  | `() => {}`  | Callback function that is called when the data is changed.                  |

### `csvString` (optional)
- **Type**: `string`
- **Default**: `''`
- **Description**: A CSV-formatted string that initializes the table. It automatically parses the string into headers and data rows.

### `headers` (optional)
- **Type**: `array`
- **Default**: `[]`
- **Description**: An array of column headers, which is displayed in the table header.

### `data` (optional)
- **Type**: `array`
- **Default**: `[]`
- **Description**: An array of rows, where each row is represented as an array of data cells.

### `headersStyle` (optional)
- **Type**: `object`
- **Default**: `{}`
- **Description**: An object that allows you to pass custom styles to specific headers. Each key in the object is a header name.

#### Example:
```js
{
  'Age': { textAlign: 'center' }
}
```

### `dataStyle` (optional)
- **Type**: `object`
- **Default**: `{}`
- **Description**: An object that allows you to pass custom styles to specific headers. Each key in the object is a header name.

#### Example
```js
{
  'First Name': { color: 'blue' },
  'Age': { fontWeight: 'bold' }
}
```

### `editable` (optional)
- **Type**: `boolean`
- **Default**: `false`
- **Description**: A boolean flag that enables or disables the editing mode. If true, the user can click headers to rename or delete them and rows to edit data.

### `onDataChange` (optional)
- **Type**: `function`
- **Default**: `() => {}`
- **Description**: A callback function that is triggered whenever the data is changed, such as after adding/removing columns or editing a row.
