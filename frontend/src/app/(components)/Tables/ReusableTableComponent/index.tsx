import React, { useState } from "react";
import sortingObj, { SortDirection } from "./sorter";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import { User } from "@prisma/client";

type TableProps = {
  headers: any
  rows: any
  loading: boolean
};

interface SortInfo {
  content: string;
  currentSortDir: SortDirection | undefined;
}

interface Column {
  name: string;
  key: keyof User;
}

interface ArrowProps {
  sortDir: SortDirection | undefined;
}

// const columns: Column[] = [
//   {
//     name: "Id",
//     key: "id"
//   },
//   {
//     name: "Age",
//     key: "age"
//   }
// ];


const Arrow = (props: ArrowProps) => {
  console.log("porps:", props);
  if (props.sortDir !== undefined) {
    return SortDirection.Ascending.valueOf() === props.sortDir.valueOf() ? (
      <FaArrowDown />
    ) : (
      <FaArrowUp />
    );
  }
  return null;
};

const ReusableTableComponent = ({ headers, rows, loading }: TableProps) => {
  const [data, setData] = useState(rows);
  const [sortInfo, setSortInfo] = useState<SortInfo>();

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const currentbutton = e.target as HTMLButtonElement;

    const content = currentbutton.innerText;

    const currentSortDir =
      sortInfo?.currentSortDir?.valueOf() === SortDirection.Ascending.valueOf()
        ? SortDirection.Descending
        : SortDirection.Ascending;

    setSortInfo({ content, currentSortDir });

    if (content && sortInfo?.currentSortDir !== undefined) {
      const sorted = sortingObj(
        rows,
        content.toUpperCase() as keyof User,
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
              {headers?.map((header: string) => {

                return (
                  <th key={header} className='p-4 border-b border-slate-500 bg-slate-300 items-center justify-center'>
                    <button
                      className="flex items-center justify-center font-bold pr-4 pl-4"
                      onClick={handleOnClick}>
                      <span className="inline-flex items-center justify-evenly space-x-2  py-4">
                        <span>
                          <h1>{header.toUpperCase()} </h1>
                        </span>
                        <span className="">
                          {header.toUpperCase() === sortInfo?.content ? (
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
            {data?.map((row: any, index: number) => (
              <tr key={index} className='hover:bg-blue-50'>
                {row.map((cell: string, index: number) => <td key={index} className='p-4 border-b border-blue-gray-50 py-5'>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
};

export default ReusableTableComponent;
