import { unaccented } from "./unaccented";

describe("unaccented", () => {
  it("doit retourner la chaine inchangée si elle ne contient pas d'accents", () => {
    expect(unaccented("hello")).toBe("hello");
    expect(unaccented("")).toBe("");
    expect(unaccented("abc123")).toBe("abc123");
  });

  it("doit supprimer les accents aigus", () => {
    expect(unaccented("é")).toBe("e");
    expect(unaccented("café")).toBe("cafe");
  });

  it("doit supprimer les accents graves", () => {
    expect(unaccented("è")).toBe("e");
    expect(unaccented("à")).toBe("a");
  });

  it("doit supprimer les accents circonflexes", () => {
    expect(unaccented("ê")).toBe("e");
    expect(unaccented("â")).toBe("a");
    expect(unaccented("î")).toBe("i");
    expect(unaccented("ô")).toBe("o");
    expect(unaccented("û")).toBe("u");
  });

  it("doit supprimer les trémas", () => {
    expect(unaccented("ë")).toBe("e");
    expect(unaccented("ï")).toBe("i");
    expect(unaccented("ü")).toBe("u");
    expect(unaccented("ÿ")).toBe("y");
  });

  it("doit supprimer les cédilles", () => {
    expect(unaccented("ç")).toBe("c");
    expect(unaccented("façade")).toBe("facade");
  });

  it("doit gérer les majuscules accentuées", () => {
    expect(unaccented("É")).toBe("E");
    expect(unaccented("À")).toBe("A");
    expect(unaccented("Ç")).toBe("C");
  });

  it("doit traiter une phrase complète", () => {
    expect(unaccented("Ça, c'est très intéressant !")).toBe("Ca, c'est tres interessant !");
  });
});
