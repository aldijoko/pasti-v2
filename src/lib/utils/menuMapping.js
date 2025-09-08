// src/lib/utils/menuMapping.js

export const menuMapping = {
  "Dashboard": {
    controller: "dashboard",
    submenus: []
  },

  "Puldata": {
    controller: "puldata",
    submenus: [
      { name: "Napi Tahanan", method: "listNapiEksAjax" },
      { name: "Napi Tahanan Baru", method: "detailNewNapiterAjax" },
      { name: "FTF", method: "ajaxSearchFTF" },
      { name: "Penangkapan", method: "listSeranganKejadianAjax" },
      { name: "Identifikasi Target Teror", method: "identifikasi_update" },
      { name: "Kependudukan", method: "kependudukanAjax" },
      { name: "Penangkapan Baru", method: "serangkjdian_update" },
      { name: "Serangan Teror By Kejadian", method: "listSeranganKejadianAjax" },
      { name: "Serangan Teror By Orang", method: null }, // ❌ belum ada di JSON
      { name: "DTTOT", method: "listDttotAjax" },
      { name: "Data Terdakwa", method: "listTerdakwaAjax" },
      { name: "Master UPT", method: "ajaxListUpt" },
      { name: "Reporting", controller: "logs" }
    ]
  },

  "BDI": {
    controller: "BDI",
    submenus: [
      { name: "Daftar BDI", method: "listBDIAjax" }
    ]
  },

  "Laporan Temuan": {
    controller: "lapinfo",
    submenus: [
      { name: "Daftar Laporan", method: "listLapinfoAjaxDev" },
      { name: "Rekap Konten", method: "listKontenAjax" },
      { name: "Rekap Medos", method: "listLapsusAjax" },
      { name: "Laporan Takedown-OLD", method: "listTakedown2Ajax" },
      { name: "Laporan Takedown", method: "exportDocxTakedown" },
      { name: "Laporan Khusus", method: null },
      { name: "Rekap Nomor Surat", method: "listNosurAjax" },
      { name: "Master Modus Serangan", method: "ajaxListModusSerangan" },
      { name: "Master Jaringan Teror", method: "jaringan_down" },
      { name: "Master Bentuk Propaganda", method: "ajaxListBentukPropaganda" },
      { name: "Master Sumber Informasi", method: null },
      { name: "Master Jenis Konten", method: "ajaxListKonten" },
      { name: "Master Negara", method: "ajaxListNegara" }
    ]
  },

  "Kependudukan": {
    controller: "kependudukan",
    submenus: [
      { name: "[V2]Pencarian NIK", method: "ajaxEktpNikOnly" },
      { name: "[V2]Pencarian Kombinasi", method: "ajaxEktpKombinasi" },
      { name: "Pencarian FR", method: null },
      { name: "Verifikasi EKTP", method: "ajaxEktpNikKeluarga" },
      { name: "[V1]Pencarian EKTP", method: "ajaxListDaerahKtp" },
      { name: "Archive", method: null },
      { name: "History", method: null }
    ]
  },

  "Imigrasi": {
    controller: "ImigrasiNew",
    submenus: [
      { name: "Paspor New", method: "ajaxPasporSearch" },
      { name: "WNA New", method: "ajaxWNASearch" },
      { name: "Perlintasan New", method: "ajaxPerlintasanSearch" },
      { name: "History", method: "listCallVisaAjax" }
    ]
  },

  "Balikan Imigrasi": {
    controller: "BalikanImigrasi",
    submenus: [
      { name: "Balikan FTF", method: null },
      { name: "Balikan Napi", method: null },
      { name: "Balikan Eksnapiter", method: null },
      { name: "Balikan DTTOT", method: null },
      { name: "Balikan Tersangka", method: null }
    ]
  },

  "Kendaraan": {
    controller: "kendaraan",
    submenus: [
      { name: "Nopol By Eri", method: "ajaxSimEri" },
      { name: "SIM[By License]", method: "ajaxLicense" },
      { name: "SIM[By Name]", method: "ajaxNameToSim" },
      { name: "License", method: "ajaxLicense" },
      { name: "Archive", method: null },
      { name: "History", method: null }
    ]
  },

  "Garuda": {
    controller: "garuda",
    submenus: [
      { name: "Search Data", method: "ajaxGarudaSearch" },
      { name: "History", method: null }
    ]
  },

  "IMEI": {
    controller: "imei",
    submenus: [
      { name: "IMEI Check", method: null },
      { name: "IMEI Balance", method: null },
      { name: "History", method: null },
      { name: "Archive", method: null }
    ]
  },

  "MSISDN": {
    controller: "msisdn",
    submenus: [
      { name: "MSISDN to NIK", method: null },
      { name: "NIK to MSISDN", method: null },
      { name: "History", method: null },
      { name: "Archive", method: null },
      { name: "[DEV]LBS History", method: null },
      { name: "[DEV]MSISDN LBS", method: null }
    ]
  },

  "Marketplace": {
    controller: "archive",
    submenus: [
      { name: "Search Data", method: null },
      { name: "History", method: null }
    ]
  },

  "Ewallet": {
    controller: "ewallet",
    submenus: [
      { name: "Search Data", method: "ajaxListEwallet" },
      { name: "History", method: null },
      { name: "Archive", method: null }
    ]
  },

  "Bank BSI": {
    controller: "BSI",
    submenus: [
      { name: "Search Data", method: "ajaxCustomerBsiSearch" },
      { name: "History", method: null }
    ]
  },

  "Getcontact": {
    controller: "getcontact",
    submenus: [
      { name: "Search Data", method: "ajaxGetcontactSearch" },
      { name: "History", method: "ajaxListGetcontact" },
      { name: "Archive", method: null }
    ]
  },

  "True Caller": {
    controller: "truecaller",
    submenus: [
      { name: "Search Data", method: "ajaxTruecallerSearch" },
      { name: "History", method: "ajaxListTruecaller" },
      { name: "Archive", method: null }
    ]
  },

  "User Box": {
    controller: "UserBox",
    submenus: [
      { name: "Source", method: null },
      { name: "Search Filter", method: "ajaxSearchFilter" },
      { name: "Search All", method: "ajaxSearchAll" },
      { name: "Explain Filter", method: "ajaxExplainFilter" },
      { name: "Explain All", method: "ajaxExplainAll" },
      { name: "History", method: null }
    ]
  },

  "Kominfo": {
    controller: "kominfo",
    submenus: [
      { name: "List Aduan Instansi", method: "ajaxListAduan" }
    ]
  },

  "PPATK(Development)": {
    controller: "ppatk",
    submenus: [
      { name: "Sipendar", method: null }
    ]
  },

  "Imigrasi Old": {
    controller: "imigrasi",
    submenus: [
      { name: "Passport", method: null },
      { name: "Perlintasan", method: null },
      { name: "Izin Tinggal", method: null },
      { name: "History", method: null },
      { name: "Archive", method: null }
    ]
  },

  "User Management": {
    controller: "users",
    submenus: []
  },

  "Session Logs": {
    controller: "logs",
    submenus: []
  },

  "All History": {
    controller: "logs",
    submenus: [
      { name: "Global History", method: "globalHistory" }
    ]
  },

  "Reporting": {
    controller: "logs",
    submenus: [
      { name: "DUKCAPIL", method: null },
      { name: "IMIGRASI", method: null },
      { name: "LANTAS", method: null },
      { name: "MSISDN", method: null },
      { name: "IMEI", method: null },
      { name: "Global Reporting", method: null }
    ]
  },

  "ESKOPI Usage": {
    controller: "logs",
    submenus: [
      { name: "Usage", method: "eskopiUsage" }
    ]
  },

  "DUKCAPIL Usage": {
    controller: "logs",
    submenus: []
  },

  "Reporting K/L": {
    controller: "logs",
    submenus: [
      { name: "K/L Usage", method: "klUsage" }
    ]
  }
};
