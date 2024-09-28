import React, { useState } from "react";
import * as XLSX from "xlsx";

import { User } from "@prisma/client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import FileUploadComponent from "../FileUpload/FileUploadComponent";
import ReusableTableComponent from "./ReusableTableComponent";
// import { UserProps, createBulkUsers } from "../../actions/users";
const TableComponent = (data: any) => {
  const { data: session } = useSession();

  if (!session) {
    redirect('/signin')
  }
  const { token } = session?.user as any


  console.log(session)
  // file
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState("");

  const headers = Object.keys(data?.data?.data[0]);
  // console.log('headers', headers)
  const rows = data?.data?.data.map((item: string) => Object.values(item));

  return (
    <>
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
          <div className="flex flex-col gap-2 shrink-0 sm:flex-row">

            <FileUploadComponent />

          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Generated List for this Month</h3>

            <p className="text-slate-500">Overview of the participants.</p>
          </div>
          <div className="ml-3">
            <div className="w-full max-w-sm min-w-[200px] relative">
              <div className="relative">
                <input
                  className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                  placeholder="Search participants..."
                />
                <button
                  className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </button>
              </div>

            </div>
          </div>

          {/* TODO: User profile will go here */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800">{token?.fullname}</h3>
          </div>
        </div>
        <ReusableTableComponent
          headers={headers}
          rows={rows}
          loading={loading}
        />
      </div>
    </>
  );
};

export default TableComponent;