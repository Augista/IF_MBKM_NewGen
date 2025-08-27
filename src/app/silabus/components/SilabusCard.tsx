'use client'
import React from "react";
import { GenericDataTable } from "@/components/tables/GenericDataTable";
import TableCard from "@/components/tables/TableCard";

const SilabusCard = ({
    className = "",
}) => {
    return (
        <TableCard
            title="Silabus"
            uploadLabel="Upload Silabus"
            uploadHref="/silabus/form"
            TableComponent={<GenericDataTable type="Silabus" />}
            className={className}
        />
    );
};

export default SilabusCard;