export type Activity = {
  id: string
  mbkmId: string
  cpmk: string            
  pekan: number
  tanggalMulai: string    
  tanggalSelesai: string
  durasi: number
  kegiatan: string
  bukti: string          
  file?: File        
  buktiFile?: File        
}
