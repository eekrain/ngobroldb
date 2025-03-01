"use client";
import React, { useState } from "react";
import { PromptInput } from "./prompt-input";
import { SearchSuggestion } from "./search-suggestion";
import PulseLoader from "react-spinners/PulseLoader";
import { executeSQL, generateQuery, Result } from "@/app/action";
import { PreviewSQL } from "./preview-sql";
import { PreviewExecResult } from "./preview-exec-result";

type Props = {};

export const ChatForm = (props: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [activeQuery, setActiveQuery] = useState("");
  const [loadingExec, setLoadingExec] = useState(false);
  const [results, setResults] = useState<Result[]>([]);

  const handleSubmit = async (prompt?: string) => {
    const question = prompt ?? inputValue;
    if (inputValue.length === 0 && !question) return;
    setLoadingPrompt(true);
    setSubmitted(true);

    try {
      const query = await generateQuery(question);
      setActiveQuery(query);
      setLoadingPrompt(false);
      setLoadingExec(true);
      const results = await executeSQL(query);
      setResults(results);
    } catch (error) {
      console.error("🚀 ~ handleSubmit ~ error:", error);
    } finally {
      setLoadingPrompt(false);
      setLoadingExec(false);
    }
  };

  const resetPrompt = () => {
    setInputValue("");
    setSubmitted(false);
    setResults([]);
    setActiveQuery("");
    setLoadingExec(false);
    setLoadingPrompt(false);
  };

  return (
    <div>
      <PromptInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSubmit={handleSubmit}
        submitted={submitted}
        resetPrompt={resetPrompt}
      />
      {!submitted && (
        <SearchSuggestion
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      )}

      {submitted && (
        <PreviewSQL loading={loadingPrompt} activeQuery={activeQuery} />
      )}

      {submitted && (
        <PreviewExecResult loading={loadingExec} results={results} />
      )}
    </div>
  );
};
