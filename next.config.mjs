/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/member',
            permanent: true,
          },
        ]
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.amazonaws.com',

          },
        ],
      },
};

export default nextConfig;
