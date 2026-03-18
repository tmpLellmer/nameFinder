import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ cookies, redirect }) => {
  cookies.delete('auth', { path: '/' });
  return redirect('/');
};
