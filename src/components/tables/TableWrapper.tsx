type TableWrapperProps = {
  CardComponent: React.ComponentType<{ className?: string; data?: any[] }>
  className?: string
  data?: any[]
  jadwalId?: string
}

const TableWrapper = ({ CardComponent, className = "", data = [] }: TableWrapperProps) => {
  return (
    <div className={`p-8 flex flex-col gap-8 ${className}`}>
      <CardComponent className="flex-1" data={data} />
    </div>
  )
}

export default TableWrapper
