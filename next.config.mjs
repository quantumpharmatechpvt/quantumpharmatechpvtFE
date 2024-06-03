/**
 * @type {import('next').NextConfig}
 */


  const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://13.48.249.192:8000/api/:path*'
          }
        ];
      },
      output: 'standalone'
  }
   
  export default nextConfig
  
  