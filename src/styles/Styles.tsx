export const Styles = () => {
  return (
    <style>
      {`
        .component-wrapper * {
            box-sizing: border-box;
        }
        
        .table-container{
            overflow-x: auto;
        }
        .table-container table{
            width: 100%;
            border-collapse: collapse;
        }
        .table-search-wrapper {
            margin-bottom: 0.5em;
        }
        .table-search-wrapper label{
            margin-right: 0.5em;
        }
        .table-container td, .table-container th {
            padding: 8px;
            border: 1px solid #ddd;
            white-space: nowrap;
        }
        
        .table-container th, .table-container tfoot, .table-container tr:nth-child(even), .tfoot-container {
            background-color: #f2f2f2;
        }
        
        .tfoot-container {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            align-items: center;
            padding: 8px;
        }
        .tfoot-container label {
            margin-right: 0.5em;
        }
        .tfoot-container select {
            padding: 0.4em;
            margin-right: 0.5em;
        }
        
        .tfoot-container .pagination {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        }
        .tfoot-container .pagination span {
            margin: 0.4em 0.4em 0.4em 0;
        }
        
        .tfoot-container button {
            padding: 5px 10px;
            margin-right: 0.5em;
            background-color: #ddd;
            border: none;
            cursor: pointer;
        }

        `}
    </style>
  );
};
