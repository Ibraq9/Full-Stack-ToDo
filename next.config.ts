
// @ts-nocheck
// next.config.js
/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**", // allow all HTTPS domains
//         pathname: "/**",
//       },
//     ],
//   },
//   webpack: (config) => {
//     // Ignore Windows system directories
//     config.watchOptions = {
//       ...config.watchOptions,
//       ignored: [
//         '**/node_modules/**',
//         '**/.next/**',
//         '**/Application Data/**',
//         '**/Local Settings/**',
//         '**/Cookies/**',
//       ],
//     };
//     return config;
//   },
// };

// export default nextConfig;














import path from 'path';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent pdfkit from being bundled on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        stream: false,
        zlib: false,
        crypto: false,
      };
    }

    // Externalize pdfkit entirely from webpack
    config.externals = [...(config.externals || []), 'pdfkit'];

    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        "**/node_modules/**",
        "**/.next/**",
        "**/Cookies/**",
        "**/Application Data/**",
        "**/Local Settings/**",
      ],
    };

    return config;
  },
};

export default nextConfig;



