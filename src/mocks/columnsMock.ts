import { ColumnType } from "../types/types";

export const columns: ColumnType[] = [
  { title: "First Name", data: "firstName" },
  { title: "Last Name", data: "lastName" },
  { title: "Start Date", data: "startDate", type: "date" },
  { title: "Department", data: "department" },
  { title: "Date of Birth", data: "dateOfBirth", type: "date" },
  { title: "Street", data: "street" },
  { title: "City", data: "city" },
  { title: "State", data: "state" },
  { title: "Zip Code", data: "zipCode" },
];
