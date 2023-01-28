import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DataTable } from "./ReactTable";
import { TableCtxProvider } from "./context/TableContext";
import { noMissingDataEmployees } from "./mocks/mockEmployees";
import { columns } from "./mocks/columnsMock";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <TableCtxProvider>
      <DataTable data={noMissingDataEmployees} columns={columns} />
    </TableCtxProvider>
  </StrictMode>
);
