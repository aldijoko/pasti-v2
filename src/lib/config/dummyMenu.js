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
        id: "puldata.bdi",
        title: "BDI",
        path: "/puldata/bdi"
      },
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
              { id: "lapinfo.rekapnomorsurat", title: "Rekap Nomor Surat" },
              { id: "lapinfo.khusus", title: "Laporan Khusus" },
              { id: "lapinfo.takedown", title: "Laporan Takedown" },
              { id: "lapinfo.takedownold", title: "Laporan Takedown OLD" },  
            ]
          },
        ]
      },
      {
        id: "puldata.intel",
        title: "Data Intel",
        children: [
          {
            id: "puldata.intel.dttot",
            title: "DTTOT",
            path: "/puldata/intel/dttot",
            children: [
              { id: "intel.dttot.daftar", title: "Daftar" },
              { id: "intel.dttot.rekap", title: "Rekap" },
              { id: "intel.dttot.history", title: "History" }
            ]
          },
          {
            id: "puldata.intel.terdakwa",
            title: "Data Terdakwa",
            path: "/puldata/intel/terdakwa",
            children: [
              { id: "intel.terdakwa.daftar", title: "Daftar" },
              { id: "intel.terdakwa.rekap", title: "Rekap" },
              { id: "intel.terdakwa.history", title: "History" }
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
            id: "puldata.intel.napiter",
            title: "Napi/Tahanan",
            path: "/puldata/intel/napiter",
            children: [
              { id: "intel.napiter.exist", title: "Napi/Tahanan" },
              { id: "intel.napiter.new", title: "Napi/Tahan Baru" },
              // { id: "intel.napiter.history", title: "History" }
            ]
          },
          {
            id: "puldata.intel.penangkapan",
            title: "Penangkapan",
            path: "/puldata/intel/penangkapan",
            children: [
              { id: "intel.penangkapan.exist", title: "Penangkapan" },
              { id: "intel.penangkapan.new", title: "Penangkapan Baru" },
              // { id: "intel.penangkapan.history", title: "History" }
            ]
          },
        ]
      },
      {
        id: "puldata.serangan-teror",
        title: "Serangan Teror",
        path: "/puldata/serangan-teror",
        children: [
          { id: "serangan.kejadian", title: "Serangan Teror by Kejadian" },
          { id: "serangan.orang", title: "Serangan Teror by Orang" },
          { id: "serangan.identifikasi", title: "Identifikasi Target Teror" }
        ]
      },
      
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
        id: "masterdata.bentukpropaganda",
        title: "Master Bentuk Propaganda",
        path: "/masterdata/bentuk-Propaganda"
      },
      {
        id: "masterdata.jaringanteror",
        title: "Master Jaringan Teror",
        path: "/masterdata/jaringan-teror"
      },
      {
        id: "masterdata.jeniskonten",
        title: "Master Jenis Konten",
        path: "/masterdata/jenis-konten"
      },
      {
        id: "masterdata.modusserangan",
        title: "Master Modus Serangan",
        path: "/masterdata/modus-serangan"
      },
      {
        id: "masterdata.negara",
        title: "Master Negara",
        path: "/masterdata/negara"
      },
      {
        id: "masterdata.sumberinformasi",
        title: "Master Sumber Informasi",
        path: "/masterdata/sumber-informasi"
      },
      {
        id: "masterdata.targetserangan",
        title: "Master Target Serangan",
        path: "/masterdata/target-serangan"
      },
      {
        id: "masterdata.upt",
        title: "Master UPT",
        path: "/masterdata/upt"
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
        title: "Users",
        path: "/user-management/users"
      },
      {
        id: "session.logs",
        title: "Session Logs",
        path: "/user-management/session-logs"
      },
      {
        id: "all.history",
        title: "All History",
        path: "/user-management/all-history"
      }
    ]
  }
];
