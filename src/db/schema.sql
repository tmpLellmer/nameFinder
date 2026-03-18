-- Baby Name Suggestions Database Schema

CREATE TABLE IF NOT EXISTS name_suggestions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  suggested_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster name lookups and counting
CREATE INDEX IF NOT EXISTS idx_name ON name_suggestions(name);
