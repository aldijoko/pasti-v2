// src/lib/services/terdakwa.js

/** @typedef {{ id:number, editBy:string, nama:string, alias:string, ttl:string, alamat:string, jk:'Laki-laki'|'Perempuan'|'', tuntutan:string }} TerdakwaRecord */

/** @type {TerdakwaRecord[]} */
let rows = [
  { id: 1, editBy: 'superadmin', nama: 'Dimas Pangestu', alias: 'Dimas P', ttl: '1989-03-21', alamat: 'Jakarta', jk: 'Laki-laki', tuntutan: '8 tahun' },
  { id: 2, editBy: 'admin', nama: 'Sari Lestari', alias: 'Sari', ttl: '1992-07-12', alamat: 'Bandung', jk: 'Perempuan', tuntutan: '5 tahun' },
  { id: 3, editBy: 'admin', nama: 'Budi Setiawan', alias: 'Budi S', ttl: '1987-11-02', alamat: 'Surabaya', jk: 'Laki-laki', tuntutan: '6 tahun' },
  { id: 4, editBy: 'superadmin', nama: 'Ayu Puspita', alias: 'Ayu', ttl: '1994-01-28', alamat: 'Depok', jk: 'Perempuan', tuntutan: '3 tahun' },
  { id: 5, editBy: 'admin', nama: 'Ridho Akbar', alias: 'Ridho', ttl: '1985-05-05', alamat: 'Medan', jk: 'Laki-laki', tuntutan: '7 tahun' },
  { id: 6, editBy: 'superadmin', nama: 'Nadia Putri', alias: 'Nadia', ttl: '1995-09-17', alamat: 'Semarang', jk: 'Perempuan', tuntutan: '4 tahun' }
];

export function listTerdakwa() { return rows; }

/** @param {{ editBy:string, nama:string, alias:string, ttl:string, alamat:string, jk:string, tuntutan:string }} p */
export function createTerdakwa({ editBy, nama, alias, ttl, alamat, jk, tuntutan }) {
  if (!nama) throw new Error('Nama wajib diisi');
  const id = (rows.at(-1)?.id || 0) + 1;
  rows.push({ id, editBy: editBy || 'system', nama, alias: alias || '', ttl: ttl || '', alamat: alamat || '', jk: (jk === 'Perempuan' ? 'Perempuan' : (jk === 'Laki-laki' ? 'Laki-laki' : '')), tuntutan: tuntutan || '' });
}

export function deleteTerdakwa(id) {
  const idx = rows.findIndex(r => r.id === id);
  if (idx === -1) throw new Error('Data tidak ditemukan');
  rows.splice(idx, 1);
}
