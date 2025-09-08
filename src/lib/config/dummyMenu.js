// src/lib/config/dummyMenu.js
export const dummyMenu = [
  {
    id: "dashboard",
    title: "Dashboard",
    path: "/dashboard"
  },
  {
    id: "puldata",
    title: "Puldata",
    children: [
      {
        id: "puldata.patrol",
        title: "Cyber Patrol",
        // path: "/puldata/patrol"
        children: [
          {
            id: "puldata.patrol.temuan",
            title: "Laporan Temuan",
            path: "/puldata/patrol/temuan",
            children: [
              { id: "lapinfo.daftar", title: "Daftar Laporan" },
              { id: "lapinfo.rekapkonten", title: "Rekap Konten" },
              { id: "lapinfo.rekapmedsos", title: "Rekap Medsos" },
              { id: "lapinfo.takedown", title: "Laporan Takedown" },
              { id: "lapinfo.khusus", title: "Laporan Khusus" }
            ]
          },
        ]
      },
      {
        id: "puldata.intel",
        title: "Data Intel",
        children: [
          {
            id: "puldata.intel.napi",
            title: "Napi",
            path: "/puldata/intel/napi",
            children: [
              { id: "intel.napi.daftar", title: "Daftar" },
              { id: "intel.napi.rekap", title: "Rekap" },
              { id: "intel.napi.history", title: "History" }
            ]
          },
          {
            id: "puldata.intel.ftf",
            title: "FTF",
            path: "/puldata/intel/ftf",
            children: [
              { id: "intel.ftf.daftar", title: "Daftar" },
              { id: "intel.ftf.rekap", title: "Rekap" },
              { id: "intel.ftf.history", title: "History" }
            ]
          },
          {
            id: "puldata.intel.penangkapan",
            title: "Penangkapan",
            path: "/puldata/intel/penangkapan",
            children: [
              { id: "intel.penangkapan.daftar", title: "Daftar" },
              { id: "intel.penangkapan.rekap", title: "Rekap" },
              { id: "intel.penangkapan.history", title: "History" }
            ]
          }
        ]
      },
      {
        id: "puldata.bdi",
        title: "BDI",
        path: "/puldata/bdi"
      }
    ]
  },
  {
    id: "olahdata",
    title: "Olahdata",
    children: [
      {
        id: "olahdata.hasiltakedown",
        title: "Hasil Takedown",
        path: "/olahdata/takedown"
      },
      {
        id: "olahdata.hasillaporan",
        title: "Hasil Laporan",
        path: "/olahdata/hasillaporan"
      }
    ]
  },
  {
    id: "profiling",
    title: "Profiling",
    path: "/profiling"
  },
  {
    id: "masterdata",
    title: "Master Data",
    children: [
      {
        id: "masterdata.modusserangan",
        title: "Master Modus Serangan",
        path: "/masterdata/modus-serangan"
      },
      {
        id: "masterdata.targetserangan",
        title: "Master Target Serangan",
        path: "/masterdata/target-serangan"
      },
      {
        id: "masterdata.jaringanteror",
        title: "Master Jaringan Teror",
        path: "/masterdata/jaringan-teror"
      },
      {
        id: "masterdata.bentukpropaganda",
        title: "Master Bentuk Propaganda",
        path: "/masterdata/bentuk-Propaganda"
      },
      {
        id: "masterdata.sumberinformasi",
        title: "Master Sumber Informasi",
        path: "/masterdata/sumber-informasi"
      },
      {
        id: "masterdata.jeniskonten",
        title: "Master Jenis Konten",
        path: "/masterdata/jenis-konten"
      },
      {
        id: "masterdata.negara",
        title: "Master Negara",
        path: "/masterdata/negara"
      },

    ]
  },
  {
    id: "user.management",
    title: "User Management",
    path: "/user-management",
    children: [
      {
        id: "user.management.users",
        title: "User Management",
        path: "/user-management"
      },
      {
        id: "session.logs",
        title: "Session Logs",
        path: "/session-logs"
      },
      {
        id: "all.history",
        title: "All History",
        path: "/all-history"
      }
    ]
  }
];
