const express = require('express');
const path = require('path');
const app = express();

// 静的ファイルの配信
app.use(express.static(path.join(__dirname, 'dist/stock-app/browser')));

// SPA用のフォールバック - すべてのルートをindex.htmlにリダイレクト
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/stock-app/browser/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});