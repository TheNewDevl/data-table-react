# Data Table Component

Data Table Component is simple and easy to use data table component for your web applications.

## Installation

To install the Data Table Component, you can use npm. Simply run the following command in your project directory :
```
npm install @carlco/data-table-react
```

## Usage

### Basic usage

To use the Data Table Component, you can import it into your project and use it in your React App:

````
import { DataTable } from '@carlco/data-table-react';

const App = () => {
    const columns = [
        { title: "First Name", data: "firstName" },
        { title: "Last Name", data: "lastName" },
        { title: "Birth date", data: "birthDate", type: "date" },
     ];

    const data = [
        { firstName: "John", lastName: "Doe", birthDate: "1990-01-01" },
        { firstName: "Jane", lastName: "Doe", birthDate: "1990-01-02" },
        { firstName: "John", lastName: "Doe", birthDate: "1990-01-03" },
    ]

    return (
        <DataTable data={data} columns={columns} />
    )
};
````

Where data is the data to display and columns is the table columns

## Props

### data (required) : Object[]
- Each object in the array will represent a row in the table.
- Each object should have the same keys.

### columns (required) : Object[]
Each object will represent a columns.

2 required keys for each object:
- data: the key of the object in the data array
- title: the title of the column ( will be displayed in the header )

2 key are optional:
- type: the type of the column. It can be "date", "number" or "string". I strongly recommend to use it especially for date columns.
- customSortFn: a custom sort function for the column. It will override the default sort function. It will be called with 2 arguments: the 2 values to compare. sortOrder will be ignored

### config (optional) : Object
The configuration for the Data Table Component.
The config prop is optional. If you don't provide it, the table will use the default configuration.
If you want to override only some properties of the default configuration, you can provide only the properties you want to override.

If you are using TS, type it as ```Partial<DataTableConfig>```
#### defaultConfig :
```
const defaultConfig: DataTableConfig = {
  const defaultConfig: DataTableConfig = {
  search: true,
  pagination: true,
  rowsPerPageOptions: [5, 25, 50],
  sortable: true,
  dates: {
    format: "long",
    country: "fr-FR",
  },
};
```

### wrapperClassName (optional) : string
Add a class to the wrapper div of the component
### tableClassName (optional) : string
Add a class to the div that contains the table
### searchWrapperClassName (optional) : string
Add a class to the div that contains the search input
### paginationWrapperClassName (optional) : string
Add a class to the div that contains the pagination buttons and the text "Showing..."
### tfootClassName (optional) : string
Add a class to footer of the table

## Types

If you are using typescript, you can import the types for the Data Table Component:

```
import { DataTableProps, DataTableConfig, TableColumns } from "./types/types";
```

## styles (optional) : Object
The table comes with a default basic style.