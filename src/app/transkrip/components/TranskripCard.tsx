'use client'
import React from "react";
import { GenericDataTable } from "@/components/tables/GenericDataTable";
import TableCard from "@/components/tables/TableCard";

const TranskripCard = ({
    className = "",
}) => {
    return (
        <TableCard
            title="Transkrip"
            uploadLabel="Upload Transkrip"
            uploadHref="/transkrip/form"
            TableComponent={<GenericDataTable type="Transkrip" />}
            className={className}
        />
    );
};

export default TranskripCard;