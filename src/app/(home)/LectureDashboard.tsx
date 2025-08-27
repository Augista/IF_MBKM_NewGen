import React from "react";
import { Header } from "@/components/Header";
import { FilterCard } from "../../components/lecture/FilterCard";
import TableWrapper from "@/components/tables/TableWrapper";
import MonevCard from "@/components/lecture/MonevCard";

const LectureDashboard = () => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-6 p-8 pb-0">
                <Header />

                <div className="w-full p-8 rounded-3xl border-muted-foreground shadow-[0_0px_24px_rgba(0,0,0,0.05)] flex flex-col">
                    <FilterCard />
                </div>
            </div>

            <TableWrapper CardComponent={MonevCard} />
        </div>
    );
};

export default LectureDashboard