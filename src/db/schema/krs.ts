import {
  integer,
  pgTable,
  timestamp,
  varchar,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { mahasiswaTable } from "./mahasiswa";

export const krsTable = pgTable("krs", {
  id: serial(),
  nimMahasiswa: varchar({ length: 10 })
    .notNull()
    .references(() => mahasiswaTable.nim, { onDelete: "cascade" }),
  kodeMataKuliah: varchar({ length: 10 }).notNull(),
  namaMataKuliah: varchar({ length: 100 }).notNull(),
  nilai: integer().notNull(),
  dosen: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type Krs = typeof krsTable.$inferSelect;

export const krsRelations = relations(krsTable, ({ one }) => ({
  mahasiswa: one(mahasiswaTable, {
    fields: [krsTable.nimMahasiswa],
    references: [mahasiswaTable.nim],
  }),
}));
