// src/lib/services/dttot.js

/** @typedef {{ id:number, updateBy:string, nama:string, alias:string, ttl:string, alamat:string, warga:string }} DttotRecord */

/** @type {DttotRecord[]} */
let rows = [
  { id: 1, updateBy: 'superadmin', nama: 'Abdul Karim', alias: 'AK', ttl: '1985-04-12', alamat: 'Jakarta', warga: 'WNI' },
  { id: 2, updateBy: 'superadmin', nama: 'Siti Aminah', alias: 'SA', ttl: '1990-09-03', alamat: 'Bandung', warga: 'WNI' },
  { id: 3, updateBy: 'admin', nama: 'Budi Setiawan', alias: 'BS', ttl: '1988-02-20', alamat: 'Surabaya', warga: 'WNI' },
  { id: 4, updateBy: 'admin', nama: 'Dewi Lestari', alias: 'DL', ttl: '1992-11-30', alamat: 'Semarang', warga: 'WNI' }
];

/** @returns {DttotRecord[]} */
export function listDttot() { return rows; }

/** @param {{ updateBy:string, nama:string, alias:string, ttl:string, alamat:string, warga:string }} p */
export function createDttot({ updateBy, nama, alias, ttl, alamat, warga }) {
  if (!nama) throw new Error('Nama wajib diisi');
  const id = (rows.at(-1)?.id || 0) + 1;
  rows.push({ id, updateBy: updateBy || 'system', nama, alias: alias || '', ttl: ttl || '', alamat: alamat || '', warga: warga || 'WNI' });
}

/** @param {number} id */
export function deleteDttot(id) {
  const idx = rows.findIndex(r => r.id === id);
  if (idx === -1) throw new Error('Data tidak ditemukan');
  rows.splice(idx, 1);
}

/** @param {number} id */
export function findDttot(id) {
  return rows.find(r => r.id === id) || null;
}

