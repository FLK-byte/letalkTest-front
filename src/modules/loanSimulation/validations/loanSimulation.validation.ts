import * as yup from "yup";
import { INPUT_ERRORS } from "../../../utils/contants";

export const loanSimulationValidation = yup.object().shape({
    cpf: yup.string().required(INPUT_ERRORS.INPUT_ERROR_REQUIRED),
    uf: yup.string().required(INPUT_ERRORS.INPUT_ERROR_REQUIRED),
    bornDate: yup.string().required(INPUT_ERRORS.INPUT_ERROR_REQUIRED),
    valueToLoan: yup.string().required(INPUT_ERRORS.INPUT_ERROR_REQUIRED),
    valueToPayPerMonth: yup.string().required(INPUT_ERRORS.INPUT_ERROR_REQUIRED),
})