import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  swcMinify: false,
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
