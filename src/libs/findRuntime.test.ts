import { ExportsObject, recursivelyFindRuntime } from "./findRuntime";

describe("recursivelyFindRuntime", () => {
  it("should detect runtimes correctly", () => {
    const exports1: ExportsObject = {
      ".": {
        types: "./dist/types/index.d.ts",
        deno: "./dist/browser/index.js",
        browser: "./dist/browser/index.js",
        worker: "./dist/browser/index.js",
        import: "./dist/node/esm/index.js",
        require: "./dist/node/cjs/index.js",
      },
      "./package.json": "./package.json",
    };

    const exports2: ExportsObject = {
      ".": {
        types: "./dist/types/index.d.ts",
        import: "./dist/index.js",
        require: "./dist/cjs/index.js",
      },
      "./http-exception": {
        types: "./dist/types/http-exception.d.ts",
        import: "./dist/http-exception.js",
        require: "./dist/cjs/http-exception.js",
      },
    };

    const exports3: ExportsObject = {
      development: "./index-with-devtools.js",
      production: "./index-optimized.js",
      node: "./wrapper-process-env.cjs",
      default: "./index-optimized.js",
    };

    expect(recursivelyFindRuntime(exports1, "deno")).toBeTruthy();
    expect(recursivelyFindRuntime(exports1, "browser")).toBeTruthy();
    expect(recursivelyFindRuntime(exports1, "worker")).toBeTruthy();
    expect(recursivelyFindRuntime(exports1, "require")).toBeTruthy();

    expect(recursivelyFindRuntime(exports2, "deno")).toBeFalsy();
    expect(recursivelyFindRuntime(exports2, "browser")).toBeFalsy();
    expect(recursivelyFindRuntime(exports2, "worker")).toBeFalsy();
    expect(recursivelyFindRuntime(exports2, "require")).toBeTruthy();

    expect(recursivelyFindRuntime(exports3, "deno")).toBeFalsy();
    expect(recursivelyFindRuntime(exports3, "browser")).toBeFalsy();
    expect(recursivelyFindRuntime(exports3, "worker")).toBeFalsy();
    expect(recursivelyFindRuntime(exports3, "node")).toBeTruthy();
  });
});
