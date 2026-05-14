import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["esbuild", "isolated-vm"],
};

export default nextConfig;
