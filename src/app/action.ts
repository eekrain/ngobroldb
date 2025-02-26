"use server";
import { db } from "@/db";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { sql } from "drizzle-orm";
import { z } from "zod";

export type Result = Record<string, string | number>;

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

const SYSTEM_PROMPT = `You are a SQL (postgres) and data visualization expert. Your job is to help the user write a SQL query to retrieve the data they need. The table schema is as follows:
CREATE TABLE "krs" (
	"id" serial NOT NULL,
	"nim_mahasiswa" varchar(10) NOT NULL,
	"kode_mata_kuliah" varchar(10) NOT NULL,
	"nama_mata_kuliah" varchar(100) NOT NULL,
	"nilai" integer NOT NULL,
	"dosen" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mahasiswa" (
	"nim" varchar(10) PRIMARY KEY NOT NULL,
	"nama" varchar(255) NOT NULL,
	"kelas" varchar(10) NOT NULL,
	"prodi" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "krs" ADD CONSTRAINT "krs_nim_mahasiswa_mahasiswa_nim_fk" FOREIGN KEY ("nim_mahasiswa") REFERENCES "public"."mahasiswa"("nim") ON DELETE cascade ON UPDATE no action;

Only retrieval queries are allowed.

For things like nim, nama, dosen and other string fields, use the ILIKE operator and convert both the search term and the field to lowercase using LOWER() function. For example: LOWER(industry) ILIKE LOWER('%search_term%').
`;

export const generateQuery = async (input: string) => {
  try {
    const result = await generateObject({
      model: openrouter("openai/gpt-3.5-turbo"),
      system: SYSTEM_PROMPT,
      prompt: `Generate the query necessary to retrieve the data the user wants: ${input}`,
      schema: z.object({
        query: z.string(),
      }),
    });

    return result.object.query;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate query");
  }
};

export const executeSQL = async (query: string) => {
  // Check if the query is a SELECT statement
  query = query.trim();
  const compare = query.toLowerCase();
  if (
    !compare.startsWith("select") ||
    compare.includes("drop") ||
    compare.includes("delete") ||
    compare.includes("insert") ||
    compare.includes("update") ||
    compare.includes("alter") ||
    compare.includes("truncate") ||
    compare.includes("create") ||
    compare.includes("grant") ||
    compare.includes("revoke")
  ) {
    throw new Error("Only SELECT queries are allowed");
  }

  let result: any;
  try {
    result = await db.execute(sql`${query}`);
    const x = await db.execute(sql`${query}`);
  } catch (error) {
    console.error("🚀 ~ executeSQL ~ error:", error);
    throw new Error("Failed to execute SQL");
  }

  return result.rows as Result[];
};
