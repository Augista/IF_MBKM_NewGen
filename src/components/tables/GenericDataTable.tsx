import { DataTable } from "@/components/tables/DataTable";
import { documentColumnsTable } from "@/components/tables/columns/DocumentColumnTable";
import { ColumnDef } from "@tanstack/react-table";
import { columnsActivityLogbook } from "@/components/tables/columns/ActivityColumn";
import { MataKuliah, Semester, TipeMataKuliah } from "@/types/ekivalensi/ekivalensi";
import { ekivalensiColumns } from "@/components/tables/columns/EkivalensiColumn";
import { useTableData } from "@/hooks/useTableData";
import { Role } from "@/types/role/role";
import { TipeMbkm } from "@/types/mbkm/mbkm";
import { StatusMonev } from "@/types/mbkm/monev";
import { monevColumns } from "./columns/MonevColumn";
import { userColumns } from "./columns/RoleColumn";
import { useRouter } from "next/navigation";
import { jadwalLectureColumns, jadwalUserColumns } from "./columns/JadwalColumn";
import router from "next/router";
import { silabusColumns } from "./columns/SilabusColumn";
import { transkripColumns } from "./columns/TranskripColumn";
import { listmbkmColumns } from "./columns/ListMBKMColumn";

type TableType = "ListMBKM" | "Silabus" | "Transkrip" | "Logbook" | "Ekivalensi" | "Monev" | "User";

type Props = {
  type: TableType;
  role?: "Mahasiswa" | "Dosen" | "Management";
  data?: any[]; // ✅ Tambahkan ini
};

export const GenericDataTable = ({ type, role = "Mahasiswa", data }: Props) => {
  const isLogbook = type === "Logbook";
  const isSilabus = type === "Silabus";
  const isTranskrip = type === "Transkrip";
  const isListMBKM = type === "ListMBKM";

  const dummyData: Record<TableType, any[]> = {
    Silabus: [], // keep your dummy
    Transkrip: [],
    Logbook: [],
    Ekivalensi: [],
    Monev: [],
    ListMBKM: [],
    User: [],
  };

  const useCustomData = !!data;

  const { dataList, isLoading } = useTableData(
    useCustomData ? undefined : isLogbook || isSilabus ? undefined : dummyData[type],
    useCustomData
      ? undefined
      : isLogbook
      ? "/api/logbook"
      : isSilabus
      ? "/api/silabus"
      : isTranskrip
      ? "/api/transkrip"
      : isListMBKM
      ? "/api/listmbkm"
      : undefined
  );

  const finalData = useCustomData ? data : dataList;

  const router = useRouter();

  const columns: ColumnDef<any>[] = (() => {
    switch (type) {
      case "Logbook":
        return columnsActivityLogbook;
      case "Ekivalensi":
        return ekivalensiColumns;
      case "ListMBKM":
        return listmbkmColumns(router);
      case "Monev":
        return monevColumns(router);
      case "User":
        return userColumns(router);
      case "Transkrip":
        return transkripColumns(handleEdit);
      case "Silabus":
        return silabusColumns(handleEdit);
      default:
        return documentColumnsTable(type);
    }
  })();

  return (
    <DataTable
      columns={columns}
      data={finalData}
      isLoading={isCustomDataLoading(useCustomData, isLoading)}
      searchColumns={["User", "Monev"].includes(type)}
      searchNameColumn={["User", "Monev"].includes(type) ? "nama" : undefined}
    />
  );
};

// Helper to determine loading status
const isCustomDataLoading = (useCustomData: boolean, fallbackLoading: boolean) => {
  return useCustomData ? false : fallbackLoading;
};
function handleEdit(data: any): void {
    throw new Error("Function not implemented.");
}

