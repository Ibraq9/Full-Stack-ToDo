
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














// import path from 'path';
// import { fileURLToPath } from 'url';



// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//         pathname: "/**",
//       },
//     ],
//   },
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       // Prevent pdfkit from being bundled on the client
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         fs: false,
//         path: false,
//         stream: false,
//         zlib: false,
//         crypto: false,
//       };
//     }

//     // Externalize pdfkit entirely from webpack
//     config.externals = [...(config.externals || []), 'pdfkit'];

//     config.watchOptions = {
//       ...config.watchOptions,
//       ignored: [
//         "**/node_modules/**",
//         "**/.next/**",
//         "**/Cookies/**",
//         "**/Application Data/**",
//         "**/Local Settings/**",
//       ],
//     };

//     return config;
//   },
// };

// export default nextConfig;



// // Source - https://stackoverflow.com/a/79313278
// // Posted by ANKIT NAYAK
// // Retrieved 2026-03-05, License - CC BY-SA 4.0







/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg"],
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
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        stream: false,
        zlib: false,
        crypto: false,
      };
    }

    config.externals = [...(config.externals || []), "pdfkit"];

    return config;
  },
};

export default nextConfig;