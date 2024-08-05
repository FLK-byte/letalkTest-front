import VMasker from "vanilla-masker";

export const CpfMask = (value: string) => {
  const pattern = "999.999.999-99";
  return VMasker.toPattern(value, pattern);
};

export const CpfMaskRemove = (value: string) => {
  return value.replace(CpfReplaceRegex, "");
};

export const CpfRegex = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}$/;

export const CpfReplaceRegex = /[.-]/g;