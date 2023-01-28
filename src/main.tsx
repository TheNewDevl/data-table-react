import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DataTable } from "./ReactTable";
import { TableCtxProvider } from "./context/TableContext";
import { noMissingDataEmployee } from "./mocks/mockEmployeesList";
import { columns } from "./mocks/columnsMock";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <TableCtxProvider>
      <DataTable data={noMissingDataEmployee} columns={columns} />
    </TableCtxProvider>
  </StrictMode>
);
