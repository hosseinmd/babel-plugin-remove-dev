import path from "path";
import fs from "fs";
import { transformFileSync } from "@babel/core";
import removeDev from "../dist";

function trim(str) {
  return str.replace(/^\s+|\s+$/, "");
}
const fixturesDir = path.join(__dirname, "fixtures");

test("delete dev condition", () => {
  mapDirectory("production", (fixtureDir) => {
    const actual = transformFileSync(path.join(fixtureDir, "actual"), {
      plugins: [removeDev],
    }).code;
    const expected = transformFileSync(path.join(fixtureDir, "expected")).code;

    expect(trim(actual)).toEqual(trim(expected));
  });
});

test("keep dev condition", () => {
  mapDirectory("development", (fixtureDir) => {
    const actual = transformFileSync(path.join(fixtureDir, "actual"), {
      plugins: [removeDev],
    }).code;

    expect(trim(actual)).toEqual(trim(actual));
  });
});

function mapDirectory(env, testCallback) {
  fs.readdirSync(fixturesDir).map((caseName) => {
    // it(`should ${caseName.split("-").join(" ")}`, () => {
    process.env.NODE_ENV = env;
    const fixtureDir = path.join(fixturesDir, caseName);

    testCallback(fixtureDir);
  });
  // });
}
