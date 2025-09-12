import { error, redirect } from '@sveltejs/kit';
import { listFtf, createFtf, createFtfBulk, deleteFtf } from '$lib/services/ftf.js';

const MENU_PERM = 'puldata.intel.ftf';

export const load = async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/login');
  if (locals.user.role === 'superadmin') return { user: locals.user, rows: listFtf() };
  const perms = locals.user.permissions || [];
  const canAccess = perms.includes(MENU_PERM);
  if (!canAccess) throw error(403, 'Anda tidak memiliki akses ke menu FTF');
  return { user: locals.user, rows: listFtf() };
};

export const actions = {
  create: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    const perms = locals.user.permissions || [];
    if (locals.user.role !== 'superadmin' && !perms.includes(MENU_PERM)) throw error(403, 'Forbidden');
    const fd = await request.formData();
    const submitBy = locals.user.username;
    const nama = String(fd.get('nama') || '').trim();
    const jk = String(fd.get('jk') || '').trim();
    const status = String(fd.get('status') || '').trim();
    const ttl = String(fd.get('ttl') || '').trim();
    const nik = String(fd.get('nik') || '').trim();
    const passport = String(fd.get('passport') || '').trim();
    const tgl_berangkat = String(fd.get('tgl_berangkat') || '').trim();
    const tujuan = String(fd.get('tujuan') || '').trim();
    try {
      createFtf({ submitBy, nama, jk, status, ttl, nik, passport, tgl_berangkat, tujuan });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },
  upload: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    const perms = locals.user.permissions || [];
    if (locals.user.role !== 'superadmin' && !perms.includes(MENU_PERM)) throw error(403, 'Forbidden');
    const fd = await request.formData();
    const file = fd.get('file');
    if (!file || typeof file === 'string') return { ok: false, error: 'File tidak ditemukan' };
    const text = await file.text();
    // Simple CSV parser: expects headers at least: nama. Optional: jk,status,ttl,nik,passport,tgl_berangkat,tujuan,submitBy
    const lines = text.split(/\r?\n/).filter(Boolean);
    const header = lines.shift()?.split(',').map(s => s.trim().toLowerCase()) || [];
    const idxNama = header.indexOf('nama');
    if (idxNama === -1) return { ok: false, error: 'Header CSV harus mengandung kolom nama' };
    const idx = (col) => header.indexOf(col);
    const items = lines.map((ln) => {
      const cols = ln.split(',');
      return {
        nama: cols[idxNama]?.trim() || '',
        jk: idx('jk')>=0 ? (cols[idx('jk')]?.trim() || '') : '',
        status: idx('status')>=0 ? (cols[idx('status')]?.trim() || '') : '',
        ttl: idx('ttl')>=0 ? (cols[idx('ttl')]?.trim() || '') : '',
        nik: idx('nik')>=0 ? (cols[idx('nik')]?.trim() || '') : '',
        passport: idx('passport')>=0 ? (cols[idx('passport')]?.trim() || '') : '',
        tgl_berangkat: idx('tgl_berangkat')>=0 ? (cols[idx('tgl_berangkat')]?.trim() || '') : '',
        tujuan: idx('tujuan')>=0 ? (cols[idx('tujuan')]?.trim() || '') : '',
        submitBy: idx('submitby')>=0 ? (cols[idx('submitby')]?.trim() || '') : 'upload'
      };
    }).filter(it => it.nama);
    try {
      createFtfBulk(items);
      return { ok: true, count: items.length };
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
      deleteFtf(id);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }
};
