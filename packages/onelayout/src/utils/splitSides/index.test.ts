import splitSides from ".";

describe("utils/splitSides", () => {
  it("split 1 value", () => {
    expect(splitSides("a")).toEqual(["a"]);
  });

  it("split 4 values", () => {
    expect(splitSides("a b c d")).toEqual(["a", "b", "c", "d"]);
  });

  it("trims values", () => {
    expect(
      splitSides(`  a
      b \t c    d
        `)
    ).toEqual(["a", "b", "c", "d"]);
  });

  it("does not split nested", () => {
    expect(splitSides(`10px clamp(20px, 10vw, 40px)`)).toEqual([
      "10px",
      "clamp(20px, 10vw, 40px)",
    ]);
  });

  it("does not split nested (advanced example)", () => {
    expect(
      splitSides(
        `var(--custom-variable, var(--another-custom-variable, min(10rem, 100rem))) clamp(20px, 10vw, var(--custom-variable, 40px))`
      )
    ).toEqual([
      "var(--custom-variable, var(--another-custom-variable, min(10rem, 100rem)))",
      "clamp(20px, 10vw, var(--custom-variable, 40px))",
    ]);
  });
});
