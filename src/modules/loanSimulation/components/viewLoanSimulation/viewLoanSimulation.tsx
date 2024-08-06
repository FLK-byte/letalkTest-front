import { Grid, Paper, Typography } from "@mui/material"
import { AllBrazilStates, MoneyMask, MoneyRemoveMask, TaxPercentStates, calcInterestRate } from "../../../../utils"

type ViewLoanSimulationProps = {
    totalLoanValue: string,
    loanValuePerMonth: string,
    uf: typeof AllBrazilStates[number]
}

export const ViewLoanSimulation = ({ totalLoanValue, loanValuePerMonth, uf }: ViewLoanSimulationProps) => {
    const { monthsPayed, paymentsPerMonth, totalIntRateSum } = calcInterestRate({
        intRate: TaxPercentStates[uf.toLocaleUpperCase()],
        monthVal: Number(MoneyRemoveMask(loanValuePerMonth)),
        totalVal: Number(MoneyRemoveMask(totalLoanValue))
    })
    console.log(monthsPayed, paymentsPerMonth, totalIntRateSum)
    return <Paper sx={{
        marginTop: "1rem",
        padding: "3rem"
    }} elevation={1}>
        <Grid container xs={12} spacing={2}>
            <Grid item display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} md={4} xs={12}>
                <Typography variant="h5" color={"textSecondary"} textAlign={"center"}>VALOR REQUERIDO:</Typography>
                <Typography variant="h2" textAlign={"center"}>{totalLoanValue}</Typography>
            </Grid>
            <Grid item display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} md={4} xs={12}>
                <Typography variant="h5" color={"textSecondary"} textAlign={"center"}>TAXA DE JUROS</Typography>
                <Typography variant="h2" textAlign={"center"}>{TaxPercentStates[uf.toLocaleUpperCase()]}% ao mês</Typography>
            </Grid>
            <Grid item display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} md={4} xs={12}>
                <Typography variant="h5" color={"textSecondary"} textAlign={"center"}>VALOR QUE DESEJA PAGAR POR MÊS</Typography>
                <Typography variant="h2" textAlign={"center"}>{loanValuePerMonth}</Typography>
            </Grid>
            <Grid item display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} md={4} xs={12}>
                <Typography variant="h5" color={"textSecondary"} textAlign={"center"}>TOTAL DE MESES PARA QUITAR</Typography>
                <Typography variant="h2" textAlign={"center"}>{monthsPayed} meses</Typography>
            </Grid>
            <Grid item display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} md={4} xs={12}>
                <Typography variant="h5" color={"textSecondary"} textAlign={"center"}>TOTAL DE JUROS</Typography>
                <Typography variant="h2" textAlign={"center"}>{MoneyMask(totalIntRateSum)}</Typography>
            </Grid>
            <Grid item display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} md={4} xs={12}>
                <Typography variant="h5" color={"textSecondary"} textAlign={"center"}>TOTAL A PAGAR</Typography>
                <Typography variant="h2" textAlign={"center"}>{MoneyMask(Number(MoneyRemoveMask(totalLoanValue)) + Number(totalIntRateSum))}</Typography>
            </Grid>
        </Grid>
        <Grid marginTop={"3rem"} xs={12}>
            <Grid xs={12}>
                <Typography variant="h5" color={"textSecondary"} textAlign={"center"}>PROJEÇÃO DAS PARCELAS:</Typography>
            </Grid>
        </Grid>
    </Paper>
}