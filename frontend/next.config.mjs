/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === 'production' && {
    distDir: 'dist',
    output: 'export',
  }),
};

export default nextConfig;
