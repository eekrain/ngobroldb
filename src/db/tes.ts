import { sql } from "drizzle-orm";
import { db } from ".";

// const tes = await db.execute(
//   sql`SELECT m.nama AS nama_mahasiswa, m.nim AS nim_mahasiswa, AVG(CASE WHEN k.nilai = 4 THEN 4 WHEN k.nilai = 3 THEN 3 WHEN k.nilai = 2 THEN 2 WHEN k.nilai = 1 THEN 1 ELSE 0 END) AS rata_rata_nilai FROM mahasiswa m JOIN krs k ON m.nim = k.nim_mahasiswa GROUP BY m.nama, m.nim`
// );
const tes = await db.execute(
  sql`SELECT nim_mahasiswa, AVG(nilai) AS rata_rata_nilai FROM krs GROUP BY nim_mahasiswa;`
);
console.log("🚀 ~ tes:", tes);
