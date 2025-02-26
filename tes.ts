import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { z } from "zod";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

const INPUT_PROMPT = "Rata-rata nilai per mahasiswa berdasarkan mata kuliah";

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

const result = await generateObject({
  model: openrouter("openai/gpt-3.5-turbo"),
  system: SYSTEM_PROMPT,
  prompt: `Generate the query necessary to retrieve the data the user wants: ${INPUT_PROMPT}`,
  schema: z.object({
    query: z.string(),
  }),
});

console.log(result);
