import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'], // 허용할 도메인 추가
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
