'use client'
import React from "react"
import { GenericDataTable } from "@/components/tables/GenericDataTable"
import TableCard from "@/components/tables/TableCard"

type LogbookCardProps = {
  className?: string
  data?: any[]
}

const LogbookCard = ({ className = "", data }: LogbookCardProps) => {
  return (
    <TableCard
      title="Logbook Kegiatan"
      uploadLabel="Tambah Kegiatan"
      uploadHref="/logbook/form"
      TableComponent={<GenericDataTable type="Logbook" data={data} />}
      className={className}
    />
  )
}

export default LogbookCard
