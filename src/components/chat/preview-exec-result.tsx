"use client";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { TableView } from "../table-view";
import { Result } from "@/app/types";

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
