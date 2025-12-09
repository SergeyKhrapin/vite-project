export default function handler(req, res) {
  const { cookies = "", headers = "", query = "", body = ""} = req

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
      cookies,
      headers,
      query,
      body
    });
}