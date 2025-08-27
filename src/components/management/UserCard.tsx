'use client'
import React from "react";
import { GenericDataTable } from "@/components/tables/GenericDataTable";
import TableCard from "@/components/tables/TableCard";

const UserCard = ({
    className = "",
}) => {
    return (
        <TableCard
            title="User"
            TableComponent={<GenericDataTable type="User" />}
            className={className}
        />
    );
};

export default UserCard;