/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Generates static HTML files
  images: {
    unoptimized: true, // Required for static export — disables server-side image optimization
  },
};

export default nextConfig;
