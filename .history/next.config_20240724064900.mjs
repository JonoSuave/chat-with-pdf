/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'i.i.com',
              port: '',
              pathname: '/account123/**',
            },],
    },
};

export default nextConfig;
