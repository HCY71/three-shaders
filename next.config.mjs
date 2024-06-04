/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify-loader"],
    });
    // Try disable HMR
    config.watchOptions = {
      poll: 300,
      aggregateTimeout: 300,
      ignored: /node_modules/,
    };
    return config;
  },
  // Try disable HMR
  devIndicators: {
    autoPrerender: false,
  },
};

export default nextConfig;
