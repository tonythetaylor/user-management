import React, { useState } from "react";
import { User } from "@prisma/client";

type TableProps = {
     headers: any
     rows: any
     loading: boolean
  };
  
  const ReusableTableComponent = ({ headers, rows, loading }: TableProps) => {

    return (
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      {loading ? (
        <p>Saving Data please wait...</p>
      ) : (
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              {headers?.map(header => <th key={header} className='p-4 border-b border-slate-500 bg-slate-300'>
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  {header.toUpperCase()}
                </p>
              </th>)}
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, index) => (
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
