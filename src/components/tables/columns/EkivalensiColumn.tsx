import { ColumnDef } from "@tanstack/react-table"
import { Ekivalensi } from "@/types/ekivalensi/ekivalensi"

export const ekivalensiColumns: ColumnDef<Ekivalensi>[] = [
    {
        accessorKey: "kode",
        header: "Kode",
    },
    {
        accessorKey: "mataKuliah",
        header: "Mata Kuliah",
    },
    {
        accessorKey: "semester",
        header: "Semester",
    },
    {
        accessorKey: "tahunAkademik",
        header: "Tahun Akademik",
    },
    {
        accessorKey: "prodiPenyelenggara",
        header: "Prodi Penyelenggara",
    },
    {
        accessorKey: "sks",
        header: "SKS",
    },
    {
        accessorKey: "kelas",
        header: "Kelas",
    },
    {
        accessorKey: "departemen",
        header: "Departemen",
    },
    {
        accessorKey: "tipe",
        header: "Tipe Mata Kuliah",
    },
    {
        accessorKey: "nilai",
        header: "Nilai",
    },
]