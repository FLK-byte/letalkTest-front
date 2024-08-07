import { Button, Divider, Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material"
import { AllBrazilStates, MoneyMask, MoneyRemoveMask, TaxPercentStates, calcInterestRate, calcInterestRateReturn } from "../../../../utils"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import moment from "moment"
import { PortionProjectionCard } from "../portionProjectionCard";

type ViewLoanSimulationProps = {
    totalLoanValue: string,
    loanValuePerMonth: string,
    uf: typeof AllBrazilStates[number],
    onClickLoan?: ({
        monthsPayed, paymentsPerMonth, totalIntRateSum
    }: calcInterestRateReturn) => void
}

export const ViewLoanSimulation = ({ totalLoanValue, loanValuePerMonth, uf, onClickLoan }: ViewLoanSimulationProps) => {
    const { monthsPayed, paymentsPerMonth, totalIntRateSum } = calcInterestRate({
        intRate: TaxPercentStates[uf.toLocaleUpperCase()],
        monthVal: Number(MoneyRemoveMask(loanValuePerMonth)),
        totalVal: Number(MoneyRemoveMask(totalLoanValue))
    })
    const theme = useTheme()
    const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));

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
                <Typography variant="h5" color={"textSecondary"}>PROJEÇÃO DAS PARCELAS:</Typography>
            </Grid>
        </Grid>
        {!lessThanSmall ? <Grid container marginTop={"3rem"} xs={12}>
            <Grid item xs={2}>
                <Typography variant="h3" textAlign={"center"}>SALDO DO DEVEDOR</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h3" textAlign={"center"}>JUROS</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="h3" textAlign={"center"}>SALDO DEVEDOR AJUSTADO</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h3" textAlign={"center"}>VALOR DA PARCELA</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h3" textAlign={"center"}>VENCIMENTO</Typography>
            </Grid>
            <Grid xs={12} marginTop={"0.5rem"} marginBottom={"0.5rem"}>
                <Divider />
            </Grid>
            <Grid xs={12} maxHeight={"400px"} sx={{ overflowY: "auto" }}>
                {
                    paymentsPerMonth.map(payment => {
                        return <>
                            <Grid container item marginTop={"0.5rem"} xs={12}>
                                <Grid item xs={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                    <Typography variant="h4" textAlign={"center"} >{MoneyMask(payment.balance)}</Typography>
                                </Grid>
                                <Grid item xs={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                    <Typography variant="h4" textAlign={"center"} >{MoneyMask(payment.interestRate)}</Typography>
                                </Grid>
                                <Grid item xs={3} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                    <Typography variant="h4" textAlign={"center"} >{MoneyMask(payment.adjustedBalance)}</Typography>
                                </Grid>
                                <Grid item xs={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                    <Typography variant="h4" textAlign={"center"} >{MoneyMask(payment.portion)}</Typography>
                                </Grid>
                                <Grid item xs={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                    <Typography variant="h4" textAlign={"center"} >{moment().add("months", payment.monthToPay).format("DD/MM/YY")}</Typography>
                                </Grid>
                            </Grid>
                            <Grid xs={12} marginTop={"0.5rem"} marginBottom={"0.5rem"}>
                                <Divider />
                            </Grid>
                        </>
                    })
                }

            </Grid>
        </Grid> : <PortionProjectionCard paymentsPerMonth={paymentsPerMonth} />}
        <Button
            fullWidth
            endIcon={<ArrowForwardIcon />}
            color="success"
            variant="contained"
            sx={{ marginTop: "1rem" }}
            onClick={() => onClickLoan && onClickLoan({ monthsPayed, paymentsPerMonth, totalIntRateSum })}
        >
            EFETIVAR O EMPRÉSTIMO
        </Button>
    </Paper>
}