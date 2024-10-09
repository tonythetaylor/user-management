import { useEffect, useState } from "react";

export enum SortDirection {
  Ascending,
  Descending
}

export default function UseSorter<T>(
  data: T[]
): [
    T[],
    React.Dispatch<React.SetStateAction<T[]>>,
    SortDirection | undefined,
    React.Dispatch<React.SetStateAction<SortDirection | undefined>>,
    keyof T | undefined,
    React.Dispatch<React.SetStateAction<keyof T | undefined>>
  ] {
  const [dir, setDir] = useState<SortDirection>();
  const [sortedTable, setSortedTable] = useState<T[]>(data);
  const [key, setKey] = useState<keyof T>();

  useEffect(() => {
    if (key !== undefined && dir !== undefined) {
      const result = [...data].sort((a: T, b: T) => {
        if (key && dir?.valueOf() === SortDirection.Ascending.valueOf()) {
          console.log("Ascending");
          return a[key] < b[key] ? -1 : 1;
        }
        if (key && dir?.valueOf() === SortDirection.Descending.valueOf()) {
          console.log("Descending");
          return a[key] > b[key] ? -1 : 1;
        }
        return 0;
      });
      setSortedTable(result);
    }
  }, [sortedTable, dir, key]);

  return [sortedTable, setSortedTable, dir, setDir, key, setKey];
}
