const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const dataDir = '/tmp/jxyvng';
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const filePath = path.join(dataDir, 'fans.json');
  let fans = [];
  if (fs.existsSync(filePath)) {
    try {
      fans = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {}
  }

  fans.push({ name, phone, timestamp: new Date().toISOString() });
  fs.writeFileSync(filePath, JSON.stringify(fans, null, 2));

  return res.status(200).json({ success: true, count: fans.length });
};
