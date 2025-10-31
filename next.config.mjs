/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, //enable the styled-components SWC compiler
  },
  //   devIndicators: {
  //   buildActivity: false,
  // },
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
