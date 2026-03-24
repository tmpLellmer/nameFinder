import type { APIRoute } from 'astro';
import { isValidPassword, verifyToken, getPasswordFromToken, isValidAdminPassword } from '../lib/auth';

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const token = url.searchParams.get('token');
  if (!token || !verifyToken(token)) {
    return redirect('/');
  }
  const authPassword = getPasswordFromToken(token);
  if (!authPassword) {
    return redirect('/');
  }
  cookies.set('auth', authPassword, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  return redirect('/suggest');
};

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const password = formData.get('password')?.toString();
  const token = formData.get('token')?.toString();

  let authPassword: string | null = null;

  // Check if token is provided
  if (token) {
    const isValid = verifyToken(token);
    if (isValid) {
      authPassword = getPasswordFromToken(token);
    }
  }

  // Check if password is provided
  if (password && isValidPassword(password)) {
    authPassword = password;
  }

  if (!authPassword) {
    return redirect('/?error=invalid');
  }

  // Set auth cookie
  cookies.set('auth', authPassword, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  // Redirect based on permissions
  if (isValidAdminPassword(authPassword)) {
    return redirect('/admin');
  } else {
    return redirect('/suggest');
  }
};
