import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DataTable } from "./ReactTable";
import { TableCtxProvider } from "./context/TableContext";
import { mockEmployees } from "./mocks/mockEmployeesList";
import { columns } from "./mocks/columnsMock";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <TableCtxProvider>
      <DataTable data={mockEmployees} columns={columns} />
    </TableCtxProvider>
  </StrictMode>
);
