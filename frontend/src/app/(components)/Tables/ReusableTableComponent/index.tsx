import React, { useState } from "react";
import sortingObj, { SortDirection } from "./sorter";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import UseSorter from "./useSorter";

// import { User } from "@prisma/client";

type TableProps = {
  headers: any;
  rows: User[];
  loading: boolean;
  columns: any;
};

interface SortInfo {
  content: string;
  currentSortDir: SortDirection | undefined;
}

interface ArrowProps {
  sortDir: SortDirection | undefined;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

const Arrow = (props: ArrowProps) => {
  if (props.sortDir !== undefined) {
    return SortDirection.Ascending.valueOf() === props.sortDir.valueOf() ? (
      <FaArrowDown />
    ) : (
      <FaArrowUp />
    );
  }
  return null;
};

const toTitleCase = (str: any) => {
  if (!str) {
    return '';
  }
  const strArr = str.split(' ').map((word) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  });
  return strArr.join(' ');
}

const ReusableTableComponent = ({ headers, rows, loading, columns }: TableProps) => {
  const [sortedTable, setSortedTable, dir, setDir, key, setKey] = UseSorter<
  User
>(rows);
  const [data, setData] = useState(rows);
  const [sortInfo, setSortInfo] = useState<SortInfo>();
  
  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const currentbutton = e.target as HTMLButtonElement;
    const content = currentbutton.innerText.toLowerCase();

    const currentSortDir =
      sortInfo?.currentSortDir?.valueOf() === SortDirection.Ascending.valueOf()
        ? SortDirection.Descending
        : SortDirection.Ascending;

    setSortInfo({ content, currentSortDir });

    if (content && sortInfo?.currentSortDir !== undefined) {
      const sorted = sortingObj(
        data,
        content as keyof User,
        currentSortDir
      );
      setData(sorted);
    }
  };

  return (
    <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      {loading ? (
        <p>Saving Data please wait...</p>
      ) : (
        <table className="w-full text-left table-fixed min-w-max ">
          <thead>
            <tr>
              {columns?.map((column: any, index: number) => {
                return (
                  <th
                    key={columns[index].key}
                    className="p-4 border-b border-slate-500 bg-slate-300 items-center justify-center"
                  >
                    <button
                      className="flex items-center justify-center font-bold"
                      onClick={handleOnClick}
                    >
                      <span className="inline-flex items-center justify-evenly space-x-2  py-4">
                        <span>
                          <h1>{column.name} </h1>
                        </span>
                        <span className="">
                          {column.name.toLowerCase() === sortInfo?.content ? (
                            <Arrow sortDir={sortInfo?.currentSortDir} />
                          ) : null}
                        </span>
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data?.map((row: any, index: number) => {
              return (
              <tr key={index} className="hover:bg-blue-50">
                <td  className="p-4 border-b border-blue-gray-50 py-5">{row.id} </td>
                <td  className="p-4 border-b border-blue-gray-50 py-5">{toTitleCase(row.firstName)} </td>
                <td  className="p-4 border-b border-blue-gray-50 py-5">{toTitleCase(row.lastName)} </td>
                <td  className="p-4 border-b border-blue-gray-50 py-5">{row.createdAt} </td>
                <td className="p-4 border-b border-blue-gray-50 py-5">{row.updatedAt} </td>
                {/* {row.map((cell: any, index: number) => (
                  <td
                    key={cell.id}
                    className="p-4 border-b border-blue-gray-50 py-5"
                  >
                    {cell}
                  </td>
                ))} */}
              </tr>)
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReusableTableComponent;
