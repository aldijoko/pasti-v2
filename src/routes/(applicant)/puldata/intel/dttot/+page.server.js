import { error, redirect } from '@sveltejs/kit';
import { listDttot, createDttot, deleteDttot } from '$lib/services/dttot.js';

const MENU_PERM = 'puldata.intel.dttot';

export const load = async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/login');
  if (locals.user.role === 'superadmin') return { user: locals.user, rows: listDttot() };
  const perms = locals.user.permissions || [];
  const canAccess = perms.includes(MENU_PERM);
  if (!canAccess) throw error(403, 'Anda tidak memiliki akses ke menu DTTOT');
  return { user: locals.user, rows: listDttot() };
};

export const actions = {
  create: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    const perms = locals.user.permissions || [];
    if (locals.user.role !== 'superadmin' && !perms.includes(MENU_PERM)) throw error(403, 'Forbidden');
    const fd = await request.formData();
    const updateBy = locals.user.username;
    const nama = String(fd.get('nama') || '').trim();
    const alias = String(fd.get('alias') || '').trim();
    const ttl = String(fd.get('ttl') || '').trim();
    const alamat = String(fd.get('alamat') || '').trim();
    const warga = String(fd.get('warga') || '').trim();
    try {
      createDttot({ updateBy, nama, alias, ttl, alamat, warga });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },
  delete: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    const perms = locals.user.permissions || [];
    if (locals.user.role !== 'superadmin' && !perms.includes(MENU_PERM)) throw error(403, 'Forbidden');
    const fd = await request.formData();
    const id = Number(fd.get('id') || 0);
    try {
      deleteDttot(id);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }
};
