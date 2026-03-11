import { slugify } from "./slugify";

describe("slugify", () => {
  it("should convert to lowercase", () => {
    expect(slugify("HELLO")).toBe("hello");
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("should replace spaces with hyphens", () => {
    expect(slugify("hello world")).toBe("hello-world");
    expect(slugify("hello  world")).toBe("hello-world");
  });

  it("should remove accents", () => {
    expect(slugify("café")).toBe("cafe");
    expect(slugify("à bientôt")).toBe("a-bientot");
    expect(slugify("Ça va très bien")).toBe("ca-va-tres-bien");
  });

  it("should remove special characters", () => {
    expect(slugify("hello, world!")).toBe("hello-world");
    expect(slugify("foo@bar.baz")).toBe("foo-bar-baz");
    expect(slugify("100% réussi")).toBe("100-reussi");
  });

  it("should trim leading and trailing hyphens", () => {
    expect(slugify("  hello  ")).toBe("hello");
    expect(slugify("--hello--")).toBe("hello");
    expect(slugify("!hello!")).toBe("hello");
  });

  it("should collapse sequences of non-alphanumeric characters into a single hyphen", () => {
    expect(slugify("hello---world")).toBe("hello-world");
    expect(slugify("hello   world")).toBe("hello-world");
    expect(slugify("hello !? world")).toBe("hello-world");
  });

  it("should handle an empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("should handle a full sentence", () => {
    expect(slugify("  L'été, c'est très agréable ! ")).toBe(
      "l-ete-c-est-tres-agreable",
    );
  });
});
