import { createClient } from '@libsql/client';

// Initialize database client
// Uses SQLite locally and on Railway (no external database needed)
// Railway will persist the database file in the deployment volume
// Use SQLite - ignore any DATABASE_URL from Railway that might be set
export const db = createClient({
  url: 'file:data/names.db',
});

// Initialize database schema
export async function initDatabase() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS name_suggestions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      suggested_by TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_name ON name_suggestions(name)
  `);
}

// Get all suggestions with counts (admin view)
export async function getAllSuggestions() {
  const result = await db.execute(`
    SELECT
      name,
      COUNT(*) as count,
      GROUP_CONCAT(suggested_by, ', ') as suggested_by_list,
      MIN(created_at) as first_suggested
    FROM name_suggestions
    GROUP BY LOWER(name)
    ORDER BY count DESC, first_suggested ASC
  `);

  return result.rows;
}

// Add a new suggestion
export async function addSuggestion(name: string, suggestedBy: string = 'Anonym') {
  await db.execute({
    sql: 'INSERT INTO name_suggestions (name, suggested_by) VALUES (?, ?)',
    args: [name.trim(), suggestedBy.trim()],
  });
}

// Check if database is initialized
export async function isDatabaseReady() {
  try {
    await db.execute('SELECT 1 FROM name_suggestions LIMIT 1');
    return true;
  } catch {
    return false;
  }
}
