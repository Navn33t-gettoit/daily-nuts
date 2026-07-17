// Receives client-side error beacons and writes them to Vercel's runtime logs.
// View: Vercel dashboard → daily-nuts → Logs (or `npx vercel logs`).
export default function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).end(); return; }
  let b = req.body;
  try { if (typeof b === 'string') b = JSON.parse(b); } catch (e) { b = { raw: String(b).slice(0, 500) }; }
  b = b || {};
  console.error('[client-error]', JSON.stringify({
    msg: String(b.msg || '').slice(0, 500),
    src: String(b.src || '').slice(0, 200),
    line: b.line, col: b.col,
    stack: String(b.stack || '').slice(0, 1200),
    at: String(b.at || '').slice(0, 40),
    ua: String(req.headers['user-agent'] || '').slice(0, 200)
  }));
  res.status(204).end();
}
