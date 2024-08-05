import { Grid } from "@mui/material"
import { LoanSimulationFragment } from "../../modules/loanSimulation"

export const LoanSimulationScreen = () => {
    return <Grid sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        overflowY: "auto",
    }}>
        <LoanSimulationFragment />
    </Grid>
}