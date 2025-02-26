"use client";
import { Result } from "@/app/action";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

type Props = {
  loading: boolean;
  results: Result[];
};

export const PreviewExecResult = ({ loading, results }: Props) => {
  if (loading)
    return (
      <div className="p-6 bg-slate-50 rounded-md mt-6">
        <div className="flex gap-2 items-baseline">
          <span>Executing Generated SQL Query</span>
          <PulseLoader size={4} />
        </div>
      </div>
    );

  if (!loading && results.length === 0) return null;

  return (
    <div className="p-6 bg-slate-50 rounded-md mt-6">
      <p className="font-semibold text-lg mb-2 font-title">Execution Result</p>
      <TableView results={results} />
    </div>
  );
};

const TableView = ({ results }: { results: Result[] }) => {
  const columns = results.length > 0 ? Object.keys(results[0]) : [];

  const formatCellValue = (column: string, value: any) => {
    if (column.toLowerCase().includes("valuation")) {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        return "";
      }
      const formattedValue = parsedValue.toFixed(2);
      const trimmedValue = formattedValue.replace(/\.?0+$/, "");
      return `$${trimmedValue}B`;
    }
    if (column.toLowerCase().includes("rate")) {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        return "";
      }
      const percentage = (parsedValue * 100).toFixed(2);
      return `${percentage}%`;
    }
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    return String(value);
  };

  return (
    <Table className="min-w-full divide-y divide-border">
      <TableHeader className="bg-secondary sticky top-0 shadow-sm">
        <TableRow>
          {columns.map((column, index) => (
            <TableHead
              key={index}
              className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
            >
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="bg-card divide-y divide-border">
        {results.map((row, index) => (
          <TableRow key={index} className="hover:bg-muted">
            {columns.map((column, cellIndex) => (
              <TableCell
                key={cellIndex}
                className="px-6 py-4 whitespace-nowrap text-sm text-foreground"
              >
                {row[column]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
