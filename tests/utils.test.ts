import { expect, test } from "vitest";
import { nameSplit } from "../src/components/utils";

test("name splits correctly when provided a messy name full of discordenated spaces", () => {
  const [first, last] = nameSplit("  Cleber    Mendes  Pereira");
  expect(first).toBe("Cleber");
  expect(last).toBe("Mendes Pereira");
});
