const nextConfig =  {
  async headers() {
    return [
      {
        // apply only to the root HTML (index.html)
        source: '/',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; connect-src 'self'"
          }
        ]
      }
    ]
  }
}

export default nextConfig
