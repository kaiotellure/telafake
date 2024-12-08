import fs from "fs";
import { test, expect } from "vitest";

import { payment } from "./mercadopago";

test("fill pix-approved.json testdata.", async (t) => {
  const path = "testdata/pix-approved.json";
  if (fs.existsSync(path)) return t.skip();

  const data = await payment.get({ id: "95192355365" });
  expect(data).toBeDefined();

  fs.writeFileSync(path, JSON.stringify(data));
});
