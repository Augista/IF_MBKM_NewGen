import { StatusCardContainer } from "./components/StatusCardContainer";
import { Header } from "../../components/Header";
import TableWrapper from "@/components/tables/TableWrapper";
import LogbookCard from "../logbook/components/LogbookCard";

const StudentDashboard = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col gap-8 p-8">
                <Header />
                <StatusCardContainer />
            </div>
            <TableWrapper CardComponent={LogbookCard} />
        </div >
    )
}

export default StudentDashboard