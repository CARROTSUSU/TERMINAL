// /api/logs.js
let logs = global.logs || [];
global.logs = logs;

export default function handler(req, res) {
  res.json({ logs });
}
