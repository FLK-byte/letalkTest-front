import { Grid, Typography } from "@mui/material"
import { LoanSimulationForm } from "../form"

export const LoanSimulationFragment = () => {
    return <Grid height={"100%"}>
        <Grid height={"50%"}>
            <Typography
                variant={"h1"}
                color={"textPrimary"}
                marginTop={"3rem"}
                textAlign={"center"}
            >
                Simule e solicite o seu empréstimo.
            </Typography>

            <LoanSimulationForm />
        </Grid>
    </Grid>
}