import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // 404 global para URLs desconhecidas: o layout raiz está sob [[...path]] (idioma vem da URL).
  experimental: { globalNotFound: true },
};

export default nextConfig;
