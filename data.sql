-- 初期ユーザーデータ（テスト用）
INSERT INTO users (email, password, role) VALUES 
  ('admin@example.com', 'admin', 'admin'),
  ('user@example.com', 'user', 'user'),
  ('yumi@example.com', 'yumi123', 'admin');

-- 初期在庫データ（テスト用）
INSERT INTO inventory (name, quantity) VALUES 
  ('ノートPC', 10),
  ('マウス', 25),
  ('キーボード', 15),
  ('モニター', 8),
  ('プリンター', 3);