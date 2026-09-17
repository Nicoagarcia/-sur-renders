import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  images: {
    // Next 16 solo admite 75 por defecto; los renders del portfolio se sirven
    // a 85 para conservar el detalle fotográfico.
    qualities: [75, 85],
  },
  // Fijar la raíz del workspace (hay otro lockfile en el home del usuario).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
