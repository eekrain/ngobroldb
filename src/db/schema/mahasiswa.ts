import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { krsTable } from "./krs";

export const mahasiswaTable = pgTable("mahasiswa", {
  nim: varchar({ length: 10 }).primaryKey(),
  nama: varchar({ length: 255 }).notNull(),
  kelas: varchar({ length: 10 }).notNull(),
  prodi: varchar({ length: 50 }).notNull(),
});
export type Mahasiswa = typeof mahasiswaTable.$inferSelect;

export const mahasiswaRelations = relations(mahasiswaTable, ({ many }) => ({
  krs: many(krsTable),
}));
