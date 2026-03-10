import { millisec } from "./millisec";

describe("millisec", () => {
  it("doit accepter les number", () => {
    expect(millisec(1)).toBe(1);
    expect(millisec(1.5)).toBe(1.5);
  });
  it("doit accepter des number sous forme de chaine", () => {
    expect(millisec("1")).toBe(1);
    expect(millisec("1.5")).toBe(1.5);
  });
  it("doit accepter des number sous forme de chaine avec une unitée", () => {
    expect(millisec("1ms")).toBe(1);
    expect(millisec("1.5ms")).toBe(1.5);
  });
  it("doit accepter d, h, m, s et Ms sous forme majuscule et minuscule", () => {
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

  it("doit passer des test divers", () => {
    expect(millisec("1.5m")).toBe(90000);
    expect(millisec("-1.5m")).toBe(-90000);
  });
});
