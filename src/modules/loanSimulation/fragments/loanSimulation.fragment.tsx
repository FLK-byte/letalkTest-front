import { Grid, Typography } from "@mui/material"
import { LoanSimulationForm } from "../form"
import { Formik, FormikProps } from "formik"
import { loanSimulationValidation } from "../validations"
import { toast } from "react-toastify"
import { ViewLoanSimulation } from "../components"
import { useState } from "react"
import { AxiosService } from "../../../services/api"
import moment from "moment"
import { CpfMaskRemove, MoneyRemoveMask, calcInterestRateReturn } from "../../../utils"

type FormProps = {
    cpf: string;
    uf: string;
    bornDate: string;
    valueToLoan: string;
    valueToPayPerMonth: string;
}

export const LoanSimulationFragment = () => {
    const [formValues, setFormValues] = useState<undefined | {
        cpf: string,
        uf: string,
        bornDate: string,
        valueToLoan: string,
        valueToPayPerMonth: string,
    }>()

    const concludeLoan = async ({ paymentsPerMonth, props }: { paymentsPerMonth: calcInterestRateReturn["paymentsPerMonth"], props: FormikProps<FormProps> }) => {
        try {
            const { data } = await AxiosService.post("/loans", {
                userInfo: {
                    cpf: CpfMaskRemove(props.values.cpf),
                    uf: props.values.uf,
                    bornDate: moment(props.values.bornDate),
                    valueToLoan: Number(MoneyRemoveMask(props.values.valueToLoan)),
                    valueToPayPerMonth: Number(MoneyRemoveMask(props.values.valueToPayPerMonth)),
                },
                loansInfo: paymentsPerMonth.map((payPerMonth) => {
                    return {
                        adjustedBalance: payPerMonth.adjustedBalance,
                        balance: Number(MoneyRemoveMask(payPerMonth.balance)),
                        interestRate: Number(MoneyRemoveMask(payPerMonth.interestRate)),
                        monthToPay: moment().add("months", payPerMonth.monthToPay),
                        portion: payPerMonth.portion
                    }
                })
            })
            if (data) toast("Empréstimo realizado com sucesso", { type: "success" })
        } catch (responseError) {
            const { response: { data } } = responseError as unknown as { response: { data: { message: string } } }
            toast(data.message, { type: "error" })
        }
    }

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
                        onClickLoan={async ({ paymentsPerMonth }) => concludeLoan({ paymentsPerMonth, props })}
                    />
                </Grid>}
            </Grid>
        }}
    </Formik >
}