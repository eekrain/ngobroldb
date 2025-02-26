"use client";
import React from "react";
import { Button } from "../ui/button";
import { TbZoomCode } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

type Props = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (prompt?: string) => Promise<void>;
};

export const PromptInput = ({
  inputValue,
  setInputValue,
  handleSubmit,
}: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit();
      }}
    >
      <Label
        htmlFor="prompt-input"
        className="font-title font-semibold text-2xl text-center block mb-4"
      >
        Apa yang bisa saya bantu?
      </Label>

      <div
        className={cn(
          "relative w-full border border-input rounded-md bg-transparent overflow-hidden pb-12",
          isFocused && "ring-1 ring-ring outline-none"
        )}
      >
        <textarea
          id="prompt-input"
          placeholder="Tanyakan perihal yang anda ingin temukan."
          rows={3}
          className={cn(
            "flex w-full outline-none text-base placeholder:text-muted-foreground resize-none px-3 pt-2"
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />

        <Button size="icon" className="rounded-full absolute bottom-2 right-2">
          <TbZoomCode className="scale-125" />
        </Button>
      </div>
    </form>
  );
};
