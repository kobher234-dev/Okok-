exports.handler = async (event) => {
  const q = event.queryStringParameters || {};
  const esc = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const ok = u => (/^https?:\/\//i.test(u || '') ? u : '');

  const G = 'https://encrypted-tbn0.gstatic.com/images?q=';
  const a = q.q ? G + q.q + '&s=' + (q.s || 10) : ok(q.a);       // preview image
  const b = (q.b && q.b.startsWith('tbn:')) ? G + q.b + '&s=10' : (ok(q.b) || a);  // image on open
  const t = q.t || 'Photo';

  const html = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(t)}</title>
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(t)}">
<meta property="og:image" content="${esc(a)}">
<meta property="og:image:secure_url" content="${esc(a)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(a)}">
<style>
html,body{margin:0;height:100%;background:#000}
img{display:block;width:100%;height:100%;object-fit:contain}
</style>
</head><body>
<img src="${esc(b)}" alt="${esc(t)}">
</body></html>`;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
    body: html
  };
};
