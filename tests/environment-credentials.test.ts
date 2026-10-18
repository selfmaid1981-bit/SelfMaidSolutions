import assert from "node:assert/strict";
import { test } from "node:test";
import { environmentCredentials } from "../server/environment-credentials";

test("credential groups require complete configuration and preserve Replit fallback", () => {
  const names = ["MIGRATION_TEST_KEY", "MIGRATION_TEST_SECRET"];
  const originals = Object.fromEntries([...names, "VERCEL"].map(name => [name, process.env[name]]));
  try {
    for (const name of [...names, "VERCEL"]) delete process.env[name];
    assert.equal(environmentCredentials(names), null);
    process.env.VERCEL = "1";
    assert.throws(() => environmentCredentials(names), /MIGRATION_TEST_KEY, MIGRATION_TEST_SECRET/);
    process.env.MIGRATION_TEST_KEY = "test-key";
    assert.throws(() => environmentCredentials(names), /Missing environment variables: MIGRATION_TEST_SECRET$/);
    process.env.MIGRATION_TEST_SECRET = " test-secret ";
    assert.deepEqual(environmentCredentials(names), ["test-key", "test-secret"]);
    delete process.env.VERCEL;
    delete process.env.MIGRATION_TEST_SECRET;
    assert.throws(() => environmentCredentials(names), /MIGRATION_TEST_SECRET/);
  } finally {
    for (const [name, value] of Object.entries(originals)) {
      if (value === undefined) delete process.env[name]; else process.env[name] = value;
    }
  }
});
