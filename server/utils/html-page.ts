/**
 * Minimal branded HTML page returned by GET endpoints that users land on from
 * email links (newsletter confirm / unsubscribe). Self-contained, no JS.
 */
export function simplePage(opts: { title: string; message: string; ok?: boolean }): string {
  const { title, message, ok = true } = opts
  const accent = ok ? '#8B9A6B' : '#B45454'
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title} — MaiHealth</title>
<style>
  body { margin:0; font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif; background:#F5F1EC; color:#2D3A24; display:flex; min-height:100vh; align-items:center; justify-content:center; padding:24px; }
  .card { background:#fff; border:1px solid #E8E4DF; border-radius:20px; padding:40px 32px; max-width:440px; text-align:center; box-shadow:0 8px 30px rgba(0,0,0,.04); }
  .badge { width:56px; height:56px; border-radius:50%; background:${accent}1a; color:${accent}; display:flex; align-items:center; justify-content:center; font-size:26px; margin:0 auto 20px; }
  h1 { font-size:22px; margin:0 0 10px; }
  p { font-size:15px; line-height:1.6; color:#2D3A24cc; margin:0 0 24px; }
  a { display:inline-block; color:${accent}; font-weight:600; text-decoration:none; font-size:14px; }
  .brand { margin-top:28px; font-size:13px; color:#999; }
</style>
</head>
<body>
  <div class="card">
    <div class="badge">${ok ? '✓' : '!'}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="https://mai-health.de">← mai-health.de</a>
    <div class="brand"><strong>Mai</strong>Health</div>
  </div>
</body>
</html>`
}
