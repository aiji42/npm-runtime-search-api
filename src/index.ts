import { Hono } from "hono";
import { NpmsSearchResult } from "./types/npms-api";
import { NpmPackageJson } from "./types/registry-npm-org";
import { recursivelyFindRuntime } from "./libs/findRuntime";

const app = new Hono();

app.get("/", async (c) => {
  const query = c.req.query("q");
  const size = 10;
  const page = c.req.query("page") ?? "1";
  const from = (Number(page) - 1) * size;

  const npmSearchResponse = await fetch(
    `https://api.npms.io/v2/search?q=${query}&size=${size}&from=${from}`
  );
  const npmSearchResult = await npmSearchResponse.json<NpmsSearchResult>();

  const res = {
    total: npmSearchResult.total,
    results: await Promise.all(
      npmSearchResult.results.map(async (result) => {
        const npmPackageResult = await fetch(
          `https://registry.npmjs.org/${result.package.name}/${result.package.version}`
        );
        const npmPackageJson = await npmPackageResult.json<NpmPackageJson>();

        const runtimes = {
          node: false,
          browser: false,
          worker: false,
          deno: false,
          bun: false,
        };

        if (npmPackageJson.exports) {
          runtimes.node = recursivelyFindRuntime(
            npmPackageJson.exports,
            "require"
          );
          runtimes.browser = recursivelyFindRuntime(
            npmPackageJson.exports,
            "browser"
          );
          runtimes.worker =
            recursivelyFindRuntime(npmPackageJson.exports, "worker") ||
            recursivelyFindRuntime(npmPackageJson.exports, "worker_threads");
          runtimes.deno = recursivelyFindRuntime(
            npmPackageJson.exports,
            "deno"
          );
          runtimes.bun = recursivelyFindRuntime(npmPackageJson.exports, "bun");
        }

        return {
          name: result.package.name,
          description: result.package.description,
          version: result.package.version,
          date: result.package.date,
          link: result.package.links.npm,
          publisher: result.package.publisher.username,
          unstable: !!result.flags?.unstable,
          deprecated: !!result.flags?.deprecated,
          runtimes,
          score: result.score,
        };
      })
    ),
  };

  return c.json(res);
});

export default app;
