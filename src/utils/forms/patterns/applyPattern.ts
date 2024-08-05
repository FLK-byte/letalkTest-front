import { CpfMask } from "../masks/cpf/Cpf.mask"
import { MoneyMask } from "../masks/money/Money.mask"

export const applyPattern = ({pattern, value} : {pattern: "CPF" | "MONEY" | "", value: string}): string => {
    switch (pattern) {
        case "CPF":
            return CpfMask(value)
        case "MONEY":
            return MoneyMask(value)
        default:
            return value;
    }
}