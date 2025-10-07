const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// ログ出力
console.log('Starting server...');
console.log('Current directory:', __dirname);
console.log('Static files path:', path.join(__dirname, 'browser'));

// browserディレクトリの存在確認
const browserDir = path.join(__dirname, 'browser');
const indexFile = path.join(browserDir, 'index.html');

if (!fs.existsSync(browserDir)) {
  console.error('Browser directory not found:', browserDir);
  process.exit(1);
}

if (!fs.existsSync(indexFile)) {
  console.error('index.html not found:', indexFile);
  process.exit(1);
}

console.log('Browser directory found:', browserDir);
console.log('index.html found:', indexFile);

// 静的ファイルの配信
app.use(express.static(browserDir));

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// SPA用のフォールバック - すべてのルートをindex.htmlにリダイレクト
app.get('*', (req, res) => {
  console.log('Serving:', req.url);
  res.sendFile(indexFile);
});

// エラーハンドリング
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server successfully running on port ${port}`);
  console.log(`Visit: http://localhost:${port}`);
});
