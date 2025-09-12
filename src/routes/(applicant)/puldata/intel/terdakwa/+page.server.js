import { error, redirect } from '@sveltejs/kit';
import { listTerdakwa, createTerdakwa, deleteTerdakwa } from '$lib/services/terdakwa.js';

const MENU_PERM = 'puldata.intel.terdakwa';

export const load = async ({ locals, url }) => {
  if (!locals.user) throw redirect(303, '/login');
  if (locals.user.role === 'superadmin') return { user: locals.user, rows: listTerdakwa() };
  const perms = locals.user.permissions || [];
  const canAccess = perms.includes(MENU_PERM);
  if (!canAccess) throw error(403, 'Anda tidak memiliki akses ke menu Data Terdakwa');
  // server-side pagination + filtering
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const size = Math.min(50, Math.max(1, parseInt(url.searchParams.get('size') || '5')));
  const q = String(url.searchParams.get('search') || '').trim().toLowerCase();

  const all = listTerdakwa();
  const filtered = all.filter((r) => {
    if (!q) return true;
    return (
      String(r.id).includes(q) ||
      r.editBy?.toLowerCase().includes(q) ||
      r.nama?.toLowerCase().includes(q) ||
      r.alias?.toLowerCase().includes(q) ||
      r.ttl?.toLowerCase().includes(q) ||
      r.alamat?.toLowerCase().includes(q) ||
      r.jk?.toLowerCase().includes(q) ||
      r.tuntutan?.toLowerCase().includes(q)
    );
  });
  const total = filtered.length;
  const start = (page - 1) * size;
  const items = filtered.slice(start, start + size);
  return { user: locals.user, items, total, page, size };
};

export const actions = {
  create: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    const perms = locals.user.permissions || [];
    if (locals.user.role !== 'superadmin' && !perms.includes(MENU_PERM)) throw error(403, 'Forbidden');
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
    if (locals.user.role !== 'superadmin' && !perms.includes(MENU_PERM)) throw error(403, 'Forbidden');
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
