import React from "react";
import { Header } from "@/components/Header";
import TableWrapper from "@/components/tables/TableWrapper";
import UserCard from "@/components/management/UserCard";

const ManagementDashboard = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="p-8 pb-0">
                <Header />
            </div>
            <TableWrapper className="flex-1" CardComponent={UserCard} />
        </div>
    );
};

export default ManagementDashboard