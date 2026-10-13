// Pengaturan dashboard web Cost Control dan OH · OM NRE
window.OH_CONFIG = {
  // CSV sheet "Laporan Harian" (Monitoring Progress Outage Harian).
  harianCsvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSPCMgnvnQt_K5MhC0YpYlyJBI_vE2g2s4r-Ts8fejrJocX3spf5wFStRti10PfLVIvIaMErP4i0UZR/pub?gid=1724937986&single=true&output=csv',

  // CSV Cost Control O&M NRE 2026 (tab Dashboard Cost Control 2026).
  // Di file Cost Control: File > Bagikan > Publikasikan ke web > pilih sheet > format CSV > Publikasikan.
  // Ulangi untuk tiap sheet, lalu tempel link-nya di bawah.
  costControlCsv: {
    har: '', // sheet "Har_GoogleStudio"  (biaya pemeliharaan)
    ai: '',  // sheet "AI Murni_perUnit"  (AI murni terkontrak)
    aki: '', // sheet "AKI_perUnit"       (AKI terdisburse)
    ej: '',  // sheet "EJ_DataStudio"     (progres fisik project)
  },

  // Muat ulang data otomatis setiap N menit selama halaman terbuka (0 = mati).
  refreshMenit: 10,
};
