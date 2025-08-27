export enum Semester {
    Ganjil = "Ganjil",
    Genap = "Genap"
}

export enum TipeMataKuliah {
    Wajib = "Wajib Prodi",
    Pilihan = "Pilihan Prodi"
}

export enum MataKuliah {
    Magang = "Magang",
    KP = "Kerja Praktik"
}

export type Ekivalensi = {
    id: string
    kode: string
    mataKuliah: MataKuliah
    semester: Semester
    tahunAkademik: string
    prodiPenyelenggara: string
    sks: number
    kelas: string
    departemen: string
    tipe: TipeMataKuliah
    nilai: number
}