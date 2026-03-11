import { slugify } from "./slugify";

describe("slugify", () => {
  it("doit convertir en minuscules", () => {
    expect(slugify("HELLO")).toBe("hello");
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("doit remplacer les espaces par des tirets", () => {
    expect(slugify("hello world")).toBe("hello-world");
    expect(slugify("hello  world")).toBe("hello-world");
  });

  it("doit supprimer les accents", () => {
    expect(slugify("café")).toBe("cafe");
    expect(slugify("à bientôt")).toBe("a-bientot");
    expect(slugify("Ça va très bien")).toBe("ca-va-tres-bien");
  });

  it("doit supprimer les caractères spéciaux", () => {
    expect(slugify("hello, world!")).toBe("hello-world");
    expect(slugify("foo@bar.baz")).toBe("foo-bar-baz");
    expect(slugify("100% réussi")).toBe("100-reussi");
  });

  it("doit supprimer les tirets en début et fin de chaîne", () => {
    expect(slugify("  hello  ")).toBe("hello");
    expect(slugify("--hello--")).toBe("hello");
    expect(slugify("!hello!")).toBe("hello");
  });

  it("doit fusionner les séquences de caractères non alphanumériques en un seul tiret", () => {
    expect(slugify("hello---world")).toBe("hello-world");
    expect(slugify("hello   world")).toBe("hello-world");
    expect(slugify("hello !? world")).toBe("hello-world");
  });

  it("doit gérer une chaine vide", () => {
    expect(slugify("")).toBe("");
  });

  it("doit traiter une phrase complète", () => {
    expect(slugify("  L'été, c'est très agréable ! ")).toBe(
      "l-ete-c-est-tres-agreable",
    );
  });
});
