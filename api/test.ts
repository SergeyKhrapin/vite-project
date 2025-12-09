export default function handler(req, res) {
  const { cookies = "", headers = "", query = "", body = ""} = req

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  res.status(200).json({
      cookies,
      headers,
      query,
      body
    });
}