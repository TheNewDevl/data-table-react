import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { noMissingDataEmployees } from "./mocks/mockEmployees";
import { columns } from "./mocks/columnsMock";
import { DataTable } from "./index";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <DataTable data={noMissingDataEmployees} columns={columns} />
  </StrictMode>
);
