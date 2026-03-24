import type { APIRoute } from 'astro';
import { isValidAdminPassword } from '../../lib/auth';
import { deleteName } from '../../lib/db';

export const POST: APIRoute = async ({ request, cookies }) => {
  const auth = cookies.get('auth')?.value;

  if (!auth || !isValidAdminPassword(auth)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const body = await request.json();
  const name = body?.name?.toString();

  if (!name || name.trim().length === 0) {
    return new Response(JSON.stringify({ error: 'Name required' }), { status: 400 });
  }

  await deleteName(name);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
