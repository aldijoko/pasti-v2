// src/lib/config/dummyUser.js

export const dummyUsers = [
  {
    username: "superadmin",
    password: "123",
    role: "superadmin",
    name: "Super Admin",
    avatar: "/images/def_user.png",
    lastLogin: "2025-09-08T07:30:00Z", // ISO string
    is_active: "Y",
    permissions: [
      "dashboard",
      "puldata.patrol",
      "puldata.intel.lapangan",
      "puldata.intel.kantor",
      // Intel submenus and their tabs
      "puldata.intel.napi",
      "intel.napi.daftar",
      "intel.napi.rekap",
      "intel.napi.history",
      "puldata.intel.ftf",
      "intel.ftf.daftar",
      "intel.ftf.rekap",
      "intel.ftf.history",
      "puldata.intel.penangkapan",
      "intel.penangkapan.daftar",
      "intel.penangkapan.rekap",
      "intel.penangkapan.history",
      // Intel DTTOT
      "puldata.intel.dttot",
      "intel.dttot.daftar",
      "intel.dttot.rekap",
      "intel.dttot.history",
      // Intel Data Terdakwa
      "puldata.intel.terdakwa",
      "intel.terdakwa.daftar",
      "intel.terdakwa.rekap",
      "intel.terdakwa.history",
      // Serangan Teror submenu + tabs
      "puldata.serangan-teror",
      "serangan.kejadian",
      "serangan.orang",
      "serangan.identifikasi",
      "puldata.bdi",
      "olahdata.hasillab",
      "olahdata.hasillaporan",
      "profiling",
      // Profiling submenu
      "profiling.kependudukan",
      "profiling.kependudukan.v2nik",
      "profiling.kependudukan.v2kombinasi",
      "profiling.kependudukan.fr",
      "profiling.kependudukan.verifikasi",
      "profiling.kependudukan.v1nik",
      "profiling.imigrasi",
      "profiling.imigrasi.paspor",
      "profiling.imigrasi.wna",
      "profiling.imigrasi.perlintasan",
      "profiling.imei",
      "profiling.imei.search",
      "profiling.imei.balance",
      "profiling.imei.history",
      "profiling.divtik",
      "profiling.divtik.nopoleri",
      "profiling.divtik.simlicense",
      "profiling.divtik.simname",
      "profiling.divtik.license",
      "profiling.divtik.history",
      "profiling.balikanimigrasi",
      "profiling.balikanimigrasi.ftf",
      "profiling.balikanimigrasi.napi",
      "profiling.balikanimigrasi.eksnapiter",
      "profiling.balikanimigrasi.dttot",
      "profiling.balikanimigrasi.tersangka",
      "user.management",
      // Puldata Patrol Temuan tabs
      "puldata.patrol.temuan",
      "lapinfo.daftar",
      "lapinfo.rekapkonten",
      "lapinfo.rekapmedsos",
      "lapinfo.rekapnomorsurat",
      "lapinfo.takedown",
      "lapinfo.takedownold",
      "lapinfo.khusus"
    ]
  },
  {
    username: "admin",
    password: "123",
    role: "admin",
    name: "Admin",
    avatar: "/images/def_user.png",
    lastLogin: "2025-09-07T15:20:00Z",
    is_active: "Y",
    permissions: [
      "dashboard",
      "puldata.patrol",
      "puldata.intel.lapangan",
      "puldata.bdi",
      "olahdata.hasillab",
      // partial access to temuan tabs
      "puldata.patrol.temuan",
      "lapinfo.daftar",
      "lapinfo.rekapkonten"
      // optionally grant limited intel tabs
      // "puldata.intel.napi",
      // "intel.napi.daftar"
    ]
  },
  {
    username: "userA",
    password: "123",
    role: "regular",
    name: "User A",
    avatar: "/images/def_user.png",
    lastLogin: "2025-09-06T11:15:00Z",
    is_active: "N",
    permissions: ["dashboard", "puldata.intel.lapangan"]
  },
  {
    username: "external",
    password: "123",
    role: "external",
    name: "External User",
    avatar: "/images/def_user.png",
    lastLogin: null,
    is_active: "Y",
    permissions: ["dashboard", "profiling"]
  }
];
