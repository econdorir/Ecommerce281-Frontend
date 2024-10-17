const nextConfig = {
  images: {
    domains: ["artecampo.com.bo", 'scontent.flpb4-1.fna.fbcdn.net'], 
  },
};

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  nextConfig
});