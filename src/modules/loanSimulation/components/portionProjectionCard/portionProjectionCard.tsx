import moment from "moment"
import { MoneyMask, calcInterestRateReturn } from "../../../../utils"
import { Grid, Paper, Typography } from "@mui/material"

export const PortionProjectionCard = ({ paymentsPerMonth }: { paymentsPerMonth: calcInterestRateReturn["paymentsPerMonth"] }) => {
    return <Grid xs={12} maxHeight={"400px"} sx={{ overflowY: "auto" }}>
        {
            paymentsPerMonth.map(payment => {
                return <Paper elevation={3}>
                    <Grid container item marginTop={"0.5rem"} xs={12} spacing={2}>
                        <Grid item xs={6} display={"flex"} justifyContent={"center"} alignItems={"center"} direction={"column"}>
                            <Typography variant="h3" textAlign={"center"}>SALDO DO DEVEDOR</Typography>
                            <Typography variant="h4" textAlign={"center"} >{MoneyMask(payment.balance)}</Typography>
                        </Grid>
                        <Grid item xs={6} display={"flex"} justifyContent={"center"} alignItems={"center"} direction={"column"}>
                            <Typography variant="h3" textAlign={"center"}>JUROS</Typography>
                            <Typography variant="h4" textAlign={"center"} >{MoneyMask(payment.interestRate)}</Typography>
                        </Grid>
                        <Grid item xs={6} display={"flex"} justifyContent={"center"} alignItems={"center"} direction={"column"}>
                            <Typography variant="h3" textAlign={"center"}>SALDO DEVEDOR AJUSTADO</Typography>
                            <Typography variant="h4" textAlign={"center"} >{MoneyMask(payment.adjustedBalance)}</Typography>
                        </Grid>
                        <Grid item xs={6} display={"flex"} justifyContent={"center"} alignItems={"center"} direction={"column"}>
                            <Typography variant="h3" textAlign={"center"}>VALOR DA PARCELA</Typography>
                            <Typography variant="h4" textAlign={"center"} >{MoneyMask(payment.portion)}</Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} direction={"column"}>
                            <Typography variant="h3" textAlign={"center"}>VENCIMENTO</Typography>
                            <Typography variant="h4" textAlign={"center"} >{moment().add("months", payment.monthToPay).format("DD/MM/YY")}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            })
        }

    </Grid>
}