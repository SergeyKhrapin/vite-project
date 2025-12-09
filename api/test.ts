// export default {
//   async fetch(request: Request) {
//     const url = new URL(request.url);
//     const { cookies = "", headers = "", query = "", body = ""} = request
 
    // return Response.json({
    //   cookies,
    //   headers,
    //   query,
    //   body
    // });
//   },
// };

export default function handler(req, res) {
  const { cookies = "", headers = "", query = "", body = ""} = req

  res.setHeader('Access-Control-Allow-Origin', 'https://www.strava.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader("Content-Security-Policy", "connect-src 'https://www.strava.com/'")

  res.status(200).json({
      cookies,
      headers,
      query,
      body
    });
}