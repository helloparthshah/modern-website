// Serves the latest resume built by the helloparthshah/resume CI.
// GitHub serves release assets as downloads, so this proxies the file with
// headers that let the browser open it inline. Cached at the edge for an hour.
const RESUME_URL =
  'https://github.com/helloparthshah/resume/releases/latest/download/resume.pdf';

export default async function handler(req, res) {
  let upstream;
  try {
    upstream = await fetch(RESUME_URL);
  } catch (e) {
    upstream = null;
  }
  if (!upstream || !upstream.ok) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(502).send('Resume is temporarily unavailable.');
    return;
  }
  const pdf = Buffer.from(await upstream.arrayBuffer());
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="resume.pdf"');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(pdf);
}
