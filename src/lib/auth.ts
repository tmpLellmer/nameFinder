// Simple authentication for the baby name app
// Two types of access:
// 1. CONTRIBUTOR_PASSWORD - allows adding names
// 2. ADMIN_PASSWORD - allows viewing all names

export const CONTRIBUTOR_PASSWORD = process.env.CONTRIBUTOR_PASSWORD || 'baby2026';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2026';

export function isValidContributorPassword(password: string): boolean {
  return password === CONTRIBUTOR_PASSWORD;
}

export function isValidAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function isValidPassword(password: string): boolean {
  return isValidContributorPassword(password) || isValidAdminPassword(password);
}

// Generate a simple token for sharing (base64 encoded password)
export function generateShareToken(password: string = CONTRIBUTOR_PASSWORD): string {
  return Buffer.from(password).toString('base64');
}

// Verify token
export function verifyToken(token: string): boolean {
  try {
    const password = Buffer.from(token, 'base64').toString('utf-8');
    return isValidPassword(password);
  } catch {
    return false;
  }
}

// Get password from token
export function getPasswordFromToken(token: string): string | null {
  try {
    return Buffer.from(token, 'base64').toString('utf-8');
  } catch {
    return null;
  }
}
