# Dashboard Cost Control dan OH · OM NRE (versi web)

Versi web dari dashboard Cost Control dan Outage Management OM NRE. Bisa dibuka siapa saja lewat GitHub Pages, tanpa akun Claude.

## Isi folder

| File | Fungsi |
|---|---|
| `index.html` | Halaman dashboard: 6 tab, filter, mode terang/gelap |
| `dash.js` | Memuat `data.json` dan CSV dari Google Sheets, lalu menjalankan dashboard |
| `config.js` | Pengaturan: link CSV Google Sheets dan interval refresh |
| `data.json` | Data dari 3 file Excel OH. **Dibuat oleh `update_data.py`, jangan diedit manual** |
| `update_data.py` | Membaca Excel → menulis `data.json` → commit & push ke GitHub |
| `update.bat` | Klik 2x untuk menjalankan `update_data.py` |
| `export.js` | Tombol **Unduh PDF** di setiap tab (A4 potret, tampilan terang) |

## Sumber data

| Tab | Sumber | Cara update |
|---|---|---|
| Dashboard Cost Control 2026 | Google Sheets Cost Control O&M NRE 2026: sheet Har_GoogleStudio, AI Murni_perUnit, AKI_perUnit, EJ_DataStudio | Otomatis, dibaca langsung |
| Jadwal OH NRE, Rencana & Realisasi Biaya OH, Jadwal Rapat R&P OH | `Jadwal OH NRE*.xlsx` | Jalankan `update.bat` |
| Monitoring Progress Outage Harian | Google Sheets Laporan Harian | Otomatis, dibaca langsung |
| Monitoring OH Ditgas 2026 | `Renc&Real OH OM4*.xlsx`, `Jadwal OH OM 5*.xlsx`, `Jadwal OH NRE*.xlsx` | Jalankan `update.bat` |

File Excel dicari di folder induk folder ini (`claude database`). Kalau ada beberapa file yang cocok, yang paling baru diubah yang dipakai.

## Pemasangan pertama (sekali saja)

1. **Buat repo baru** di GitHub, misalnya `dashboard-cc-oh-nre`, sebagai *Public*. Jangan centang "Add a README".
2. **Hubungkan folder ini ke repo.**
   - Buka folder `dashboard-cc-oh-web` di File Explorer.
   - Klik address bar, ketik `cmd`, lalu Enter.
   - Di Command Prompt, jalankan perintah berikut **satu per satu** (Enter setelah tiap baris):
   ```
   git init -b main
   git add .
   git commit -m "Dashboard Cost Control dan OH awal"
   git remote add origin https://github.com/ccomnre/dashboard-cc-oh-nre.git
   git push -u origin main
   ```
   Kalau nama repo-mu berbeda, ganti bagian `dashboard-cc-oh-nre` di baris `git remote add`.
3. **Aktifkan GitHub Pages.**
   - Di repo, buka *Settings → Pages → Build and deployment*.
   - Pilih *Deploy from a branch*, branch `main`, folder `/ (root)`, lalu *Save*.
   - Setelah 1–2 menit dashboard bisa dibuka di `https://ccomnre.github.io/dashboard-cc-oh-nre/`.
4. **Sambungkan Cost Control.**
   - Di file Google Sheets Cost Control O&M NRE 2026, buka *File → Bagikan → Publikasikan ke web*.
   - Pilih sheet **Har_GoogleStudio**, format **Nilai yang dipisahkan koma (.csv)**, klik *Publikasikan*, lalu salin link-nya ke `har` di `config.js`.
   - Ulangi untuk **AI Murni_perUnit** → `ai`, **AKI_perUnit** → `aki`, dan **EJ_DataStudio** → `ej`.
   - Simpan, lalu commit dan push `config.js`:
   ```
   git add config.js
   git commit -m "Sambungkan CSV Cost Control"
   git push
   ```

Link laporan harian (`harianCsvUrl`) sudah terisi dari repo lama.

## Memperbarui data Excel OH

Klik 2x `update.bat`. Script membaca ketiga Excel. Kalau ada perubahan, `data.json` ditimpa lalu otomatis di-commit dan di-push.

Data Cost Control dan laporan harian tidak perlu di-update manual. Halaman membacanya langsung setiap dibuka, dan memuat ulang setiap 10 menit.

## Catatan

- **Keterangan lagging:** rincian program lagging AI/AKI di tab Anggaran Investasi disalin dari catatan laporan Data Studio, karena tidak ada di spreadsheet. Rincian ini tidak berubah otomatis; minta Claude memperbaruinya, atau taruh catatannya di satu sheet supaya bisa dibaca langsung.
- **Akses publik:** repo dan sheet yang dipublikasikan bersifat publik. Siapa pun yang tahu link-nya bisa melihat isi dashboard, termasuk angka biaya pemeliharaan dan anggaran investasi.
- **Kebutuhan:** Python 3 dengan paket `openpyxl` (`pip install openpyxl`) dan Git yang sudah login ke akun GitHub.
- **Repo lama** `outage-ccom-nre` tidak terpengaruh. Kalau ingin dihentikan, matikan GitHub Pages-nya atau arsipkan repo-nya.
