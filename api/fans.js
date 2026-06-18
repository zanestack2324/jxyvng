const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filePath = path.join('/tmp/jxyvng', 'fans.json');
  if (!fs.existsSync(filePath)) {
    return res.status(200).json({ fans: [], count: 0 });
  }

  try {
    const fans = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return res.status(200).json({ fans, count: fans.length });
  } catch {
    return res.status(200).json({ fans: [], count: 0 });
  }
};
