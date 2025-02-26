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