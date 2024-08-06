import { Grid, Typography } from "@mui/material"
import { LoanSimulationForm } from "../form"
import { Formik } from "formik"
import { loanSimulationValidation } from "../validations"
import { toast } from "react-toastify"
import { ViewLoanSimulation } from "../components"
import { useState } from "react"
import { AxiosService } from "../../../services/api"
import moment from "moment"

export const LoanSimulationFragment = () => {
    const [formValues, setFormValues] = useState<undefined | {
        cpf: string,
        uf: string,
        bornDate: string,
        valueToLoan: string,
        valueToPayPerMonth: string,
    }>()

    return <Formik
        initialValues={{
            cpf: "",
            uf: "",
            bornDate: "",
            valueToLoan: "",
            valueToPayPerMonth: "",
        }}
        validationSchema={loanSimulationValidation}
        onSubmit={(values) => {
            setFormValues(values)
            toast("Empréstimo simulado com sucesso!", { type: "success" })
        }}
    >
        {props => {
            if (Object.keys(props.errors).length > 0) setFormValues(undefined)
            return <Grid
                height={"100%"}
                sx={{ width: { xs: "100%", md: "50%" } }}
            >
                <Grid xs={12}>
                    <Typography
                        variant={"h1"}
                        color={"textPrimary"}
                        marginTop={"3rem"}
                        textAlign={"center"}
                    >
                        Simule e solicite o seu empréstimo.
                    </Typography>
                    <LoanSimulationForm onChangeField={() => setFormValues(undefined)} />
                </Grid>
                {formValues && <Grid item xs={12}>
                    <Typography
                        marginTop={"3rem"}
                        textAlign={"center"}
                        variant="h2"
                    >
                        Veja a simulação para o seu empréstimo antes de efetivar
                    </Typography>
                    <ViewLoanSimulation
                        loanValuePerMonth={props.values.valueToPayPerMonth}
                        totalLoanValue={props.values.valueToLoan}
                        uf={props.values.uf}
                        onClickLoan={async ({ paymentsPerMonth }) => {
                            const response = await AxiosService.post("/loans", {
                                userInfo: {
                                    cpf: props.values.cpf,
                                    uf: props.values.uf,
                                    bornDate: moment(props.values.bornDate),
                                    valueToLoan: props.values.valueToLoan,
                                    valueToPayPerMonth: props.values.valueToPayPerMonth,
                                },
                                loansInfo: paymentsPerMonth.map((payPerMonth) => {
                                    return { ...payPerMonth, monthToPay: moment(payPerMonth.monthToPay) }
                                })
                            })
                            console.log(response)
                        }}
                    />
                </Grid>}
            </Grid>
        }}
    </Formik >
}