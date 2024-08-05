import { CpfMask } from "./Cpf.mask";

describe("CPF mask", () => {
  it("should return a valid CPF mask", () => {
    expect(CpfMask("00011100011")).toBe("000.111.000-11");
  });
});