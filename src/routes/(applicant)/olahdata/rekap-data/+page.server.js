import { error, redirect } from '@sveltejs/kit';

const TAB_PERMS = ['olahdata.rekap'];

export const load = async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/login');
  if (locals.user.role === 'superadmin') return { user: locals.user };
  const perms = locals.user.permissions || [];
  const hasAny = TAB_PERMS.some((p) => perms.includes(p));
  if (!hasAny) throw error(403, 'Anda tidak memiliki akses ke Olahdata > Rekap Data');
  return { user: locals.user };
};
