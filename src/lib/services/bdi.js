// src/lib/services/bdi.js

/** @typedef {{ id: number, kategori: string, nama: string, nik: string, jk: 'Laki-laki'|'Perempuan', ttl: string, warga: string }} BdiRecord */

/** @type {BdiRecord[]} */
let rows = [
  { id: 1, kategori: 'DEPORTAN', nama: 'Andi Wijaya', nik: '3174000000000001', jk: 'Laki-laki', ttl: '1990-05-12', warga: 'WNI' },
  { id: 2, kategori: 'RETURNIS', nama: 'Siti Rahma', nik: '3174000000000002', jk: 'Perempuan', ttl: '1992-11-03', warga: 'WNI' },
  { id: 3, kategori: 'EKSNAPITER', nama: 'Budi Santoso', nik: '3174000000000003', jk: 'Laki-laki', ttl: '1988-02-21', warga: 'WNI' },
  { id: 4, kategori: 'Tidak diketahui', nama: 'Lina Putri', nik: '3174000000000004', jk: 'Perempuan', ttl: '1995-07-08', warga: 'WNI' },
  { id: 5, kategori: 'DEPORTAN', nama: 'Rudi Hartono', nik: '3174000000000005', jk: 'Laki-laki', ttl: '1986-03-14', warga: 'WNI' },
  { id: 6, kategori: 'RETURNIS', nama: 'Nurul Aini', nik: '3174000000000006', jk: 'Perempuan', ttl: '1991-12-25', warga: 'WNI' },
  { id: 7, kategori: 'EKSNAPITER', nama: 'Dimas Pratama', nik: '3174000000000007', jk: 'Laki-laki', ttl: '1984-09-09', warga: 'WNI' },
  { id: 8, kategori: 'Tidak diketahui', nama: 'Maya Dewi', nik: '3174000000000008', jk: 'Perempuan', ttl: '1993-01-19', warga: 'WNI' },
  { id: 9, kategori: 'DEPORTAN', nama: 'Farhan Akbar', nik: '3174000000000009', jk: 'Laki-laki', ttl: '1989-06-02', warga: 'WNI' },
  { id: 10, kategori: 'RETURNIS', nama: 'Ayu Lestari', nik: '3174000000000010', jk: 'Perempuan', ttl: '1994-10-11', warga: 'WNI' },
  { id: 11, kategori: 'EKSNAPITER', nama: 'Joko Susilo', nik: '3174000000000011', jk: 'Laki-laki', ttl: '1982-04-23', warga: 'WNI' },
  { id: 12, kategori: 'Tidak diketahui', nama: 'Putri Melati', nik: '3174000000000012', jk: 'Perempuan', ttl: '1996-08-30', warga: 'WNI' }
];

/** @returns {BdiRecord[]} */
export function listBdi() {
  return rows;
}

/** @param {{ kategori: string, nama: string, nik: string, jk: string, ttl: string, warga: string }} payload */
export function createBdi({ kategori, nama, nik, jk, ttl, warga }) {
  if (!kategori || !nama || !nik) throw new Error('Kategori, nama, dan NIK wajib diisi');
  const id = (rows.at(-1)?.id || 0) + 1;
  rows.push({ id, kategori, nama, nik, jk: jk === 'Perempuan' ? 'Perempuan' : 'Laki-laki', ttl, warga });
}

/** @param {number} id */
export function deleteBdi(id) {
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error('Data tidak ditemukan');
  rows.splice(idx, 1);
}
