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
            
          },
          {
            id: "puldata.intel.terdakwa",
            title: "Data Terdakwa",
            path: "/puldata/intel/terdakwa",
            
          },
          {
            id: "puldata.intel.ftf",
            title: "FTF",
            path: "/puldata/intel/ftf",
            
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
      },
      {
        id: "olahdata.rekap",
        title: "Rekap Data",
        path: "/olahdata/rekap-data"
      }
    ]
  },
  {
    id: "profiling",
    title: "Profiling",
    children: [
      { id: "profiling.kependudukan", title: "Kependudukan", path: "/profiling/kependudukan",
        children: [
          { id: "profiling.kependudukan.v2nik", title: "[V2]Pencarian NIK", path: "/profiling/kependudukan?tab=v2-nik" },
          { id: "profiling.kependudukan.v2kombinasi", title: "[V2]Pencarian Kombinasi", path: "/profiling/kependudukan?tab=v2-kombinasi" },
          { id: "profiling.kependudukan.fr", title: "Face Recognation", path: "/profiling/kependudukan?tab=fr" },
          { id: "profiling.kependudukan.verifikasi", title: "Verifikasi EKTP", path: "/profiling/kependudukan?tab=verifikasi-ektp" },
          { id: "profiling.kependudukan.v1nik", title: "[V1]Pencarian NIK", path: "/profiling/kependudukan?tab=v1-nik" }
        ]
      },
      { id: "profiling.imigrasi", title: "Imigrasi", path: "/profiling/imigrasi",
        children: [
          { id: "profiling.imigrasi.paspor", title: "Paspor", path: "/profiling/imigrasi?tab=paspor" },
          { id: "profiling.imigrasi.wna", title: "WNA", path: "/profiling/imigrasi?tab=wna" },
          { id: "profiling.imigrasi.perlintasan", title: "Perlintasan", path: "/profiling/imigrasi?tab=perlintasan" }
        ]
      },
      { id: "profiling.imei", title: "IMEI", path: "/profiling/imei",
        children: [
          { id: "profiling.imei.search", title: "Search IMEI", path: "/profiling/imei?tab=search" },
          { id: "profiling.imei.balance", title: "Balance Check", path: "/profiling/imei?tab=balance" },
          { id: "profiling.imei.history", title: "History", path: "/profiling/imei?tab=history" }
        ]
      },
      { id: "profiling.divtik", title: "Divtik", path: "/profiling/divtik",
        children: [
          { id: "profiling.divtik.nopoleri", title: "Nopol By Eri", path: "/profiling/divtik?tab=nopol-eri" },
          { id: "profiling.divtik.simlicense", title: "SIM [By License]", path: "/profiling/divtik?tab=sim-license" },
          { id: "profiling.divtik.simname", title: "SIM [By Name]", path: "/profiling/divtik?tab=sim-name" },
          { id: "profiling.divtik.license", title: "License", path: "/profiling/divtik?tab=license" },
          { id: "profiling.divtik.history", title: "History", path: "/profiling/divtik?tab=history" }
        ]
      },
      { id: "profiling.balikanimigrasi", title: "Balikan Imigrasi", path: "/profiling/balikan-imigrasi",
        children: [
          { id: "profiling.balikanimigrasi.ftf", title: "Balikan FTF", path: "/profiling/balikan-imigrasi?tab=ftf" },
          { id: "profiling.balikanimigrasi.napi", title: "Balikan Napi", path: "/profiling/balikan-imigrasi?tab=napi" },
          { id: "profiling.balikanimigrasi.eksnapiter", title: "Balikan Eksnapiter", path: "/profiling/balikan-imigrasi?tab=eksnapiter" },
          { id: "profiling.balikanimigrasi.dttot", title: "Balikan DTTOT", path: "/profiling/balikan-imigrasi?tab=dttot" },
          { id: "profiling.balikanimigrasi.tersangka", title: "Balikan Tersangka", path: "/profiling/balikan-imigrasi?tab=tersangka" }
        ]
      }
    ]
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
