import type { APIRoute } from 'astro';
import { isValidAdminPassword } from '../../lib/auth';
import { db, initDatabase } from '../../lib/db';

export const POST: APIRoute = async ({ request, cookies }) => {
  const auth = cookies.get('auth')?.value;
  if (!auth || !isValidAdminPassword(auth)) {
    return new Response('Unauthorized', { status: 401 });
  }

  await initDatabase();

  let data: { rows: { name: string; suggested_by: string | null; created_at: string }[] };
  try {
    const text = await request.text();
    data = JSON.parse(text);
  } catch {
    return new Response(JSON.stringify({ error: 'Ungültige JSON-Datei' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!Array.isArray(data.rows)) {
    return new Response(JSON.stringify({ error: 'Ungültiges Format: "rows" fehlt' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let imported = 0;
  for (const row of data.rows) {
    if (!row.name) continue;
    await db.execute({
      sql: 'INSERT INTO name_suggestions (name, suggested_by, created_at) VALUES (?, ?, ?)',
      args: [
        String(row.name).trim(),
        row.suggested_by ? String(row.suggested_by).trim() : 'Anonym',
        row.created_at || new Date().toISOString(),
      ],
    });
    imported++;
  }

  return new Response(JSON.stringify({ imported }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
