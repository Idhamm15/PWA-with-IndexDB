import withPWA from 'next-pwa';

const nextConfig = withPWA({
  dest: 'public',
  disable: false,
//   disable: process.env.NODE_ENV === 'development', // Menonaktifkan PWA saat pengembangan
});

export default nextConfig;
