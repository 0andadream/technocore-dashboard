// Read-only proxy for public Technocore endpoints (fallback if browser CORS fails). No secrets.
export default async function handler(req, res) {
  const { since, kv } = req.query;
  const url = kv === 'hb'
    ? 'https://technocore.chat/kv/flopfarmer/hb-71284122f8d28634'
    : `https://technocore.chat/r/kibble?format=json&limit=200${since ? '&since=' + encodeURIComponent(parseInt(since, 10) || 0) : ''}`;
  const r = await fetch(url);
  res.setHeader('cache-control', 's-maxage=3');
  res.setHeader('content-type', r.headers.get('content-type') || 'text/plain');
  res.status(r.status).send(await r.text());
}
