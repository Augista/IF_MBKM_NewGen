export enum TipeMbkm {
  Flagship = "Flagship",
  InternalITS = "Internal ITS"
}

export enum JenisKegiatan {
  Lomba = "Lomba",
  Penelitian = "Penelitian",
  Proyek = "Proyek",
  Wirausaha = "Wirausaha",
  MagangInternal = "Magang Internal",
  KknTematik = "KKN Tematik"
}

export enum ModelKegiatan {
  FullTime = "Full Time",
  PartTime = "Part Time"
}


export type MBKM = {
  id: string;
  nama: string;
  nrp: string;
  angkatan: string;
  tipeMbkm: TipeMbkm;
  jenisKegiatan: JenisKegiatan;
  tujuan: string;
  jurusanStudi: string;
  deskripsiAktivitas: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  durasi: number;
  modelKegiatan: ModelKegiatan;
  keterangan: string;
};