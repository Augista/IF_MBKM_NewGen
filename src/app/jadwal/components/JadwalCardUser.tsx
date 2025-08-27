'use client'
import React, { useState } from "react"
import { useGetJadwalQuery } from "@/hooks/useGetJadwalQuery"
import { DataTable } from "@/components/tables/DataTable"
import TableCard from "@/components/tables/TableCard"
import { jadwalUserColumns } from "@/components/tables/columns/JadwalColumn"
import { BookModal } from "./BookModal"
import { useParams } from "next/navigation"

interface JadwalCardUserProps {
  className?: string
}

const JadwalCardUser: React.FC<JadwalCardUserProps> = ({ className = "" }) => {
  const { data = [], isLoading } = useGetJadwalQuery()

  const [selected, setSelected] = useState<string>("")
  const [waktuList, setWaktuList] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const params = useParams()
  const mbkmId = typeof params?.id === "string" ? params.id : ""

  return (
    <>
      <TableCard
        title="Penjadwalan Monev"
        className={className}
        TableComponent={
          <DataTable
            columns={jadwalUserColumns((jadwalId, waktuList) => {
              setSelected(jadwalId)
              setWaktuList(waktuList)
              setOpen(true)
            })}
            data={data}
            isLoading={isLoading}
          />
        }
      />

      <BookModal
        open={open}
        onClose={() => setOpen(false)}
        jadwalId={selected}
        waktuList={waktuList}
        mbkmId={mbkmId}
      />
    </>
  )
}

export default JadwalCardUser
