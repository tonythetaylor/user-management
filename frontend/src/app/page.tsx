"use client";

import { useGetUsersQuery } from "@/state/api";
import TableComponent from "@/app/(components)/Tables/TableComponent";

const page = () => {
	const { data: users, isError, isLoading } = useGetUsersQuery();
	if ((!users)) return null

	return (
		<div className="w-full flex justify-between items-center mb-3 mt-1 pl-3 pr-3">
			<TableComponent data={users} />
		</div>
	);
};

export default page;