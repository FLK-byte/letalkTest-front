import { Grid, Typography } from "@mui/material"
import { LoanSimulationForm } from "../form"
import { Formik } from "formik"
import { loanSimulationValidation } from "../validations"
import { toast } from "react-toastify"

export const LoanSimulationFragment = () => {
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
            console.log(values)
            toast("Empréstimo solicitado com sucesso!", { type: "success" })
        }}
    >
        <Grid height={"100%"}>
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
    </Formik>
}