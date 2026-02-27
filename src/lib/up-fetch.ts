import { up } from "up-fetch";

/**
 * Pre-configured up-fetch instance for the Corekt API.
 *
 * Features:
 * - Automatic JSON parsing and body serialization
 * - Zod validation validation via `validation` option
 * - Query parameters via `params` option
 * - Throws `ResponseError` on HTTP >= 400
 *
 * @example
 * // Untyped
 * const data = await upfetch("/auth/login", { method: "POST", body: payload });
 *
 * @example
 * // Typed + validated
 * const data = await upfetch("/user/me", {
 *   validation: z.object({ username: z.string(), email: z.string() }),
 * });
 *
 * @example
 * // Query params
 * const data = await upfetch("/items", { params: { page: 1, limit: 20 } });
 */
export const upfetch = up(fetch, () => ({
  baseUrl: process.env.COREKT_BACKEND_URL ?? "",
}));
