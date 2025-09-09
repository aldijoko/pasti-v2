import { error, redirect } from '@sveltejs/kit';
import { listBdi, createBdi, deleteBdi } from '$lib/services/bdi.js';

export const load = async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/login');
  if (locals.user.role === 'superadmin') {
    return { user: locals.user, rows: listBdi() };
  }
  const perms = locals.user.permissions || [];
  if (!perms.includes('puldata.bdi')) throw error(403, 'Anda tidak memiliki akses ke menu BDI');
  return { user: locals.user, rows: listBdi() };
};

export const actions = {
  create: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    if (locals.user.role !== 'superadmin' && !(locals.user.permissions || []).includes('puldata.bdi')) {
      throw error(403, 'Forbidden');
    }
    const fd = await request.formData();
    const kategori = String(fd.get('kategori') || '').trim();
    const nama = String(fd.get('nama') || '').trim();
    const nik = String(fd.get('nik') || '').trim();
    const jk = String(fd.get('jk') || '').trim();
    const ttl = String(fd.get('ttl') || '').trim();
    const warga = String(fd.get('warga') || '').trim();
    try {
      createBdi({ kategori, nama, nik, jk, ttl, warga });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },
  delete: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    if (locals.user.role !== 'superadmin' && !(locals.user.permissions || []).includes('puldata.bdi')) {
      throw error(403, 'Forbidden');
    }
    const fd = await request.formData();
    const id = Number(fd.get('id') || 0);
    try {
      deleteBdi(id);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }
};
