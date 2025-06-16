/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client', 'ffmpeg'],
  },
  images: {
    domains: ['localhost'], // أضف دومينات الصور إذا لزم الأمر
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // إصلاح مشكلة prerendering
  webpack: (config) => {
    // حل مشكلة leaflet
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });

    // حل مشكلة window
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      window: false,
      child_process: false
    };

    return config;
  },
};

module.exports = nextConfig;