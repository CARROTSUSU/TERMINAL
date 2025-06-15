// /api/logs.js
let logList = [];

export function logHash(data) {
  if (logList.length >= 50) logList.shift(); // Max 50 log
  logList.push(data);
}

export default function handler(req, res) {
  res.status(200).json(logList);
}
