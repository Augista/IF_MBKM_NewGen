import { useEffect, useState } from "react";
import { useApi } from "./useApi";

export function useTableData<T>(defaultData?: T[], url?: string) {
  const [dataList, setDataList] = useState<T[]>(defaultData || []);
  const { data, loading } = useApi<T[]>(url || "");

  useEffect(() => {
    if (url && data) {
      setDataList(data);
    }
  }, [data, url]);

  return { dataList, isLoading: loading };
}
