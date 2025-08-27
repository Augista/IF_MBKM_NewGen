'use client'
import React from "react";
import { GenericDataTable } from "@/components/tables/GenericDataTable";
import TableCard from "@/components/tables/TableCard";

const EkivalensiCard = ({
    className = "",
}) => {
    return (
        <TableCard
            title="Ekivalensi"
            TableComponent={<GenericDataTable type="Ekivalensi" />}
            className={className}
        />
    );
};

export default EkivalensiCard;