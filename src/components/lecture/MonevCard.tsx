'use client'
import React from "react";
import { GenericDataTable } from "@/components/tables/GenericDataTable";
import TableCard from "@/components/tables/TableCard";

const MonevCard = ({
    className = "",
}) => {
    return (
        <TableCard
            title="ListMBKM"
            TableComponent={<GenericDataTable type="ListMBKM" />}
            className={className}
        />
    );
};

export default MonevCard;