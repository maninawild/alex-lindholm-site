import { pbkdf2Sync, randomBytes } from "node:crypto";
import { Redis } from "@upstash/redis";

const ITERATIONS = 210_000;

function currentCodes() {
  try {
    return JSON.parse(process.env.PRIVATE_ACCESS_CODES || "[]");
  } catch {
    throw new Error("PRIVATE_ACCESS_CODES is not valid JSON.");
  }
}

function createCode(label, page) {
  if (!label || !page) throw new Error("Usage: create <label> <page-id>");
  const codes = currentCodes();
  if (codes.some((entry) => entry.id === label)) {
    throw new Error(`A code with id '${label}' already exists.`);
  }

  const plaintext = `AXL-${randomBytes(12).toString("base64url")}`;
  const salt = randomBytes(16);
  const hash = pbkdf2Sync(plaintext, salt, ITERATIONS, 32, "sha256");
  const next = [
    ...codes,
    {
      id: label,
      label,
      salt: salt.toString("base64url"),
      hash: hash.toString("base64url"),
      pages: [page],
    },
  ];

  console.log(`\nAccess code (share once): ${plaintext}`);
  console.log("\nPRIVATE_ACCESS_CODES value:");
  console.log(JSON.stringify(next));
}

function revokeCode(id) {
  if (!id) throw new Error("Usage: revoke <code-id>");
  const codes = currentCodes();
  const next = codes.map((entry) =>
    entry.id === id ? { ...entry, revoked: true } : entry,
  );
  if (!codes.some((entry) => entry.id === id)) throw new Error(`Unknown code id '${id}'.`);
  console.log(JSON.stringify(next));
}

async function showUsage(id, page) {
  if (!id || !page) throw new Error("Usage: usage <code-id> <page-id>");
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Pull Vercel environment variables first.");
  const redis = new Redis({ url, token });
  const record = await redis.hgetall(`private:access:${id}:${page}`);
  console.log(record || { used: false });
}

const [command, first, second] = process.argv.slice(2);
if (command === "create") createCode(first, second);
else if (command === "revoke") revokeCode(first);
else if (command === "usage") await showUsage(first, second);
else {
  throw new Error("Commands: create <label> <page-id> | revoke <code-id> | usage <code-id> <page-id>");
}
