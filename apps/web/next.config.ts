import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@specter/ui', '@specter/shared-types', '@specter/encryption'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'date-fns'],
  },
};

export default nextConfig;
