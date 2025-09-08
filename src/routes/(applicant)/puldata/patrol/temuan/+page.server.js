import { error, redirect } from '@sveltejs/kit';

const TAB_PERMS = [
  'lapinfo.daftar',
  'lapinfo.rekapkonten',
  'lapinfo.rekapmedsos',
  'lapinfo.takedown',
  'lapinfo.khusus'
];

export const load = async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/login');
  if (locals.user.role === 'superadmin') {
    return { user: locals.user };
  }
  const perms = locals.user?.permissions || [];
  const hasAny = TAB_PERMS.some((p) => perms.includes(p));
  if (!hasAny) throw error(403, 'Anda tidak memiliki akses ke menu ini');
  return { user: locals.user };
};
