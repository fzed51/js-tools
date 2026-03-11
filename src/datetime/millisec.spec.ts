import { millisec } from "./millisec";

describe("millisec", () => {
  it("should accept numbers", () => {
    expect(millisec(1)).toBe(1);
    expect(millisec(1.5)).toBe(1.5);
  });
  it("should accept numbers as strings", () => {
    expect(millisec("1")).toBe(1);
    expect(millisec("1.5")).toBe(1.5);
  });
  it("should accept numbers as strings with a unit", () => {
    expect(millisec("1ms")).toBe(1);
    expect(millisec("1.5ms")).toBe(1.5);
  });
  it("should accept d, h, m, s and Ms in uppercase and lowercase", () => {
    expect(millisec("1ms")).toBe(1);
    expect(millisec("1Ms")).toBe(1);
    expect(millisec("1MS")).toBe(1);

    expect(millisec("1s")).toBe(1000);
    expect(millisec("1S")).toBe(1000);

    expect(millisec("1m")).toBe(60000);
    expect(millisec("1M")).toBe(60000);

    expect(millisec("1h")).toBe(3600000);
    expect(millisec("1H")).toBe(3600000);

    expect(millisec("1d")).toBe(86400000);
    expect(millisec("1D")).toBe(86400000);
  });

  it("should pass miscellaneous tests", () => {
    expect(millisec("1.5m")).toBe(90000);
    expect(millisec("-1.5m")).toBe(-90000);
  });
});
