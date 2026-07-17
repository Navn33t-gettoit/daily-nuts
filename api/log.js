// Receives client-side error beacons and writes them to Vercel's runtime logs.
// View: Vercel dashboard → daily-nuts → Logs (or `npx vercel logs`).
export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).end(); return; }
  let raw = req.body;
  if (raw === undefined || raw === null) {
    raw = await new Promise((resolve) => {
      let d = '';
      req.on('data', (c) => { d += c; if (d.length > 10000) req.destroy(); });
      req.on('end', () => resolve(d));
      req.on('error', () => resolve(d));
    });
  }
  let b = raw;
  try { if (typeof b === 'string') b = JSON.parse(b); } catch (e) { b = { raw: String(raw).slice(0, 500) }; }
  if (!b || typeof b !== 'object') b = { raw: String(raw).slice(0, 500) };
  console.error('[client-error]', JSON.stringify({
    msg: String(b.msg || b.raw || '').slice(0, 500),
    src: String(b.src || '').slice(0, 200),
    line: b.line, col: b.col,
    stack: String(b.stack || '').slice(0, 1200),
    at: String(b.at || '').slice(0, 40),
    ua: String(req.headers['user-agent'] || '').slice(0, 200)
  }));
  res.status(204).end();
}
