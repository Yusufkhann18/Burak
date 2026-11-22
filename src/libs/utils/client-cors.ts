import cors from "cors";

// Only the configured client origin may make credentialed browser requests.
export const clientCors = (origin = process.env.CLIENT_ORIGIN) =>
  cors({ origin: origin || false, credentials: true });
