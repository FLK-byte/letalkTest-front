import { Button, Grid, Paper, TextField, Typography } from "@mui/material"
import { applyPattern } from "../../../utils"
import { useFormikContext } from "formik"

export const LoanSimulationForm = () => {
    const { setFieldValue, handleSubmit, errors, touched, handleBlur } = useFormikContext<{
        cpf: string,
        uf: string,
        bornDate: string,
        valueToLoan: string,
        valueToPayPerMonth: string,
    }>()

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, pattern: "CPF" | "MONEY" | "") => {
        e.target.value = applyPattern({ value: e.target.value, pattern })
        setFieldValue(e.target.name, e.target.value)
    }
    console.log(errors, touched)
    return <Grid height={"100%"}>
        <Grid sx={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}>
            <Typography
                variant="h2"
                textAlign={"center"}
            >
                Preencha o formulário abaixo para simular
            </Typography>
        </Grid>
        <Grid marginTop={"1.5rem"} height={"100%"}>
            <Paper elevation={1} sx={{ padding: "3rem", height: "100%" }}>
                <Grid container height={"100%"} display={"flex"} wrap="wrap" xs={12}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="cpf"
                            placeholder="CPF*"
                            onBlur={handleBlur}
                            onChange={(e) => onChange(e, "CPF")}
                            error={!!errors.cpf && touched.cpf}
                            helperText={touched.cpf && errors.cpf}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="uf"
                            placeholder="UF*"
                            onBlur={handleBlur}
                            onChange={(e) => onChange(e, "")}
                            error={!!errors.uf && touched.uf}
                            helperText={touched.uf && errors.uf}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="bornDate"
                            onBlur={handleBlur}
                            onChange={(e) => onChange(e, "")}
                            type="date"
                            error={!!errors.bornDate && touched.bornDate}
                            helperText={touched.bornDate && errors.bornDate}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="valueToLoan"
                            placeholder="Qual o valor do empréstimo*"
                            onBlur={handleBlur}
                            onChange={(e) => onChange(e, "MONEY")}
                            error={!!errors.valueToLoan && touched.valueToLoan}
                            helperText={touched.valueToLoan && errors.valueToLoan}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="valueToPayPerMonth"
                            placeholder="Qual o valor que deseja pagar por mês*"
                            onBlur={handleBlur}
                            onChange={(e) => onChange(e, "MONEY")}
                            error={!!errors.valueToPayPerMonth && touched.valueToPayPerMonth}
                            helperText={touched.valueToPayPerMonth && errors.valueToPayPerMonth}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth color={"warning"} variant={"contained"} type={"submit"} onClick={() => handleSubmit()}>
                            <Typography variant="button" color={"white"}>Simular</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
}