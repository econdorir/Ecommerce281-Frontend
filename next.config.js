const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'artecampo.com.bo',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.flpb4-1.fna.fbcdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 't1.uc.ltmcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'jaimaalkauzar.es',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'boliviamall.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'us.cdn.eltribuno.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.etsystatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i5.walmartimages.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ethnoworldliving.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dbhg6mekyuoi1.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'galeriaseltriunfo.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'artesaniadecastillalamancha.es',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'artesanum.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'f.fcdn.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.sketchfab.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'http2.mlstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.vajillassantis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.boliviamall.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.artesanum.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
    ],
  },
});
