import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** За next-auth клиент: инаку NEXTAUTH_URL често е празен во bundle и сејавуваат грешки при сесија. */
  env: {
    NEXTAUTH_URL:
      process.env.AUTH_URL ||
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000",
  },
};

export default nextConfig;
