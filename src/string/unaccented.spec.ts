import { unaccented } from "./unaccented";

describe("unaccented", () => {
  it("should return the string unchanged if it contains no accents", () => {
    expect(unaccented("hello")).toBe("hello");
    expect(unaccented("")).toBe("");
    expect(unaccented("abc123")).toBe("abc123");
  });

  it("should remove acute accents", () => {
    expect(unaccented("é")).toBe("e");
    expect(unaccented("café")).toBe("cafe");
  });

  it("should remove grave accents", () => {
    expect(unaccented("è")).toBe("e");
    expect(unaccented("à")).toBe("a");
  });

  it("should remove circumflex accents", () => {
    expect(unaccented("ê")).toBe("e");
    expect(unaccented("â")).toBe("a");
    expect(unaccented("î")).toBe("i");
    expect(unaccented("ô")).toBe("o");
    expect(unaccented("û")).toBe("u");
  });

  it("should remove umlauts", () => {
    expect(unaccented("ë")).toBe("e");
    expect(unaccented("ï")).toBe("i");
    expect(unaccented("ü")).toBe("u");
    expect(unaccented("ÿ")).toBe("y");
  });

  it("should remove cedillas", () => {
    expect(unaccented("ç")).toBe("c");
    expect(unaccented("façade")).toBe("facade");
  });

  it("should handle uppercase accented characters", () => {
    expect(unaccented("É")).toBe("E");
    expect(unaccented("À")).toBe("A");
    expect(unaccented("Ç")).toBe("C");
  });

  it("should handle a full sentence", () => {
    expect(unaccented("Ça, c'est très intéressant !")).toBe(
      "Ca, c'est tres interessant !",
    );
  });
});
