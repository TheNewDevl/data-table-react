import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DataTable } from "./ReactTable";
import { TableCtxProvider } from "./context/TableContext";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <TableCtxProvider>
      <DataTable />
    </TableCtxProvider>
  </StrictMode>
);
