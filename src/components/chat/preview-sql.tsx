"use client";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

type Props = {
  loading: boolean;
  activeQuery: string;
};

export const PreviewSQL = ({ loading, activeQuery }: Props) => {
  if (loading)
    return (
      <div className="p-6 bg-slate-50 rounded-md mt-6">
        <div className="flex gap-2 items-baseline">
          <span>Generating SQL Query</span>
          <PulseLoader size={4} />
        </div>
      </div>
    );

  if (!loading && !activeQuery) return null;

  return (
    <div className="p-6 bg-slate-50 rounded-md mt-6">
      <p className="font-semibold text-lg mb-2 font-title">SQL Query</p>
      <p className="text-sm">
        {activeQuery.length === 0 ? "No SQL generated" : activeQuery}
      </p>
    </div>
  );
};
