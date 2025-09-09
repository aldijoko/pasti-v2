import { error, redirect } from '@sveltejs/kit';
import { listTerdakwa, createTerdakwa, deleteTerdakwa } from '$lib/services/terdakwa.js';

const TAB_PERMS = ['intel.terdakwa.daftar', 'intel.terdakwa.rekap', 'intel.terdakwa.history'];

export const load = async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/login');
  if (locals.user.role === 'superadmin') return { user: locals.user, rows: listTerdakwa() };
  const perms = locals.user.permissions || [];
  const hasAny = TAB_PERMS.some((p) => perms.includes(p));
  if (!hasAny) throw error(403, 'Anda tidak memiliki akses ke menu Data Terdakwa');
  return { user: locals.user, rows: listTerdakwa() };
};

export const actions = {
  create: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    const perms = locals.user.permissions || [];
    if (locals.user.role !== 'superadmin' && !perms.includes('intel.terdakwa.daftar')) throw error(403, 'Forbidden');
    const fd = await request.formData();
    const editBy = locals.user.username;
    const nama = String(fd.get('nama') || '').trim();
    const alias = String(fd.get('alias') || '').trim();
    const ttl = String(fd.get('ttl') || '').trim();
    const alamat = String(fd.get('alamat') || '').trim();
    const jk = String(fd.get('jk') || '').trim();
    const tuntutan = String(fd.get('tuntutan') || '').trim();
    try {
      createTerdakwa({ editBy, nama, alias, ttl, alamat, jk, tuntutan });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },
  delete: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    const perms = locals.user.permissions || [];
    if (locals.user.role !== 'superadmin' && !perms.includes('intel.terdakwa.daftar')) throw error(403, 'Forbidden');
    const fd = await request.formData();
    const id = Number(fd.get('id') || 0);
    try {
      deleteTerdakwa(id);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }
};
