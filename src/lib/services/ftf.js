// src/lib/services/ftf.js

/** @typedef {{ id:number, submitBy:string, nama:string, jk:'Laki-laki'|'Perempuan'|'', status:string, ttl:string, nik:string, passport:string, tgl_berangkat:string, tujuan:string }} FtfRecord */

/** @type {FtfRecord[]} */
let rows = [
  { id: 1, submitBy: 'superadmin', nama: 'A. Rahman', jk: 'Laki-laki', status: 'Monitor', ttl: '1987-04-10', nik: '3174000000001001', passport: 'A1234567', tgl_berangkat: '2015-06-01', tujuan: 'Suriah' },
  { id: 2, submitBy: 'admin', nama: 'B. Yusuf', jk: 'Laki-laki', status: 'Aman', ttl: '1990-02-14', nik: '3174000000001002', passport: 'B9876543', tgl_berangkat: '2016-03-15', tujuan: 'Irak' },
  { id: 3, submitBy: 'admin', nama: 'C. Ali', jk: 'Laki-laki', status: 'Monitor', ttl: '1985-11-22', nik: '3174000000001003', passport: 'C7654321', tgl_berangkat: '2017-08-20', tujuan: 'Turki' },
  { id: 4, submitBy: 'superadmin', nama: 'D. Siti', jk: 'Perempuan', status: 'Monitor', ttl: '1993-07-08', nik: '3174000000001004', passport: 'D1111222', tgl_berangkat: '2018-12-05', tujuan: 'Turki' },
  { id: 5, submitBy: 'admin', nama: 'E. Putra', jk: 'Laki-laki', status: 'Aman', ttl: '1988-05-19', nik: '3174000000001005', passport: 'E3333444', tgl_berangkat: '2019-01-15', tujuan: 'Suriah' },
  { id: 6, submitBy: 'admin', nama: 'F. Dewi', jk: 'Perempuan', status: 'Monitor', ttl: '1995-09-30', nik: '3174000000001006', passport: 'F5555666', tgl_berangkat: '2020-04-20', tujuan: 'Irak' },
  { id: 7, submitBy: 'superadmin', nama: 'G. Akbar', jk: 'Laki-laki', status: 'Aman', ttl: '1983-01-02', nik: '3174000000001007', passport: 'G7777888', tgl_berangkat: '2021-02-02', tujuan: 'Suriah' },
  { id: 8, submitBy: 'admin', nama: 'H. Maya', jk: 'Perempuan', status: 'Monitor', ttl: '1991-03-12', nik: '3174000000001008', passport: 'H9999000', tgl_berangkat: '2021-09-18', tujuan: 'Turki' }
];

/** @returns {FtfRecord[]} */
export function listFtf() { return rows; }

/** @param {{ submitBy:string, nama:string, jk:string, status:string, ttl:string, nik:string, passport:string, tgl_berangkat:string, tujuan:string }} p */
export function createFtf({ submitBy, nama, jk, status, ttl, nik, passport, tgl_berangkat, tujuan }) {
  if (!nama) throw new Error('Nama wajib diisi');
  const id = (rows.at(-1)?.id || 0) + 1;
  rows.push({ id, submitBy: submitBy || 'system', nama, jk: jk==='Perempuan'?'Perempuan':(jk==='Laki-laki'?'Laki-laki':''), status: status || '', ttl: ttl || '', nik: nik || '', passport: passport || '', tgl_berangkat: tgl_berangkat || '', tujuan: tujuan || '' });
}

/** @param {Partial<FtfRecord>[]} items */
export function createFtfBulk(items) {
  for (const it of items) {
    createFtf({
      submitBy: it.submitBy || 'upload',
      nama: it.nama || '',
      jk: it.jk || '',
      status: it.status || '',
      ttl: it.ttl || '',
      nik: it.nik || '',
      passport: it.passport || '',
      tgl_berangkat: it.tgl_berangkat || '',
      tujuan: it.tujuan || ''
    });
  }
}

/** @param {number} id */
export function deleteFtf(id) {
  const idx = rows.findIndex(r => r.id === id);
  if (idx === -1) throw new Error('Data tidak ditemukan');
  rows.splice(idx, 1);
}
