import type { APIRoute } from 'astro';
import { isValidAdminPassword } from '../../lib/auth';
import { db, initDatabase } from '../../lib/db';

export const GET: APIRoute = async ({ cookies }) => {
  const auth = cookies.get('auth')?.value;
  if (!auth || !isValidAdminPassword(auth)) {
    return new Response('Unauthorized', { status: 401 });
  }

  await initDatabase();

  const result = await db.execute(
    'SELECT id, name, suggested_by, created_at FROM name_suggestions ORDER BY id ASC'
  );

  const data = {
    exported_at: new Date().toISOString(),
    rows: result.rows,
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="namen-backup-${new Date().toISOString().slice(0, 10)}.json"`,
    },
  });
};
