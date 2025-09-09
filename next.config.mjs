/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  // Strapi 폴더를 Next.js 빌드에서 제외
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      include: /strapi-cms/,
      use: 'ignore-loader',
    });
    return config;
  },
  // TypeScript 설정에서 Strapi 폴더 제외
  typescript: {
    ignoreBuildErrors: false,
  },
  // ESLint 설정에서 Strapi 폴더 제외
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src', 'pages', 'components'],
  },
};

export default nextConfig;