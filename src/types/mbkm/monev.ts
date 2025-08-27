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

  export enum StatusMonev {
    Ditolak = "Ditolak",
    Diterima = "Diterima",
    BelumDiverifikasi = "Belum Diverifikasi"
  }
  
  export type Monev = {
    id: string;
    nama: string;
    angkatan: string;
    tipeMbkm: TipeMbkm;
    pemonev: string;
    status: StatusMonev;
    monev: number;
  };

  export type Assesment = {
    id: string;
    nama: string;
    nrp: string;
    angkatan: string;
    tipeMbkm: TipeMbkm;
    jenisKegiatan: JenisKegiatan;
    status: StatusMonev;
    tujuan: string;
    jurusanStudi: string;
    deskripsiAktivitas: string;
    tanggalMulai: Date;
    tanggalSelesai: Date;
    durasi: number;
    modelKegiatan: ModelKegiatan;
    keterangan: string;
  };