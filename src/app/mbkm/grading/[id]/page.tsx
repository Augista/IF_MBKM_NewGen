import Typography from "@/components/Typography";
import { StudentDataCardContainer } from "../../components/container/StudentDataCardContainer";
import FormGradingCard from "../../components/form/FormGradingCard";

export default function MbkmPage() {

    return (
        <div className="flex flex-col gap-8 p-8 min-h-screen">
            <Typography
                variant="h5"
                weight="semibold"
                className="text-3xl text-foreground"
            >
                Form Penilaian
            </Typography>
            <StudentDataCardContainer />

            <FormGradingCard />
        </div >
    )
}