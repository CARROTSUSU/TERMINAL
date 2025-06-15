// /api/logger.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  const { hash, timestamp } = req.body;

  console.log(`📥 Hash diterima untuk log: ${hash} pada ${new Date(timestamp).toISOString()}`);

  // Boleh hantar ke database, Notion, Discord Webhook, dsb. di sini

  res.status(200).send('Log berjaya disimpan');
}
