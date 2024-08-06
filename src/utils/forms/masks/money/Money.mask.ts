import VMasker from "vanilla-masker";

export const MoneyMask = (value: string | number): string => {
  let parsedValue = value;
  if (typeof value === "number") {
    parsedValue = value.toFixed(2);
  }

  return VMasker.toMoney(parsedValue, {unit: "R$"});
};

export const MoneyRemoveMask = (value: string) => {
  return value.replace(MoneyReplaceRegex, "").replace("R$ ", "").replace(",", ".");
};

export const MoneyReplaceRegex = /[.]/gm;

export const MoneyRegex = /^(0|[1-9]\d{0,2}(\.\d{3})*),\d{2}$/;