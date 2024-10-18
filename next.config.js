const nextConfig = {
  images: {
    domains: ['/images',"artecampo.com.bo", 'scontent.flpb4-1.fna.fbcdn.net', 't1.uc.ltmcdn.com', 'jaimaalkauzar.es', 'i0.wp.com', 'www.boliviamall.com', 'us.cdn.eltribuno.com', 'i.etsystatic.com', 'i5.walmartimages.com','ethnoworldliving.com', 'dbhg6mekyuoi1.cloudfront.net', 'galeriaseltriunfo.com', 'artesaniadecastillalamancha.es', 'www.artesanum.com', 'f.fcdn.app', 'scontent.flpb4-1.fna.fbcdn.net', 'pbs.twimg.com' ,'media.sketchfab.com', 'm.media-amazon.com'] 
  },
};

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  nextConfig
});