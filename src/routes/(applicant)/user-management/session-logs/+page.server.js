import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/login');
  if (locals.user.role !== 'superadmin') {
    throw error(403, 'Hanya superadmin yang dapat mengakses Session Logs');
  }
  return {};
};

