import { Request } from "express";

// Explicit Bearer tokens take precedence over the browser cookie.
export const extractAccessToken = (req: Request): string | undefined => {
  const header = req.headers.authorization;
  if (typeof header === "string") {
    const match = /^Bearer\s+(\S+)\s*$/i.exec(header);
    if (match) return match[1];
  }
  const cookieToken = req.cookies?.["accessToken"];
  return typeof cookieToken === "string" && cookieToken
    ? cookieToken
    : undefined;
};
