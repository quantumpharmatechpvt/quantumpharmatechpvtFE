/**
 * @type {import('next').NextConfig}
 */


  const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://51.20.136.111:8000/api/:path*'
          }
        ];
      },
      output: 'standalone'
  }
   
  export default nextConfig
  
  