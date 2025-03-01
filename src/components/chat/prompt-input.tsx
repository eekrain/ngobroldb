"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TbZoomCode, TbTrash } from "react-icons/tb";
import { cn } from "@/lib/utils";

type Props = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (prompt?: string) => Promise<void>;
  submitted: boolean;
  resetPrompt: () => void;
};

export const PromptInput = ({
  inputValue,
  setInputValue,
  handleSubmit,
  submitted,
  resetPrompt,
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
          "relative w-full border border-input rounded-md bg-transparent overflow-hidden",
          isFocused && "ring-1 ring-ring outline-none"
        )}
      >
        <textarea
          id="prompt-input"
          placeholder="Tanyakan perihal yang anda ingin temukan."
          rows={3}
          className={cn(
            "flex w-full outline-none text-base placeholder:text-muted-foreground resize-none px-3 py-2"
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />

        <div className="flex gap-4 mx-3 py-2 border-t justify-end">
          {submitted && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="rounded-full"
                    variant="destructive"
                    onClick={resetPrompt}
                  >
                    <TbTrash className="scale-125" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset Prompt</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className={cn("rounded-full", !inputValue && "opacity-50")}
                >
                  <TbZoomCode className="scale-125" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {inputValue
                    ? "Generate SQL"
                    : "Enter a prompt to generate SQL"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </form>
  );
};
