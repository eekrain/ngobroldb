import { fakerID_ID as faker } from "@faker-js/faker"; // Menggunakan lokal Indonesia
import { db } from ".";
import { krsTable, mahasiswaTable } from "./schema";

const generateData = () => {
  const mahasiswaData: (typeof mahasiswaTable.$inferInsert)[] = Array.from(
    { length: 100 },
    (_, index) => {
      // List beberapa program studi
      const prodiList = [
        "Teknik Informatika",
        "Sistem Informasi",
        "Teknik Elektro",
        "Manajemen Informatika",
        "Teknik Mesin",
      ];

      // Ambil prodi berdasarkan indeks
      const prodi = prodiList[index % prodiList.length];

      // Buat inisial kelas berdasarkan prodi (ambil huruf pertama dari tiap kata prodi)
      const inisialKelas = prodi
        .split(" ")
        .map((word) => word[0])
        .join("");

      // Tentukan kelas dengan angka yang berputar dari 1-5
      const kelas = `${inisialKelas}-${(index % 5) + 1}`;

      // Generate NIM dengan format "17.11.xxxx"
      const nim = `17.11.${1700 + index}`;

      // Gunakan Faker untuk membuat nama Indonesia
      const nama = faker.person.fullName();

      return {
        nim,
        nama,
        kelas,
        prodi,
      };
    }
  );

  const mataKuliahList = [
    "Statistika & Probabilitas",
    "Kalkulus Ii",
    "Organisasi Sistem Komputer",
    "Pendidikan Kewarganegaraan",
    "Struktur Data & Algoritma",
    "Basis Data",
    "Desain & Analisis Algoritma",
    "Matematika Diskrit Ii",
    "Pemrograman Berorientasi Objek",
    "Sistem Operasi",
    "Kecerdasan Buatan",
    "Pemrograman Web",
    "Pengembangan Aplikasi Bergerak",
    "Rekayasa Perangkat Lunak",
    "Data Mining",
    "Machine Learning",
    "Manajemen Sistem Informasi",
    "Pengolahan Citra Digital",
    "Business Intelligence",
    "Cyber Security",
    "Jaminan Mutu Perangkat Lunak",
    "Kapita Selekta Ilmu Komputer",
    "Komputasi Cloud",
    "Metode Penelitian",
    "Pengamanan Data Multimedia",
    "Proyek Perangkat Lunak",
    "Teknik Multimedia",
    "E-commerce",
    "Etika Profesi",
    "Kecerdasan Komputasional",
  ].map((mataKuliah, index) => ({
    kode: `MK${100 + index}`,
    nama: mataKuliah,
    dosen: `Dr. ${faker.person.fullName()}`, // Nama dosen random
  }));

  const krsData: Omit<typeof krsTable.$inferInsert, "id">[] = [];

  mahasiswaData.forEach((mahasiswa) => {
    // Setiap mahasiswa memiliki 3-7 mata kuliah secara acak
    const jumlahMatkul = faker.number.int({ min: 3, max: 7 });
    const matkulDipilih = faker.helpers.arrayElements(
      mataKuliahList,
      jumlahMatkul
    );

    matkulDipilih.forEach((matkul) => {
      krsData.push({
        nimMahasiswa: mahasiswa.nim,
        kodeMataKuliah: matkul.kode,
        namaMataKuliah: matkul.nama,
        nilai: faker.number.int({ min: 0, max: 100 }), // Nilai antara 0-100
        dosen: matkul.dosen,
      });
    });
  });

  return { mahasiswaData, krsData };
};

const main = async () => {
  const { mahasiswaData, krsData } = generateData();
  console.log("🚀 ~ main ~ krsData:", krsData);

  await db
    .transaction(async (tx) => {
      await tx.insert(mahasiswaTable).values(mahasiswaData);
      await tx.insert(krsTable).values(
        krsData.map((val) => ({
          ...val,
        }))
      );
    })
    .catch((e) => {
      console.error("Error seeding database", e);
    })
    .finally(() => {
      console.log("Seeding finished");
    });
};

main();
