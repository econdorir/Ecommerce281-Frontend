import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DataTable = ({ data, columns, onDelete, idAccessor }) => {
  const renderCellValue = (value) => {
    if (typeof value === "object" && value !== null) {
      return value.url_imagen || JSON.stringify(value); // Adjust based on your actual data structure
    }
    return value;
  };

  return (
    <Table>
      <TableCaption>A list of your recent items.</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.accessor}>{column.header}</TableHead>
          ))}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell
                key={column.accessor}
                className={column.accessor === "amount" ? "text-right" : ""}
              >
                {renderCellValue(item[column.accessor])}
              </TableCell>
            ))}
            <TableCell>
              <button
                onClick={() => onDelete(item[idAccessor])} // Use the idAccessor to get the correct ID
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
