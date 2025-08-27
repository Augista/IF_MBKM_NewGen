'use client'
import React from "react"
import { useRouter } from "next/navigation"
import { useGetJadwalQuery } from "@/hooks/useGetJadwalQuery"
import { useDeleteJadwalMutation } from "@/hooks/useDeleteJadwalMutation"
import { DataTable } from "@/components/tables/DataTable"
import TableCard from "@/components/tables/TableCard"
import { jadwalLectureColumns } from "@/components/tables/columns/JadwalColumn"

const JadwalCardLecture = ({ className = "" }) => {
  const router = useRouter()
  const { data = [], isLoading } = useGetJadwalQuery()
  const deleteJadwal = useDeleteJadwalMutation()

  const handleDelete = (id: string) => {
    if (confirm("Yakin ingin menghapus jadwal ini?")) {
      deleteJadwal.mutate(id)
    }
  }

  return (
    <TableCard
      title="Penjadwalan Monev"
      uploadLabel="Tambah Jadwal"
      uploadHref="/jadwal/form"
      className={className}
      TableComponent={
        <DataTable
          columns={jadwalLectureColumns(router, handleDelete)}
          data={data}
          isLoading={isLoading}
        />
      }
    />
  )
}

export default JadwalCardLecture
