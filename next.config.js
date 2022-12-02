// const withPWA = require('next-pwa')
// const runtimeCaching = require('next-pwa/cache')

const withPWA = require("next-pwa")({
	dest: "public",
	// put other next-pwa options here
  });
  
  const nextConfig = withPWA({
	reactStrictMode: true,
	// put other next js options here
  });
  
  module.exports = nextConfig;

// module.exports = withPWA({
// 	pwa: {
// 		dest: 'public',
// 		runtimeCaching,
// 	},
// })
