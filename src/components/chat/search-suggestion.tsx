import React from "react";
import { Button } from "../ui/button";

const suggestion = [
  "Daftar lengkap mahasiswa (NIM, nama, kelas, prodi)",
  "Jumlah mahasiswa per kelas atau per prodi",
  "Profil mahasiswa berdasarkan atribut kelas dan prodi",
  "Daftar mata kuliah yang diambil oleh setiap mahasiswa",
  "Jumlah mata kuliah yang diambil per mahasiswa",
  "Detail mata kuliah: kode, nama, dosen pengampu",
  "Nilai yang diperoleh mahasiswa pada masing-masing mata kuliah, tampilkan nilai dalam bentuk huruf A sampai E",
  "Rata-rata nilai per mata kuliah dan per mahasiswa",
  "Mata kuliah dengan nilai tertinggi atau terendah",
  "Kinerja akademik mahasiswa (misalnya, ranking berdasarkan nilai rata-rata)",
  "Perbandingan performa antar prodi atau kelas berdasarkan nilai",
  "Analisis dosen dengan performa nilai mahasiswa tertinggi atau terendah",
  "Popularitas mata kuliah (berdasarkan jumlah mahasiswa yang mengambil)",
];

type Props = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchSuggestion = (props: Props) => {
  return (
    <div className="mt-6">
      <h3 className="font-title font-semibold text-lg block mb-4">
        Atau coba sugesti dibawah ini
      </h3>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
        {suggestion.map((s) => (
          <Button
            variant="outline"
            key={s}
            className="whitespace-break-spaces h-auto"
            onClick={() => props.setInputValue(s)}
          >
            {s}
          </Button>
        ))}
      </div>
    </div>
  );
};
