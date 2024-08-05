import { MoneyMask } from "./Money.mask";

describe("Money mask", () => {
  it("Should test a valid string money", () => {
    expect(MoneyMask("0.01")).toBe("0,01");
    expect(MoneyMask("0.10")).toBe("0,10");
    expect(MoneyMask("1.00")).toBe("1,00");
    expect(MoneyMask("10.00")).toBe("10,00");
    expect(MoneyMask("10.01")).toBe("10,01");
    expect(MoneyMask("10.10")).toBe("10,10");
  });

  it("Should test a valid decimal values", () => {
    expect(MoneyMask(0.01)).toBe("0,01");
    expect(MoneyMask(0.1)).toBe("0,10");
    expect(MoneyMask(1.0)).toBe("1,00");
    expect(MoneyMask(10.0)).toBe("10,00");
    expect(MoneyMask(10.01)).toBe("10,01");
    expect(MoneyMask(10.1)).toBe("10,10");
  });
});