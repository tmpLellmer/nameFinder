import type { APIRoute } from 'astro';
import { isValidContributorPassword } from '../../lib/auth';
import { addSuggestion, initDatabase } from '../../lib/db';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = cookies.get('auth')?.value;

  if (!auth || !isValidContributorPassword(auth)) {
    return redirect('/');
  }

  const formData = await request.formData();
  const name = formData.get('name')?.toString();
  const suggestedBy = formData.get('suggestedBy')?.toString() || 'Anonym';

  if (!name || name.trim().length === 0) {
    return redirect('/suggest?error=empty');
  }

  // Initialize database if needed
  await initDatabase();

  // Add suggestion
  await addSuggestion(name, suggestedBy);

  return redirect('/suggest?success=true');
};
