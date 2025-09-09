import { error, redirect } from '@sveltejs/kit';
import { findDttot } from '$lib/services/dttot.js';

export const load = async ({ locals, params }) => {
  if (!locals.user) throw redirect(303, '/login');
  const id = Number(params.id);
  const rec = findDttot(id);
  if (!rec) throw error(404, 'Data tidak ditemukan');
  return { user: locals.user, rec };
};

