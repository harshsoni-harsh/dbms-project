/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    return {
      ...config,
      optimization: {
        ...config.optimization,
        minimize: false,
      },
    };
  },
};

export default nextConfig;
