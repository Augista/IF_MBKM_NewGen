import MbkmCard from "./MbkmCard"

interface MbkmCardContainerProps {
  mbkmList: {
    id: string
    nama: string
    tipe_mbkm: string
    status: "menunggu" | "disetujui" | "ditolak"
    dosen_monev_nama?: string
  }[]
}

export const MbkmCardContainer = ({ mbkmList }: MbkmCardContainerProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mbkmList.map((mbkm, index) => (
        <MbkmCard
          key={mbkm.id}
          id={mbkm.id}
          title={mbkm.nama || `MBKM ke ${index + 1}`}
          nama={mbkm.nama}
          tipeMbkm={mbkm.tipe_mbkm}
          dosenMonevNama={mbkm.dosen_monev_nama}
          status={mbkm.status}
        />
      ))}
    </div>
  )
}
