import * as yup from "yup";
import { INPUT_ERRORS } from "../../../utils/contants";
import { MoneyRemoveMask } from "../../../utils";

export const loanSimulationValidation = yup.object().shape({
    cpf: yup.string().required(INPUT_ERRORS.INPUT_ERROR_REQUIRED),
    uf: yup.string().required(INPUT_ERRORS.INPUT_ERROR_REQUIRED),
    bornDate: yup.string().required(INPUT_ERRORS.INPUT_ERROR_REQUIRED),
    valueToLoan: yup.string().required(INPUT_ERRORS.INPUT_ERROR_REQUIRED).test(
        'is-one-percent', 
        'O valor precisa ser maior ou igual a R$ 50.000,00', 
        function(value) {
          return Number(MoneyRemoveMask(value)) >= 50000;
        }
      ),
    valueToPayPerMonth: yup.string().required(INPUT_ERRORS.INPUT_ERROR_REQUIRED).test(
        'is-one-percent', 
        'O valor precisa representar no mínimo 1% do valor desejado para empréstimo', 
        function(value) {
          const { valueToLoan } = this.parent;
          return Number(MoneyRemoveMask(value)) >= Number(MoneyRemoveMask(valueToLoan)) * 0.01;
        }
      ),
})