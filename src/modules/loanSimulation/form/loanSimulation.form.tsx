import { Button, Grid, Paper, TextField, Typography } from "@mui/material"
import { applyPattern } from "../../../utils"

export const LoanSimulationForm = () => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, pattern: "CPF" | "MONEY") => {
        e.target.value = applyPattern({ value: e.target.value, pattern })
    }
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
                        <TextField fullWidth placeholder="CPF" onChange={(e) => {
                            onChange(e, "CPF")
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth placeholder="UF" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth placeholder="Data de nascimento" type="date" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth placeholder="Qual o valor do empréstimo" onChange={(e) => {
                            onChange(e, "MONEY")
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth placeholder="Qual o valor que deseja pagar por mês" onChange={(e) => {
                            onChange(e, "MONEY")
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth color={"warning"} variant={"contained"} type={"submit"}>
                            <Typography variant="button" color={"white"}>Simular</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
}