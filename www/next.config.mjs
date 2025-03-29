/** @type {import('next').NextConfig} */
const config = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json', // Đảm bảo Webpack xử lý file JSON
    });
    return config;
  },
  experimental: {
    esmExternals: 'loose',
  },
};

export default config;
