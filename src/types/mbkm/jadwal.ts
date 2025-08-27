export type JadwalLecture = {
  id: string;
  tanggal: string;
  tempat: string;
  waktu: string[];
};

export type JadwalUser = {
  [x: string]: any;
  id: string;
  dosen: string;
  tanggal: string;
  tempat: string;
  waktu: string;
};