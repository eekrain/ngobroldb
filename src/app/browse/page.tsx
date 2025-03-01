"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrowseMahasiswa from "./browse-table";
import { PaginatedResponse } from "../types";

const fetchMahasiswa = async (
  currentPage: number,
  limitPerPage: number
): Promise<PaginatedResponse> => {
  try {
    const res = await fetch(
      `/api/getAllMahasiswa?currentPage=${currentPage}&limitPerPage=${limitPerPage}`
    );
    const val = await res.json();
    return val as PaginatedResponse;
  } catch (error) {
    console.error("Error fetching mahasiswa:", error);
    return { data: [], meta: { totalItems: 0, totalPages: 1 } };
  }
};

const fetchKrs = async (
  currentPage: number,
  limitPerPage: number
): Promise<PaginatedResponse> => {
  try {
    const res = await fetch(
      `/api/getAllKRS?currentPage=${currentPage}&limitPerPage=${limitPerPage}`
    );
    const val = await res.json();
    return val as PaginatedResponse;
  } catch (error) {
    console.error("Error fetching krs:", error);
    return { data: [], meta: { totalItems: 0, totalPages: 1 } };
  }
};

export default function BrowsePage() {
  return (
    <section className="container py-8">
      <Tabs defaultValue="mahasiswa">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mahasiswa">Mahasiswa</TabsTrigger>
          <TabsTrigger value="krs">KRS</TabsTrigger>
        </TabsList>
        <TabsContent value="mahasiswa">
          <BrowseMahasiswa
            title="Mahasiswa"
            description="List semua data mahasiswa"
            fetchData={fetchMahasiswa}
          />
        </TabsContent>
        <TabsContent value="krs">
          <BrowseMahasiswa
            title="KRS"
            description="List semua data KRS"
            fetchData={fetchKrs}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
