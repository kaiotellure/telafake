import fs from "fs";
import { expect, test } from "vitest";

function extractFolderFromPath(path: string) {
  const splited = path.split("/");
  splited.length > 2 && splited.pop();

  return splited.join("/");
}

export function ensureDirectoryExistence(filePath: string) {
  const folder = extractFolderFromPath(filePath);
  fs.mkdirSync(folder, { recursive: true });

  return folder;
}

test("extractFolderFromPath should not return a dot when path isn't too deep.", () => {
  expect(extractFolderFromPath("./testdata")).toBe("./testdata");
});

export function saveTestdata(name: string, data: object) {
  ensureDirectoryExistence("tests/testdata");
  name = name.replace(/\s/g, "_");

  return fs.writeFileSync(
    "tests/testdata/" + name + ".json",
    JSON.stringify(data, null, 4),
  );
}
