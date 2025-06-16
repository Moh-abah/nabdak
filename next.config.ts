
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // أضف هذا السطر
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client', 'ffmpeg'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;