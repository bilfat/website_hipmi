# HIPMI CENTRAL — ARTHAKARSA

# DESIGN SYSTEM & VISUAL IMPLEMENTATION GUIDE

**Nama dokumen:** `design.md`  
**Versi:** 1.0 — Aurora Glass Editorial  
**Tanggal:** 17 November 2026  
**Proyek:** HIPMI CENTRAL — HIPMI Perguruan Tinggi Universitas Telkom  
**Identitas kabinet aktif:** ARTHAKARSA  
**Status:** Arah visual disetujui sebagai referensi desain; detail teknis menjadi baseline implementasi dan tetap wajib melalui pemeriksaan aset, kontras, responsivitas, serta performa.  
**Ruang lingkup:** Visual identity website publik, personal area, organization management, Workspace, Admin Panel, komponen bersama, motion, glassmorphism, background ornament, responsive, accessibility, dan visual QA.

------------------------------------------------------------------------

# 0. CARA MEMBACA DAN MENGGUNAKAN DOKUMEN

## 0.1 Tujuan dokumen

Dokumen ini adalah **kontrak visual** untuk membangun frontend HIPMI CENTRAL dengan arah desain **Aurora Glass Editorial**. Dokumen harus cukup jelas untuk diikuti AI Agent atau frontend developer tanpa menebak-nebak warna, tipografi, komposisi, bentuk section, glass effect, animasi, state komponen, maupun aturan penggunaan aset.

Dokumen ini bukan pengganti PRD Frontend. Pembagian kewenangan dokumen adalah:

| Dokumen                                           | Menjadi sumber kebenaran untuk                                                                                                                                        |
|:--------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `PRD_frontend.md` / versi terbaru yang disepakati | Seluruh screen, route, navbar, sidebar, role, permission, data dummy, business flow, simulasi, dan acceptance test fungsional                                         |
| `design.md` ini                                   | Arah visual, design token, typography, layout, background, ornament, glass, card, navbar styling, dashboard styling, motion, responsive, accessibility, dan visual QA |
| `desingsystem_revisi_v2.1.md`                     | Rekam keputusan dan sumber historis. Untuk aspek visual yang secara eksplisit diperbarui oleh dokumen ini, gunakan `design.md` terbaru                                |
| Asset repository                                  | File logo, font, foto, ilustrasi, pecahan logo, poster, dan media aktual                                                                                              |

**Aturan utama:** perubahan visual tidak boleh mengubah route, struktur halaman, data, status, role, permission, business rule, maupun alur persetujuan yang telah ditetapkan di PRD.

## 0.2 Prioritas keputusan visual

Arah visual terbaru yang disetujui dalam percakapan proyek ini adalah **Aurora Glass Editorial**. Arah ini memperbarui sebagian ketentuan visual v2.1 sebelumnya.

| Aspek                | Baseline visual terbaru                                                       |
|:---------------------|:------------------------------------------------------------------------------|
| Overall direction    | Aurora Glass Editorial                                                        |
| Karakter             | Clean, premium, warm, layered, editorial, modern, glassmorphic                |
| Primary              | Burgundy `#5A1722`                                                            |
| Deep primary         | Dark Wine `#3D0F16`                                                           |
| Typography display   | ARTHAKARSA Serif Display                                                      |
| Typography UI/body   | Poppins                                                                       |
| Surface utama        | White dan Warm Ivory                                                          |
| Decorative signature | Fine-line contour, flowing ribbon, arch, orbit, dan connected lines           |
| Glass                | Selective glassmorphism; bukan seluruh elemen                                 |
| Motion               | Framer Motion / Motion for React sesuai dependency repository                 |
| Public navbar        | Rounded floating navbar terinspirasi komposisi navbar KPM                     |
| Dashboard            | Structured dashboard dengan sidebar, topbar, stat cards, activity, dan agenda |
| Tab                  | Sliding indicator yang bergerak horizontal dengan halus                       |
| Card                 | Satu card family dengan beberapa bentuk terkontrol                            |
| Dropdown             | Asset-supported dropdown/mega menu                                            |
| Loading              | Centered ARTHAKARSA logo dengan orbit/ring animation                          |
| Error/empty          | Ilustrasi atau asset pendukung yang sesuai konteks                            |

### 0.2.1 Perubahan eksplisit dari Design System v2.1

Ketentuan berikut **diganti untuk visual website** karena pengguna menyetujui moodboard Aurora Glass Editorial:

1.  Pasangan font website Anton + Plus Jakarta Sans diganti menjadi Poppins + ARTHAKARSA Serif Display.
2.  Arah Bold Editorial yang dominan sans-serif diganti menjadi editorial serif display yang hangat, dipadukan dengan UI sans-serif modern.
3.  Komposisi hero Beranda tidak lagi wajib berupa Burgundy solid penuh. Hero dapat menggunakan Warm Ivory/Blush dengan headline Burgundy, foto utama, floating glass cards, dan line art.
4.  Background section boleh berganti secara terarah antara White, Warm Ivory, Blush Beige, Deep Wine, dan glass surface. Tidak semua section harus putih polos.
5.  Background line art dan flowing ribbon menjadi elemen identitas visual yang konsisten, dengan penggunaan selektif.
6.  Navbar publik menggunakan bentuk floating rounded glass/white capsule seperti referensi KPM, sambil mempertahankan identitas logo dan struktur menu HIPMI CENTRAL.

### 0.2.2 Ketentuan yang TIDAK berubah

Hal-hal berikut tetap mengikuti dokumen sistem dan PRD:

- Logo HIPMI, wordmark Telkom University, dan logo kabinet ARTHAKARSA adalah identitas berbeda.
- Logo master tidak boleh di-redraw, di-stretch, di-crop, di-recolor, atau diberi efek langsung.
- Struktur enam menu utama public navigation tetap mengikuti PRD.
- Seluruh 146 Screen ID, route, role, permission, scope, business flow, dan data tetap mengikuti PRD.
- Aturan akses tidak boleh hanya mengandalkan penyembunyian tombol/menu secara visual.
- Frontend-only/demo mode tetap mengikuti batas implementasi pada PRD yang berlaku.
- Data, foto, statistik, nama pengurus, agenda, dan dokumentasi tidak boleh dikarang sebagai data organisasi sungguhan.
- Komponen data padat harus mengutamakan keterbacaan, bukan glass atau dekorasi.

## 0.3 Status nilai desain

Setiap nilai dalam dokumen diberi kategori berikut:

- **OFFICIAL:** nilai brand yang sudah tercantum dalam sumber identitas visual proyek. Jangan diubah tanpa keputusan pemilik proyek.
- **EXTENSION:** warna atau token pendukung yang diusulkan untuk menghidupkan visual Aurora Glass Editorial. Boleh disesuaikan setelah review visual dan contrast test.
- **IMPLEMENTATION BASELINE:** angka awal untuk ukuran, radius, spacing, blur, motion, dan breakpoint. Boleh dituning berdasarkan prototype tanpa mengubah karakter desain.
- **VERIFY ASSET:** file atau path yang harus dicocokkan dengan repository sebenarnya.
- **DO NOT INVENT:** jangan mengarang file, font, logo, foto, atau konten yang belum tersedia.

## 0.4 Aturan penggunaan

1.  Baca PRD terbaru dan dokumen ini sebelum mengimplementasikan komponen.
2.  Gunakan token terpusat; jangan menulis HEX, radius, shadow, atau duration secara acak per halaman.
3.  Buat komponen reusable dengan variants. Jangan membuat desain baru yang berbeda hanya karena screen berbeda.
4.  Terapkan visual sesuai konteks halaman: public editorial, personal, management, workspace, atau admin.
5.  Gunakan logo dan asset yang benar-benar ada. Periksa filename dan format sebelum menulis path.
6.  Semua animasi harus memiliki fallback reduced-motion.
7.  Semua kontrol yang terlihat interaktif harus benar-benar memiliki perilaku sesuai PRD.
8.  Jangan menambahkan konten fiktif, angka statistik palsu, foto stok yang seolah dokumentasi, atau nama pejabat palsu.
9.  Bila sebuah asset tidak tersedia, gunakan fallback yang dirancang; jangan mengarang seolah file tersebut ada.
10. Bila ada konflik antara desain dekoratif dan keterbacaan, keterbacaan selalu menang.

------------------------------------------------------------------------

# 1. DESIGN DIRECTION — AURORA GLASS EDITORIAL

## 1.1 Nama dan karakter

**Aurora Glass Editorial** adalah arah desain yang menggabungkan:

- kehangatan Burgundy, Dark Wine, Warm Ivory, Gold, dan Copper;
- tipografi serif display yang elegan untuk headline;
- Poppins yang bersih untuk navigasi, isi, label, dan komponen;
- glassmorphism dengan blur dan translucency yang terukur;
- background line art berupa lengkung, garis kontur, ribbon, dan orbit;
- komposisi section yang bervariasi tetapi tetap memiliki sistem;
- card dengan bentuk khas, bukan kumpulan kotak seragam;
- motion halus yang membantu orientasi dan memberi kesan hidup;
- dashboard yang rapi dan mudah dipindai.

Visual harus terasa **premium dan khas**, tetapi tidak menjadi ramai, berlebihan, atau mengorbankan kemudahan penggunaan.

## 1.2 Lima prinsip utama

### A. Clean, not empty

Gunakan whitespace sebagai bagian dari desain. Area kosong boleh memiliki gradient sangat lembut, garis lengkung, atau satu ornamen bermakna. Jangan mengisi semua ruang dengan card dan teks.

### B. Glass with purpose

Glass digunakan pada navbar, floating panel, mega dropdown, hero callout, overlay, dan beberapa panel ringkasan. Glass tidak boleh digunakan pada semua komponen.

### C. Editorial hierarchy

Headline serif display menjadi identitas visual. Poppins menjaga seluruh informasi tetap rapi dan mudah dibaca. Satu section harus memiliki satu fokus visual yang jelas.

### D. Layered but controlled

Gunakan kombinasi background, panel, image, line art, dan shadow untuk membangun kedalaman. Hindari menumpuk lebih dari tiga lapisan visual yang saling bersaing dalam satu area.

### E. Motion with meaning

Gerakan harus membantu pengguna memahami perubahan state, perpindahan tab, pembukaan dropdown, pergantian workspace, dan kemunculan konten. Animasi bukan sekadar hiasan yang terus bergerak.

## 1.3 Kata kunci visual

`Aurora` · `Glass` · `Editorial` · `Warm Ivory` · `Burgundy` · `Serif Display` · `Layered Depth` · `Fine Lines` · `Flowing Ribbons` · `Soft Motion` · `Premium Utility` · `Distinctive Cards`

## 1.4 Hal yang harus dihindari

- Seluruh website berwarna Burgundy tanpa jeda surface terang.
- Seluruh section menggunakan layout, bentuk, dan background yang sama.
- Glass dengan opacity terlalu rendah sehingga teks sulit dibaca.
- Garis dekoratif melintasi teks atau menutupi foto.
- Glow neon, gradient pelangi, shadow hitam pekat, atau warna yang tidak harmonis.
- Semua card dibuat pill atau rounded penuh tanpa variasi.
- Semua judul menggunakan serif, termasuk label form dan tabel.
- Semua dashboard terlihat seperti landing page promosi.
- Animasi bounce berlebihan, parallax berat, atau autoplay yang tidak bisa dihentikan.
- Mengubah bentuk, warna, proporsi, atau detail logo master.

------------------------------------------------------------------------

# 2. BRAND IDENTITY & LOGO APPLICATION

## 2.1 Tiga identitas yang harus dibedakan

| Identitas                  | Peran                      | Penggunaan utama                                                      |
|:---------------------------|:---------------------------|:----------------------------------------------------------------------|
| Logo HIPMI                 | Identitas organisasi HIPMI | Public navbar dan konteks identitas organisasi                        |
| Wordmark Telkom University | Identitas institusi        | Di samping logo HIPMI pada public navbar sesuai aset resmi            |
| Logo ARTHAKARSA            | Identitas kabinet aktif    | Loading screen, identitas kabinet, section kabinet, dan media kabinet |

**Penting:** logo ARTHAKARSA tidak menggantikan logo HIPMI atau wordmark Telkom University pada public navbar.

## 2.2 Aturan logo

- Gunakan master asset asli.
- Pertahankan aspect ratio.
- Gunakan `object-fit: contain`.
- Jangan mengubah warna, bentuk, outline, shadow, glow, bevel, atau efek 3D pada logo.
- Jangan memotong bagian logo untuk menyesuaikan container.
- Sediakan clear space di sekeliling logo.
- Background di belakang logo boleh disesuaikan, bukan file logonya.
- Jika logo tidak terbaca pada background gelap, gunakan contained light surface.
- Jangan membuat ulang logo menggunakan teks, CSS, SVG tracing, atau AI-generated imitation.

## 2.3 Asset ARTHAKARSA

Dokumen sumber menyebut `public/assets/logo.png` sebagai master logo ARTHAKARSA. Path aktual tetap harus diverifikasi pada repository sebelum implementasi.

Gunakan logo kabinet pada: - branded loading screen; - dashboard atau area yang secara eksplisit menampilkan identitas kabinet; - hero/section kabinet bila relevan; - footer identitas kabinet; - media yang memang mewakili kabinet aktif.

Jangan memasang logo kabinet di setiap card atau setiap sudut halaman.

## 2.4 Lima elemen/pecahan logo

Lima elemen brand memiliki fungsi semantik:

| Elemen            | Makna                 | Penggunaan visual              |
|:------------------|:----------------------|:-------------------------------|
| Bintang           | Nilai dan dampak      | Highlight prestasi/capaian     |
| Siluet arah       | Pertumbuhan           | Section pengembangan kapasitas |
| Alur dinamis      | Kolaborasi dan proses | Connected lines/divider        |
| Lengkung penopang | Keberlanjutan         | Footer/penutup section         |
| Lengkung fondasi  | Ekosistem             | Komposisi hero/foundation      |

Aturan: - Gunakan asset pecahan asli jika tersedia. - Jangan mengubah warna, proporsi, atau memotong bagian penting. - Jangan menumpuk kelima pecahan dalam satu section. - Jangan menggunakan pecahan logo sebagai pola berulang yang terlalu padat. - Jika asset tidak ditemukan, jangan menggambar ulang seolah asset resmi; gunakan line art dekoratif generik yang tidak diklaim sebagai logo.

## 2.5 Asset foto

- Foto pengurus dan kader harus berasal dari sumber organisasi yang benar dan memiliki izin publikasi.
- Foto stok tidak boleh disajikan sebagai dokumentasi kegiatan HIPMI.
- Foto pimpinan tidak boleh dimanipulasi wajahnya.
- Foto profil kosong/gagal dimuat menggunakan `siluet.png` sesuai keputusan proyek, setelah path aktual diverifikasi.
- Logo selalu menggunakan `contain`; foto menggunakan rasio sesuai konteks.
- Foto tidak boleh dipotong pada wajah atau bagian penting.

## 2.6 Asset manifest wajib

Sebelum coding final, AI Agent harus memeriksa folder aset dan mengisi manifest:

| Field manifest | Keterangan                                                         |
|:---------------|:-------------------------------------------------------------------|
| `asset_name`   | Nama file aktual                                                   |
| `path`         | Path aktual di repository                                          |
| `asset_type`   | Logo, font, illustration, decoration, profile, poster, background  |
| `source`       | Master resmi, user-provided, licensed, generated, atau placeholder |
| `format`       | PNG, SVG, WebP, JPG, WOFF2, dan sebagainya                         |
| `dimensions`   | Lebar × tinggi jika berupa gambar                                  |
| `aspect_ratio` | Rasio asli                                                         |
| `transparency` | Ada/tidak                                                          |
| `usage`        | Halaman/komponen yang boleh memakai                                |
| `alt_text`     | Teks alternatif                                                    |
| `notes`        | Lisensi, crop, fallback, dan batasan                               |

Jangan membuat path palsu untuk memenuhi tabel manifest.

------------------------------------------------------------------------

# 3. COLOR SYSTEM — BURGUNDY, IVORY & SUPPORTING COLORS

## 3.1 Prinsip palet

Primary Burgundy dan Dark Wine tetap menjadi inti identitas. Warna pendukung dipilih agar desain tidak monoton: Ivory, Blush, Antique Gold, Copper, Dusty Mauve, dan Cool Mist.

Warna pendukung di bawah ini tidak menggantikan nilai brand resmi. Nilai EXTENSION berfungsi sebagai variasi surface, dekorasi, dan state visual.

## 3.2 Official brand colors

| Token                | HEX       | Status   | Fungsi                                     |
|:---------------------|:----------|:---------|:-------------------------------------------|
| `brand-burgundy`     | `#5A1722` | OFFICIAL | Primary, CTA, active state, brand headline |
| `brand-dark-wine`    | `#3D0F16` | OFFICIAL | Kedalaman, dark panel, footer, sidebar     |
| `brand-antique-gold` | `#E8B577` | OFFICIAL | Garis, highlight, detail dekoratif         |
| `brand-muted-copper` | `#AF7D66` | OFFICIAL | Border aksen, ornamen sekunder             |
| `brand-warm-ivory`   | `#FDF7F2` | OFFICIAL | Background pendamping                      |
| `neutral-white`      | `#FFFFFF` | OFFICIAL | Surface utama                              |
| `neutral-black`      | `#171313` | OFFICIAL | Teks utama                                 |
| `neutral-muted`      | `#6B6260` | OFFICIAL | Teks sekunder                              |
| `neutral-border`     | `#E9E1DC` | OFFICIAL | Border netral                              |
| `neutral-surface`    | `#FAF8F6` | OFFICIAL | Surface alternatif                         |

## 3.3 Supporting color extensions

| Token                 | HEX       | Status    | Fungsi                                             |
|:----------------------|:----------|:----------|:---------------------------------------------------|
| `surface-blush`       | `#F2E4DC` | EXTENSION | Surface lembut, section editorial, card background |
| `surface-blush-hover` | `#F4E6E8` | EXTENSION | Hover surface yang hangat                          |
| `accent-soft-gold`    | `#D4A76A` | EXTENSION | Ornamen gold yang lebih lembut                     |
| `accent-copper-deep`  | `#B8734E` | EXTENSION | Copper highlight pada ilustrasi/ornamen            |
| `accent-dusty-mauve`  | `#A07A8E` | EXTENSION | Variasi section/card pendukung                     |
| `neutral-cool-mist`   | `#E6E9EF` | EXTENSION | Surface netral untuk chart/metadata                |
| `stroke-soft`         | `#E7DDD5` | EXTENSION | Garis pemisah lembut                               |

Warna EXTENSION harus diuji kontras sebelum dipakai untuk teks atau status. Gold dan Copper terutama dipakai sebagai aksen/garis, bukan teks kecil di atas putih.

## 3.4 Semantic colors

Semantic colors dipakai untuk status sistem, bukan untuk mengganti brand.

| Token            | Rekomendasi awal | Surface rekomendasi | Makna                   |
|:-----------------|:-----------------|:--------------------|:------------------------|
| `status-success` | `#2F7A59`        | `#EAF5EE`           | Berhasil/Approved       |
| `status-warning` | `#A96C16`        | `#FFF4DF`           | Perlu perhatian/Pending |
| `status-error`   | `#B83A42`        | `#FCEBED`           | Gagal/Rejected          |
| `status-info`    | `#356C9A`        | `#EAF2FA`           | Informasi               |
| `status-neutral` | `#6B6260`        | `#F1EEEB`           | Draft/Inactive/Unknown  |

Nilai semantic di atas adalah EXTENSION awal dan wajib melalui contrast test pada prototype. Status tidak boleh disampaikan hanya dengan warna; sertakan label dan/atau ikon.

## 3.5 Color hierarchy

Gunakan proporsi visual sebagai panduan, bukan hitungan pixel kaku:

- 55–65%: White/Warm Ivory sebagai ruang bernapas.
- 15–25%: Burgundy/Dark Wine untuk identitas, hero, sidebar, CTA, atau panel fokus.
- 8–12%: Blush/Neutral Surface sebagai pemisah section.
- 3–7%: Gold/Copper/Mauve sebagai aksen.
- Semantic colors hanya muncul saat dibutuhkan oleh status.

## 3.6 Hover, active, focus, disabled

| State          | Aturan visual                                                          |
|:---------------|:-----------------------------------------------------------------------|
| Default        | Warna brand/surface sesuai fungsi                                      |
| Hover primary  | Burgundy sedikit lebih terang, shadow lembut, lift 1–2 px              |
| Active/pressed | Dark Wine atau pressed surface, scale maksimal sekitar 0.98            |
| Focus-visible  | Ring Burgundy yang jelas dan tidak hanya mengandalkan shadow           |
| Disabled       | Kontras tetap cukup, opacity/surface lebih tenang, cursor nonaktif     |
| Loading        | Dimensi komponen tetap, spinner/progress tampil tanpa menggeser layout |
| Success/error  | Semantic surface + label/ikon yang eksplisit                           |

## 3.7 Background palette

- Main page: White atau Warm Ivory sesuai konteks.
- Editorial section: White, Warm Ivory, atau Blush Beige.
- Dark statement panel: Burgundy/Dark Wine.
- Glass panel: white translucent.
- Dashboard canvas: Warm Ivory sangat lembut atau White.
- Dashboard sidebar: Dark Wine/Burgundy.
- Form dan tabel: White solid untuk keterbacaan.

## 3.8 CSS color tokens

``` css
:root {
  /* Official brand */
  --color-brand-burgundy: #5A1722;
  --color-brand-dark-wine: #3D0F16;
  --color-brand-antique-gold: #E8B577;
  --color-brand-muted-copper: #AF7D66;
  --color-brand-warm-ivory: #FDF7F2;

  /* Official neutrals */
  --color-white: #FFFFFF;
  --color-black: #171313;
  --color-muted: #6B6260;
  --color-border: #E9E1DC;
  --color-surface: #FAF8F6;

  /* Supporting extensions */
  --color-blush: #F2E4DC;
  --color-blush-hover: #F4E6E8;
  --color-soft-gold: #D4A76A;
  --color-deep-copper: #B8734E;
  --color-dusty-mauve: #A07A8E;
  --color-cool-mist: #E6E9EF;
  --color-stroke-soft: #E7DDD5;

  /* Semantic aliases */
  --color-primary: var(--color-brand-burgundy);
  --color-primary-strong: var(--color-brand-dark-wine);
  --color-background: var(--color-brand-warm-ivory);
  --color-surface-primary: var(--color-white);
  --color-text-primary: var(--color-black);
  --color-text-secondary: var(--color-muted);
}
```

------------------------------------------------------------------------

# 4. TYPOGRAPHY — ARTHAKARSA SERIF DISPLAY + POPPINS

## 4.1 Typeface roles

Website menggunakan dua keluarga font:

1.  **ARTHAKARSA Serif Display** — display/headline editorial, elegan, berkarakter, dan menjadi identitas visual.
2.  **Poppins** — UI/body/interface, modern, bersih, mudah dibaca, dan konsisten untuk seluruh komponen.

Jangan menggunakan serif display untuk tabel, form label, navigasi, atau metadata yang padat.

## 4.2 ARTHAKARSA Serif Display

Digunakan untuk: - Hero headline. - Judul section publik. - Editorial feature title. - Judul statement panel. - Judul halaman publik yang membutuhkan karakter editorial. - Angka/statement dekoratif tertentu jika keterbacaan tetap baik. - Headline loading/error page yang memang bersifat display.

Aturan: - Gunakan ukuran besar dengan line-height rapat tetapi tidak saling bertabrakan. - Gunakan regular/medium sesuai file font aktual. - Italic boleh digunakan untuk satu frasa penekanan, bukan seluruh heading. - Jangan memaksakan bold palsu jika font file tidak memiliki weight tersebut. - Hindari serif pada paragraf panjang. - Jangan menggunakan serif display untuk seluruh dashboard operasional.

**VERIFY ASSET:** file font ARTHAKARSA Serif Display harus dicari di repository/assets. Nama family di CSS tidak membuktikan file font tersedia. Jika belum ditemukan, jangan menggantinya diam-diam dengan font lain; tandai dan minta file atau persetujuan fallback.

## 4.3 Poppins

Digunakan untuk: - Public navbar. - Sidebar dan topbar. - Body text. - Label, helper text, caption, overline. - Button dan CTA. - Form dan validation. - Table dan data grid. - Badge dan status. - Metadata tanggal/lokasi. - Dashboard metrics. - Dropdown dan tooltip.

Bobot yang disarankan: - 400: body normal. - 500: label, metadata, body emphasis ringan. - 600: navigation, button, card title UI. - 700: heading sans, statistic label, active menu. - 800: emphasis pendek jika dibutuhkan.

## 4.4 Type scale

| Token         |   Desktop |   Mobile | Font                     | Penggunaan                  |
|:--------------|----------:|---------:|:-------------------------|:----------------------------|
| `display-2xl` | 76–112 px | 44–64 px | ARTHAKARSA Serif Display | Hero utama                  |
| `display-xl`  |  64–80 px | 40–52 px | ARTHAKARSA Serif Display | Headline besar              |
| `display-lg`  |  48–64 px | 34–44 px | ARTHAKARSA Serif Display | Judul section utama         |
| `display-md`  |  36–48 px | 28–36 px | ARTHAKARSA Serif Display | Editorial title             |
| `heading-xl`  |  36–44 px | 28–34 px | Poppins 700              | Dashboard/page heading      |
| `heading-lg`  |  28–36 px | 24–30 px | Poppins 700              | Section heading operasional |
| `heading-md`  |  22–28 px | 20–24 px | Poppins 600–700          | Card/panel title            |
| `heading-sm`  |  18–22 px | 17–20 px | Poppins 600              | Subsection                  |
| `body-lg`     |     18 px | 16–17 px | Poppins 400–500          | Intro paragraph             |
| `body-md`     |     16 px | 15–16 px | Poppins 400              | Body default                |
| `body-sm`     |     14 px |    14 px | Poppins 400–500          | Helper/secondary            |
| `caption`     |  12–13 px | 12–13 px | Poppins 400–500          | Metadata                    |
| `overline`    |  11–12 px | 11–12 px | Poppins 600–700          | Eyebrow/section label       |

Nilai merupakan implementation baseline. Gunakan `clamp()` agar judul tidak meluber pada viewport kecil.

## 4.5 Line-height dan letter spacing

| Elemen          | Line-height | Letter spacing         |
|:----------------|------------:|:-----------------------|
| Serif display   |   0.98–1.12 | -0.02em sampai normal  |
| Poppins heading |   1.12–1.28 | -0.02em sampai -0.01em |
| Body            |     1.5–1.7 | Normal                 |
| Button          |     1.1–1.3 | Normal                 |
| Overline        |     1.3–1.5 | 0.12em–0.18em          |
| Metadata        |     1.4–1.5 | Normal                 |

## 4.6 Fluid typography

``` css
:root {
  --font-display-2xl: clamp(2.75rem, 7vw, 7rem);
  --font-display-xl: clamp(2.5rem, 5.6vw, 5rem);
  --font-display-lg: clamp(2.1rem, 4.4vw, 4rem);
  --font-heading-xl: clamp(1.75rem, 3.2vw, 2.75rem);
  --font-heading-lg: clamp(1.5rem, 2.5vw, 2.25rem);
  --font-body-lg: clamp(1rem, 1.2vw, 1.125rem);
}
```

## 4.7 Font loading

- Prioritaskan font file lokal bila tersedia.
- Jika memakai font provider eksternal, pastikan kebijakan build dan koneksi proyek mengizinkan.
- Gunakan `font-display: swap`.
- Preload hanya font yang benar-benar dipakai di above-the-fold.
- Jangan preload seluruh weight.
- Siapkan fallback serif dan sans-serif yang proporsional.
- Hindari layout shift saat font selesai dimuat.
- Uji karakter Bahasa Indonesia, angka, tanda baca, uppercase, italic, dan font weight.

Contoh token:

``` css
:root {
  --font-display: "ARTHAKARSA Serif Display", Georgia, serif;
  --font-ui: "Poppins", Arial, sans-serif;
}

body,
button,
input,
textarea,
select {
  font-family: var(--font-ui);
}

.display-heading,
.editorial-title {
  font-family: var(--font-display);
}
```

------------------------------------------------------------------------

# 5. BACKGROUND SIGNATURE — FINE LINES, CONTOUR & FLOWING RIBBONS

## 5.1 Background line art sebagai identitas

**Garis lengkung pada moodboard menjadi signature visual ARTHAKARSA.** Garis tidak boleh diperlakukan sebagai pattern acak. Garis harus membangun arah, kedalaman, koneksi, pertumbuhan, dan kontinuitas antar-section.

Background harus tetap terasa bersih. Garis terlihat ketika diperhatikan, tetapi tidak mengganggu konten utama.

## 5.2 Lima keluarga garis

### A. Contour Lines

Garis lengkung berlapis seperti kontur topografi/gelombang yang mengikuti tepi section.

Penggunaan: - pojok kanan atas hero; - pojok kiri bawah section; - sisi luar background dashboard; - area kosong di belakang featured card; - background loading screen.

Aturan: - 2–5 garis dalam satu kelompok. - Stroke 0.75–1.25 px. - Jarak antar-garis 10–24 px. - Warna Antique Gold/Copper dengan opacity 0.12–0.30. - Tidak melewati paragraf atau form.

### B. Flowing Ribbon Lines

Garis panjang yang mengalir dari satu sisi section ke sisi lain. Bisa berupa satu ribbon utama dan satu garis tipis pendamping.

Penggunaan: - divider antar-section; - transisi dari hero ke content; - section impact/statistik; - footer; - bagian bawah hero image.

Aturan: - Satu ribbon utama per section besar. - Maksimal dua garis pendamping. - Jangan membuat gelombang terlalu tinggi hingga mengambil ruang konten. - Gold/Copper hanya sebagai garis aksen. - Jika ribbon memakai gradient, gunakan transisi Burgundy → Copper → Antique Gold secara halus.

### C. Arch / Orbital Lines

Garis berbentuk orbit, setengah lingkaran, oval besar, atau lengkungan yang mengitari foto/objek.

Penggunaan: - foto utama hero; - featured image; - loading animation; - visual highlight card.

Aturan: - Gunakan garis tipis dengan satu titik highlight jika relevan. - Tidak mengitari semua card. - Hindari animasi orbit yang terus berjalan pada elemen dekoratif besar jika mengganggu performa.

### D. Connected Lines

Garis penghubung antarelemen yang mewakili kolaborasi dan struktur.

Penggunaan: - struktur organisasi; - relasi Bidang–Kompartemen; - hubungan proker; - timeline; - diagram proses.

Aturan: - Garis mengikuti hubungan data yang benar. - Warna netral/Copper tipis. - Titik koneksi memiliki makna. - Tidak menampilkan garis dekoratif yang seolah menunjukkan relasi data palsu.

### E. Frame / Inset Lines

Garis frame tipis yang membentuk bingkai di dalam hero atau section.

Penggunaan: - frame hero; - container editorial; - background poster/cover; - panel identitas kabinet.

Aturan: - Stroke 1 px. - Radius mengikuti container. - Opacity rendah. - Frame tidak boleh mengurangi ruang visual atau menabrak navbar.

## 5.3 Warna dan opacity garis

| Token                | Warna dasar | Opacity baseline | Penggunaan                           |
|:---------------------|:------------|-----------------:|:-------------------------------------|
| `line-gold-soft`     | `#E8B577`   |        0.16–0.32 | Contour dan ribbon di surface terang |
| `line-copper-soft`   | `#AF7D66`   |        0.12–0.24 | Garis pendamping                     |
| `line-burgundy-soft` | `#5A1722`   |        0.05–0.12 | Background line pada Ivory           |
| `line-ivory-soft`    | `#FDF7F2`   |        0.12–0.28 | Garis di atas Burgundy               |
| `line-white-soft`    | `#FFFFFF`   |        0.10–0.24 | Frame/contour di dark surface        |

Garis dekoratif tidak boleh menjadi satu-satunya penanda informasi.

## 5.4 Aturan penempatan

- Letakkan line art di area pinggir, sudut, atau ruang kosong.
- Jangan melintasi wajah/foto utama.
- Jangan melintasi teks body, tabel, field, atau tombol.
- Jangan menempatkan garis di bawah teks dengan kontras yang tidak terkontrol.
- Gunakan `pointer-events: none`.
- Gunakan `aria-hidden="true"` untuk dekorasi murni.
- Hindari background pattern yang membuat scroll terasa berisik.
- Gunakan satu fokus line art dominan per section, bukan semua keluarga garis sekaligus.

## 5.5 Section background composition

Section boleh memiliki bentuk berbeda:

| Pattern                   | Bentuk                          | Penggunaan                       |
|:--------------------------|:--------------------------------|:---------------------------------|
| `section-plain`           | White/Ivory solid               | Form, data, intro, dashboard     |
| `section-aurora`          | Ivory + soft radial glow        | Hero publik                      |
| `section-wave`            | Batas section melengkung/ribbon | Transisi hero ke content         |
| `section-glass-block`     | Panel besar translucent         | Program highlights               |
| `section-angled`          | Satu sisi diagonal              | Impact/statistics                |
| `section-dark-statement`  | Burgundy/Dark Wine panel        | Statement/featured impact        |
| `section-editorial-split` | Teks dan foto asimetris         | About, article, organization     |
| `section-layered`         | Card/panel bertumpuk            | Showcase dan feature             |
| `section-connected`       | Connected lines/cards           | Organization/workspace hierarchy |

## 5.6 Background implementation

- Utamakan CSS gradient ringan untuk glow dan SVG untuk line art kompleks.
- SVG dekoratif harus memiliki `viewBox`, tidak blur pada high DPI, dan tidak mengambil fokus keyboard.
- Hindari gambar raster besar hanya untuk membuat garis sederhana.
- Bila menggunakan asset pecahan logo, pakai file asli dan jangan mengubah bentuk.
- Background tidak boleh menghalangi text selection, klik, scroll, atau responsive layout.
- Pada mobile, kurangi jumlah garis dan panjang ribbon.

Contoh CSS konseptual:

``` css
.background-aurora {
  background:
    radial-gradient(
      circle at 82% 16%,
      rgba(232, 181, 119, 0.16),
      transparent 30%
    ),
    radial-gradient(
      circle at 8% 86%,
      rgba(175, 125, 102, 0.10),
      transparent 34%
    ),
    var(--color-brand-warm-ivory);
}

.decorative-lines {
  pointer-events: none;
  position: absolute;
  inset: 0;
  overflow: hidden;
  aria-hidden: true;
}
```

Contoh di atas adalah baseline konsep. Jangan membuat semua section memakai gradient yang sama; setiap section memilih satu pattern yang relevan.

## 5.7 Background density scale

| Level | Kepadatan                          | Penggunaan                                                     |
|:------|:-----------------------------------|:---------------------------------------------------------------|
| `L0`  | Tanpa ornament                     | Form, tabel, halaman sensitif                                  |
| `L1`  | Satu kelompok garis halus          | Halaman publik standar                                         |
| `L2`  | Dua kelompok garis + glow ringan   | Hero/section editorial                                         |
| `L3`  | Ribbon + contour + layered surface | Hero utama atau showcase khusus                                |
| `L4`  | Ornament sangat kaya               | Hanya loading/cover/visual campaign, bukan halaman operasional |

Default website adalah L1–L2. L3 digunakan selektif. L4 tidak digunakan untuk dashboard harian.

------------------------------------------------------------------------

# 6. GLASSMORPHISM SYSTEM

## 6.1 Prinsip glass

Glass harus menciptakan kedalaman dan pemisahan layer, bukan membuat seluruh UI transparan. Setiap glass panel harus memiliki: - background translucent; - backdrop blur yang cukup; - border terang/halus; - shadow lembut; - teks dengan kontras aman; - fallback solid ketika blur tidak didukung.

## 6.2 Glass variants

| Variant           | Background              |     Blur | Border                   | Penggunaan                     |
|:------------------|:------------------------|---------:|:-------------------------|:-------------------------------|
| `glass-navbar`    | `rgba(255,251,247,.78)` | 18–22 px | White 0.65 + warm border | Public navbar                  |
| `glass-floating`  | `rgba(255,255,255,.54)` | 20–24 px | White 0.70               | Hero callout                   |
| `glass-dropdown`  | `rgba(255,251,247,.94)` | 14–18 px | `#E9E1DC`                | Mega dropdown                  |
| `glass-panel`     | `rgba(255,255,255,.66)` | 16–20 px | White 0.60               | Editorial panel                |
| `glass-dashboard` | `rgba(255,255,255,.82)` | 12–18 px | `#E9E1DC`                | Topbar/panel tertentu          |
| `glass-modal`     | `rgba(255,251,247,.90)` | 18–24 px | White 0.70               | Overlay/modal terpilih         |
| `glass-dark`      | `rgba(61,15,22,.78)`    | 16–20 px | White 0.16               | Floating panel di dark surface |

## 6.3 Glass shadow

``` css
:root {
  --glass-shadow-soft: 0 8px 28px rgba(61, 15, 22, 0.07);
  --glass-shadow-medium: 0 14px 40px rgba(61, 15, 22, 0.10);
  --glass-shadow-floating: 0 20px 54px rgba(61, 15, 22, 0.13);
}
```

Shadow tidak boleh tampak hitam pekat. Gunakan warna Dark Wine dengan opacity rendah.

## 6.4 Kapan glass digunakan

**Boleh digunakan:** - Public navbar. - Floating callout pada hero. - Mega dropdown. - Feature overlay pada foto. - Selected dashboard topbar/panel. - Modal ringan yang membutuhkan layer. - Floating quick action jika memang dibutuhkan.

**Tidak boleh digunakan sebagai default:** - Data table. - Form panjang. - Payment proof viewer. - QR code/ticket QR. - Scanner camera frame. - Dense financial report. - Teks panjang yang harus dibaca. - Area yang membutuhkan kontras sangat tinggi. - Semua card secara serentak.

## 6.5 Fallback

Jika `backdrop-filter` tidak tersedia: - gunakan White/Blush solid dengan opacity tinggi; - pertahankan border; - pertahankan shadow ringan; - pastikan teks tetap terbaca; - jangan membuat komponen hilang atau berubah ukuran.

------------------------------------------------------------------------

# 7. LAYOUT, GRID, SPACING & SECTION RHYTHM

## 7.1 Container

| Token                | Nilai baseline | Penggunaan                 |
|:---------------------|---------------:|:---------------------------|
| `container-sm`       |         720 px | Form, article body         |
| `container-md`       |         960 px | Content page               |
| `container-lg`       |        1200 px | Standard content           |
| `container-xl`       |        1360 px | Dashboard/public feature   |
| `container-2xl`      |        1480 px | Wide hero/showcase         |
| `page-gutter`        | 24–64 px fluid | Padding horizontal desktop |
| `page-gutter-mobile` |       16–20 px | Padding horizontal mobile  |

## 7.2 Grid

- Desktop: 12-column grid.
- Tablet: 8-column grid.
- Mobile: 4-column grid.
- Gap desktop: 20–28 px.
- Gap tablet: 16–24 px.
- Gap mobile: 12–16 px.
- Hindari grid yang memaksa text column terlalu sempit.
- Untuk hero, gunakan grid asimetris seperti 5/7 atau 6/6 sesuai foto.
- Untuk dashboard, sidebar dan main content harus memiliki lebar stabil.

## 7.3 Spacing scale

Gunakan basis 4 px:

| Token      |  Nilai |
|:-----------|-------:|
| `space-1`  |   4 px |
| `space-2`  |   8 px |
| `space-3`  |  12 px |
| `space-4`  |  16 px |
| `space-5`  |  20 px |
| `space-6`  |  24 px |
| `space-8`  |  32 px |
| `space-10` |  40 px |
| `space-12` |  48 px |
| `space-16` |  64 px |
| `space-20` |  80 px |
| `space-24` |  96 px |
| `space-28` | 112 px |

## 7.4 Section spacing

- Section publik besar: 88–120 px vertical desktop.
- Section publik medium: 64–88 px.
- Section dashboard: 24–40 px.
- Card internal: 16–28 px padding.
- Form group: 20–28 px vertical.
- Data dense: 12–20 px.

## 7.5 Section shape variation

Setiap halaman boleh memiliki bentuk section berbeda, tetapi harus memakai token dan pattern yang telah didefinisikan.

**Contoh ritme Beranda:**

1.  Hero `section-aurora` — ivory, photo, glass, fine-line orbit.
2.  Value proposition `section-plain` — putih, icon tiles, divider tipis.
3.  Program highlight `section-glass-block` — panel besar rounded, cards image-led.
4.  Impact `section-angled` — dark Burgundy panel dan statistik terang.
5.  Editorial insight `section-editorial-split` — foto horizontal, serif title, ribbon divider.
6.  Footer `section-dark-statement` — Dark Wine, gold contour, informasi organisasi.

Jangan membuat seluruh section Beranda menjadi panel glass. Gunakan pergantian visual agar halaman memiliki ritme.

------------------------------------------------------------------------

# 8. RADIUS, BORDER, SHADOW & CARD SHAPE SYSTEM

## 8.1 Radius tokens

| Token         |  Nilai | Penggunaan            |
|:--------------|-------:|:----------------------|
| `radius-xs`   |   6 px | Badge kecil           |
| `radius-sm`   |  10 px | Input/compact control |
| `radius-md`   |  14 px | Button operasional    |
| `radius-lg`   |  18 px | Standard card         |
| `radius-xl`   |  24 px | Feature card          |
| `radius-2xl`  |  32 px | Hero glass panel      |
| `radius-3xl`  |  40 px | Large editorial panel |
| `radius-pill` | 999 px | CTA pill/tab pill     |

## 8.2 Border tokens

- Default: 1 px solid `#E9E1DC`.
- Glass: 1 px solid rgba(255,255,255,.60).
- Gold decorative: 1 px solid rgba(232,181,119,.30).
- Dark surface: 1 px solid rgba(255,255,255,.14).
- Focus ring: 2–3 px dengan offset yang cukup.

## 8.3 Shadow tokens

``` css
:root {
  --shadow-card: 0 6px 20px rgba(61, 15, 22, 0.06);
  --shadow-card-hover: 0 14px 30px rgba(61, 15, 22, 0.10);
  --shadow-floating: 0 18px 44px rgba(61, 15, 22, 0.12);
  --shadow-navbar: 0 8px 28px rgba(61, 15, 22, 0.08);
  --shadow-modal: 0 24px 64px rgba(61, 15, 22, 0.18);
}
```

## 8.4 Card family

### A. Standard Card

- White/Neutral Surface.
- Radius 18–24 px.
- Border netral.
- Shadow ringan.
- Untuk konten umum dan informasi ringkas.

### B. Editorial Feature Card

- Foto dominan.
- Eyebrow kecil.
- Serif title.
- Deskripsi singkat.
- CTA/link di bagian bawah.
- Rounded 24–32 px.
- Dapat menggunakan satu sisi image bleed.

### C. Glass Card

- Surface translucent.
- Blur terukur.
- Border terang.
- Shadow lembut.
- Untuk floating content/hero, bukan tabel.

### D. Angled Corner Card

- Satu sudut memiliki cut/diagonal treatment.
- Maksimal satu atau dua sudut unik.
- Konten tetap berada dalam safe padding.
- Digunakan untuk statistik/program unggulan.

### E. Notched Card

- Memiliki notch atau cut corner yang halus.
- Digunakan untuk metric/highlight, bukan seluruh list.

### F. Arch/Curve Card

- Salah satu sisi atau top edge memiliki curve/arch.
- Digunakan pada visual editorial atau image highlight.

### G. Pill Card

- Radius sangat besar.
- Untuk status/summary singkat atau feature strip.
- Jangan dipakai untuk konten panjang.

### H. Dark Feature Card

- Burgundy/Dark Wine.
- Teks putih/ivory.
- Gold line art tipis.
- Untuk satu highlight utama per area.

### I. Statistic Card

- Label, nilai, unit, perubahan, dan periode.
- Bentuk boleh berbeda, tetapi informasi harus memiliki struktur sama.
- Tidak boleh menampilkan tren persentase jika dummy data tidak memiliki pembanding yang jelas.

## 8.5 Card interaction

- Hover hanya jika card benar-benar interaktif.
- Lift maksimal 2–4 px.
- Shadow bertambah halus.
- Arrow boleh bergerak 2–4 px.
- Jangan mengubah ukuran card ketika hover.
- Focus-visible harus terlihat.
- Card non-interaktif tidak boleh tampak seperti tombol.
- Seluruh card dapat dibaca tanpa hover.

------------------------------------------------------------------------

# 9. PUBLIC NAVBAR — KPM-INSPIRED FLOATING GLASS NAVBAR

## 9.1 Tujuan

Public navbar harus memiliki komposisi seperti referensi KPM yang dikirim pengguna: - satu container horizontal lebar; - rounded capsule/rounded rectangle; - identitas/logo di kiri; - menu utama di tengah; - search dan tombol akun di kanan; - background putih/glass; - shadow halus dan border tipis; - tinggi proporsional dan tidak terlalu besar.

Referensi KPM hanya digunakan sebagai inspirasi komposisi dan hierarki. Jangan menyalin identitas, logo, tulisan, atau warna KPM.

## 9.2 Desktop composition

``` text
┌─────────────────────────────────────────────────────────────────────────────┐
│ [LOGO HIPMI] [TELKOM WORDMARK]   Beranda  Tentang Kami  Organisasi⌄          │
│                                      Aktivitas⌄  Karya Kader⌄  Kotak Suara   │
│                                           [Search] [Masuk] [Gabung HIPMI ↗]  │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 9.3 Layout specification

| Bagian      | Spesifikasi                                                |
|:------------|:-----------------------------------------------------------|
| Container   | Lebar `calc(100% - 48px)` sampai max-width sekitar 1840 px |
| Position    | Sticky/floating di area atas                               |
| Top spacing | 16–28 px desktop                                           |
| Height      | 76–92 px desktop                                           |
| Radius      | 22–30 px                                                   |
| Background  | White/Glass 0.78–0.92                                      |
| Border      | 1 px warm neutral/white                                    |
| Shadow      | Soft warm shadow                                           |
| Logo area   | Kiri, fixed minimum width                                  |
| Navigation  | Tengah, horizontal, gap 24–36 px                           |
| Action area | Kanan, search + Masuk + Gabung                             |
| Z-index     | Di atas page content, di bawah modal                       |
| Mobile      | Compact bar + drawer                                       |

## 9.4 Logo group

- Gunakan logo HIPMI resmi dan wordmark Telkom University sesuai aset aktual.
- Jaga proporsi dan clear space.
- Logo dan wordmark harus terlihat sebagai satu kelompok identitas institusi, tetapi tetap dua aset berbeda.
- Jangan menggunakan logo ARTHAKARSA sebagai pengganti.
- Jika nama kabinet ditampilkan, letakkan sebagai teks/brand area terpisah dan sesuai konteks.

## 9.5 Public menu

Struktur menu tetap mengikuti PRD:

1.  Beranda
2.  Tentang Kami
3.  Organisasi
    - Kabinet
    - Bidang
    - Kompartemen
    - Program Kerja
4.  Aktivitas
    - Agenda & Tiket
    - Berita & Artikel
    - Media Partner
5.  Karya Kader
    - Bisnis Kader
    - Prestasi Kader
6.  Kotak Suara

Jangan mengganti nama menu atau menghilangkan submenu hanya demi komposisi desain.

## 9.6 Navbar states

| State         | Tampilan                                               |
|:--------------|:-------------------------------------------------------|
| Default top   | White glass capsule, border tipis, shadow ringan       |
| Scrolled      | Background lebih opaque, blur/shadow sedikit meningkat |
| Active route  | Sliding underline Burgundy atau soft Burgundy pill     |
| Hover         | Teks Burgundy lebih tegas, surface blush tipis         |
| Dropdown open | Trigger active, chevron rotate                         |
| Focus         | Focus ring jelas                                       |
| Mobile open   | Drawer/mega panel dengan backdrop lembut               |

## 9.7 Action buttons

- Search: icon button dengan accessible label.
- Masuk: secondary button dengan background Ivory/White.
- Gabung HIPMI: primary Burgundy pill, teks White, arrow icon.
- Jangan menambahkan tombol bahasa atau tombol lain jika tidak ada dalam PRD/keputusan produk.

## 9.8 Dropdown/mega menu

Dropdown bukan panel teks polos. Gunakan layout visual yang memiliki asset slot.

**Mega menu layout:**

- Kolom kiri: feature asset/illustration, eyebrow, title serif, short description, CTA.
- Kolom tengah: daftar submenu dengan icon tile, title, description, arrow.
- Kolom kanan (opsional): featured visual card/illustration.
- Background: white warm glass.
- Radius: 24–30 px.
- Border: soft.
- Shadow: floating.
- Entrance: fade + y 8–14 px + scale sangat ringan.
- Exit: fade + y 4–8 px.
- Desktop trigger: click/keyboard; hover hanya enhancement.
- Mobile: accordion/drawer, bukan hover.

Jika asset tidak tersedia, tampilkan slot ilustrasi fallback yang sesuai, bukan gambar acak.

## 9.9 Mobile navbar

- Logo tetap terbaca.
- Search dapat menjadi icon atau item di drawer sesuai ruang.
- Hamburger menjadi X dengan motion halus.
- Drawer memuat semua menu dan submenu.
- Login/Daftar atau Profile tetap tersedia.
- Body scroll dikunci saat drawer terbuka.
- Escape menutup drawer.
- Focus kembali ke tombol pembuka.
- Semua item dapat diakses tanpa hover.

------------------------------------------------------------------------

# 10. DASHBOARD VISUAL SYSTEM

## 10.1 Prinsip dashboard

Dashboard harus **rapi, data-first, mudah dipindai, dan terasa premium**. Jangan membuat dashboard seperti landing page yang terlalu dekoratif.

Setiap role mengikuti sidebar, menu, data, dan permission dari PRD. Dokumen ini hanya mengatur tampilan visual shell dan komponen dashboard.

## 10.2 Dashboard shell

Struktur umum:

``` text
┌───────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR DARK WINE │ TOPBAR: Search | Notification | Profile               │
│                   ├───────────────────────────────────────────────────────┤
│ Logo/Brand        │ Breadcrumb / Page title                               │
│                   │                                                       │
│ Role menu         │ Welcome / Page intro                                  │
│                   │                                                       │
│ Sliding active    │ Quick tabs / Context switcher                         │
│ indicator         │                                                       │
│                   │ Stats cards                                           │
│                   │                                                       │
│                   │ Activity / Agenda / Main data panel                   │
│                   │                                                       │
│                   │ Tables / forms / details                              │
└───────────────────────────────────────────────────────────────────────────┘
```

## 10.3 Sidebar

- Background utama Dark Wine `#3D0F16` atau Burgundy `#5A1722`.
- Logo ARTHAKARSA/HIPMI sesuai konteks area dan asset rule.
- Teks menu White/Ivory.
- Icon Lucide dengan stroke konsisten.
- Selected item menggunakan sliding pill/soft Burgundy surface.
- Hover menggunakan surface putih dengan opacity rendah.
- Group menu dipisahkan dengan divider tipis.
- Footer sidebar dapat memuat cabinet label atau versi sistem jika dibutuhkan.
- Decorative line art hanya di area bawah/sudut sidebar dan tidak mengganggu menu.
- Sidebar collapse/expand tidak boleh mengubah permission.
- Label menu tetap dapat diketahui saat collapsed melalui tooltip yang aksesibel.

## 10.4 Topbar

- White/Glass surface.
- Search field dengan radius pill/rounded.
- Notification bell dengan unread indicator.
- User avatar, nama, role, dropdown profile.
- Workspace switcher bila role memiliki lebih dari satu konteks.
- Breadcrumb/page title berada pada content area bila topbar sudah padat.
- Topbar tidak memuat seluruh menu sidebar sekali lagi.

## 10.5 Dashboard welcome/header

- Eyebrow kecil Poppins uppercase.
- Headline dapat menggunakan ARTHAKARSA Serif Display hanya pada greeting atau heading utama yang tidak terlalu panjang.
- Deskripsi Poppins.
- Background ivory/white dengan line art halus di salah satu sisi.
- Foto/illustration hanya jika relevan dan tersedia.
- Jangan menggunakan hero setinggi landing page pada dashboard operasional.

## 10.6 Statistic cards

- 3–4 kolom desktop sesuai ruang.
- 2 kolom tablet.
- 1–2 kolom mobile.
- Label dan nilai terlihat jelas.
- Icon tile boleh memiliki background blush/gold.
- Variasi bentuk boleh digunakan dalam satu kelompok, tetapi tinggi dan baseline harus konsisten.
- Angka memakai Poppins semibold/bold atau serif display hanya untuk highlight editorial.
- Perubahan/trend hanya ditampilkan jika ada data pembanding.
- Jangan menggunakan dummy statistic seolah angka real.

## 10.7 Activity panel

- Timeline vertikal dengan connector line.
- Icon tile kecil.
- Title + timestamp + category.
- Link “Lihat Semua” jika route tersedia.
- State kosong menggunakan empty illustration ringan.
- Activity item dapat membuka detail jika memang interaktif di PRD.

## 10.8 Upcoming agenda panel

- Date tile.
- Agenda title.
- Location/time.
- Status.
- Bookmark/quick action hanya jika ditetapkan di PRD.
- Panel tidak boleh mengasumsikan agenda Published jika fixture belum berstatus Published.

## 10.9 Dashboard page patterns

| Pattern          | Struktur                                                            |
|:-----------------|:--------------------------------------------------------------------|
| Overview         | Greeting, stats, activity, upcoming agenda                          |
| Management list  | Page header, filters, summary, table/list                           |
| Detail           | Breadcrumb, title/status, key info, tabs, activity/history          |
| Create/Edit form | Header, grouped fields, helper text, actions                        |
| Approval queue   | Summary, filter, list/table, detail drawer, decision actions        |
| Workspace        | Workspace header, context switcher, roster/task/progress/documents  |
| Report           | Date filter, metrics, chart, data table, export action if available |

## 10.10 Jangan dilakukan pada dashboard

- Hero image besar tanpa fungsi.
- Banyak floating cards yang menutupi data.
- Glass pada semua tabel.
- Animasi angka yang mengganggu.
- Statistik yang tidak memiliki sumber.
- Sidebar dengan menu yang tidak sesuai role.
- Warna berbeda untuk setiap role tanpa dasar identitas.
- Menyembunyikan permission hanya dengan opacity/disabled.

------------------------------------------------------------------------

# 11. SLIDING TAB & NAVIGATION MOTION

## 11.1 Tujuan

Tab harus terasa **menggelinding/bergeser ke samping** ketika pengguna berpindah pilihan. Indicator tidak muncul tiba-tiba; ia berpindah dari item sebelumnya ke item aktif.

## 11.2 Variants

| Variant          | Bentuk                        | Penggunaan                         |
|:-----------------|:------------------------------|:-----------------------------------|
| `tab-underline`  | Garis bawah bergerak          | Public subnav, tab ringan          |
| `tab-pill`       | Background pill bergerak      | Dashboard section tabs             |
| `tab-segmented`  | Segmented surface             | Pilihan mode yang saling eksklusif |
| `tab-scrollable` | Horizontal scroll + indicator | Tab banyak di mobile               |

## 11.3 Motion baseline

- Duration: 260–360 ms.
- Easing: ease-out halus; tidak memakai overshoot besar.
- Indicator mengikuti ukuran item aktif.
- Active state berasal dari route/tab state, bukan hover.
- `layoutId` harus unik per kelompok tab.
- Tab yang dipilih di mobile harus otomatis digeser ke area terlihat.
- Perpindahan konten dapat memakai fade 120–180 ms.
- Jangan menumpuk panel lama dan panel baru sehingga data dua tab terlihat bersamaan.

## 11.4 Interaction rules

- Klik tab mengganti panel/route sesuai PRD.
- Keyboard ArrowLeft/ArrowRight untuk navigasi tab sesuai semantics.
- Enter/Space memilih tab.
- Focus-visible tetap jelas.
- Jika tab berfungsi sebagai route, gunakan link.
- Jika tab mengubah panel lokal, gunakan tab semantics.
- Deep link/refresh harus mengembalikan selected state yang benar bila tab tersebut disinkronkan dengan URL.

## 11.5 Reduced motion

Jika `prefers-reduced-motion: reduce`: - hilangkan slide panjang; - gunakan perubahan state langsung atau fade sangat singkat; - jangan menghilangkan selected indicator; - seluruh fungsi tetap tersedia.

------------------------------------------------------------------------

# 12. DROPDOWN, POPOVER, MEGA MENU & ASSET SLOTS

## 12.1 Dropdown standard

- Background White/Glass.
- Radius 14–20 px.
- Border soft.
- Shadow floating.
- Item height minimal 44 px.
- Icon 18–20 px.
- Active item memiliki background blush/soft Burgundy.
- Chevron berputar 180°.
- Escape menutup panel.
- Klik luar menutup panel jika tidak mengganggu interaksi.
- Tidak boleh keluar viewport.

## 12.2 Mega dropdown

Mega dropdown dapat memiliki: - featured illustration/photo di kiri; - kategori/eyebrow; - heading serif; - deskripsi pendek; - daftar submenu; - icon tile; - featured CTA card di kanan.

## 12.3 Asset slots

Gunakan asset slots untuk: - ilustrasi program; - image feature; - banner kegiatan; - logo kabinet; - icon khusus; - artwork kategori.

Asset slots memiliki: - aspect ratio; - object-fit yang sesuai; - fallback background; - alt text; - ukuran yang konsisten; - tidak mengubah rasio master logo.

## 12.4 Dropdown state

| State    | Perilaku                                      |
|:---------|:----------------------------------------------|
| Closed   | Trigger terlihat                              |
| Open     | Panel muncul dan trigger active               |
| Hover    | Item mendapat soft surface                    |
| Focus    | Focus ring                                    |
| Selected | Item aktif berdasarkan route                  |
| Loading  | Skeleton hanya jika benar-benar menunggu data |
| Empty    | Empty text/asset jika tidak ada submenu data  |

------------------------------------------------------------------------

# 13. BUTTON, CTA & INTERACTIVE STATES

## 13.1 Button variants

| Variant         | Tampilan                                          | Penggunaan                 |
|:----------------|:--------------------------------------------------|:---------------------------|
| Primary         | Burgundy, White text                              | Aksi utama                 |
| Primary Hover   | Burgundy lebih terang + lift                      | Hover                      |
| Secondary       | Ivory/White + Burgundy border                     | Aksi alternatif            |
| Tertiary/Ghost  | Transparan/soft surface                           | Aksi ringan                |
| Outline         | Border Burgundy                                   | Link/CTA alternatif        |
| Gold Accent     | Gold surface dengan teks gelap yang lolos kontras | Highlight khusus           |
| Destructive     | Semantic error                                    | Hapus/tolak/tutup sensitif |
| Icon Button     | Icon-only dengan aria-label                       | Search/close/menu          |
| Public CTA Pill | Radius full, arrow icon                           | CTA publik                 |
| Loading         | Spinner/progress + label                          | Submit/action              |

## 13.2 Sizing

- Small: 36–40 px.
- Medium: 44–48 px.
- Large: 50–56 px.
- Icon target di mobile: minimal 44×44 px bila memungkinkan.
- Public CTA pill: 46–54 px.
- Input height: 44–50 px.

## 13.3 Hover and pressed

- Hover: lift 1–2 px, shadow lembut, warna sedikit berubah.
- Pressed: scale sekitar 0.98 atau shadow lebih rendah.
- Arrow icon: translateX 2–4 px.
- Tidak ada bounce besar.
- Jangan mengubah layout width/height pada hover.

## 13.4 Loading and success

- Loading harus mempertahankan ukuran button.
- Spinner kecil menggunakan stroke Burgundy/White sesuai surface.
- Tidak boleh mengklaim proses berhasil sebelum simulasi/aksi selesai.
- Error menampilkan pesan yang dapat dimengerti.
- Success memakai toast/status label dan tidak hanya flash warna.

------------------------------------------------------------------------

# 14. FORMS, INPUTS, TABLES & DATA-DENSE UI

## 14.1 Forms

Form harus menggunakan surface solid agar field mudah dibaca.

- Label selalu terlihat.
- Placeholder bukan pengganti label.
- Helper text berada dekat field.
- Error message langsung di bawah field.
- Required marker konsisten.
- Grouping field menggunakan heading Poppins.
- Form panjang dibagi section/step bila PRD memang menetapkan.
- Button action memiliki hirarki jelas.
- Focus ring konsisten.
- Pada mobile, keyboard tidak menutupi tombol submit.

## 14.2 Inputs

- White surface.
- Border `#E9E1DC`.
- Radius 10–14 px.
- Height 44–50 px.
- Focus border Burgundy + ring.
- Error border semantic red + message.
- Disabled surface neutral.
- Search field boleh radius pill.
- Date/time/select mengikuti komponen yang konsisten.

## 14.3 Tables

**Table tidak menggunakan glass.**

- Header White/Neutral Surface.
- Body White.
- Border horizontal soft.
- Text Poppins 13–15 px.
- Row height 52–64 px sesuai kepadatan.
- Sticky header jika tabel panjang.
- Hover row sangat lembut.
- Status badge disertai teks.
- Action menu tidak memotong viewport.
- Mobile dapat berubah menjadi card list atau horizontal scroll dengan label jelas.
- Kolom sensitif tetap mengikuti permission PRD.

## 14.4 Data visualization

- Warna chart memakai Burgundy, Dark Wine, Gold, Copper, Mauve, dan semantic colors.
- Jangan menggunakan palet default library tanpa token.
- Selalu sertakan label/legend.
- Tooltip menggunakan solid/glass ringan dengan kontras.
- Chart harus memiliki alternatif data tabel atau ringkasan teks.
- Tidak menggunakan animasi yang mengaburkan pembacaan nilai.

------------------------------------------------------------------------

# 15. LOADING EXPERIENCE — CENTERED ARTHAKARSA BRAND LOADER

## 15.1 Tujuan

Loading screen harus menjadi pengalaman brand yang berkesan, tetapi tidak boleh membuat pengguna menunggu lebih lama dari proses sebenarnya.

## 15.2 Komposisi

- Full viewport.
- Background Dark Wine/Burgundy gradient yang sangat lembut.
- Line art gold/copper berupa orbit/contour di area luar.
- Logo ARTHAKARSA asli di tengah.
- Nama ARTHAKARSA di bawah logo bila sesuai asset/branding.
- Teks status seperti “Menyiapkan pengalaman terbaik…” atau status yang sesuai.
- Indikator loading berupa arc/ring yang mengitari area logo atau progress line di bawah.
- Tidak menggunakan logo HIPMI sebagai pengganti logo kabinet pada branded loader.

## 15.3 Motion

1.  Background glow fade-in.
2.  Logo fade + scale dari 0.96 ke 1.
3.  Fine orbit/arc bergerak perlahan.
4.  Gold highlight berjalan pada ring.
5.  Status text fade-in.
6.  Progress bar hanya menampilkan nilai nyata jika tersedia; jika tidak, gunakan indeterminate loader.

## 15.4 Duration dan behavior

- Entrance: 350–600 ms.
- Orbit: 2.4–4.0 detik per putaran, jika continuous.
- Text reveal: 250–400 ms.
- Tidak boleh menambahkan delay palsu.
- Jangan membuat loading screen menutupi halaman setelah data sudah siap.
- Gunakan skeleton untuk loading konten lokal yang lebih singkat.
- Reduced-motion: logo tetap statis, ring menjadi progress indicator sederhana.

## 15.5 Loading variants

| Variant            | Penggunaan                                     |
|:-------------------|:-----------------------------------------------|
| `brand-fullscreen` | Initial app load/transition tertentu           |
| `page-overlay`     | Perubahan area yang memang memerlukan blocking |
| `inline-spinner`   | Button/action                                  |
| `skeleton`         | Card/list/table loading                        |
| `section-loader`   | Panel data tertentu                            |

------------------------------------------------------------------------

# 16. ERROR, 404, 403, 500 & EMPTY STATES

## 16.1 Visual direction

Error page harus tetap terasa bagian dari ARTHAKARSA: - background Ivory/White; - headline serif display untuk kode/status utama; - body Poppins; - illustration asset yang relevan; - line art lembut; - CTA yang jelas; - tidak menggunakan ilustrasi generik yang tidak berkaitan dengan konteks.

## 16.2 404 — Not Found

- Kode `404` besar.
- Judul “Halaman Tidak Ditemukan”.
- Deskripsi singkat.
- Ilustrasi signpost/path/arah atau asset resmi yang tersedia.
- CTA “Kembali ke Beranda”.
- CTA alternatif hanya jika tujuan benar-benar tersedia.
- Background ivory dengan contour lines di sudut.

## 16.3 403 — Access Denied

- Ilustrasi shield/lock/access.
- Judul “Akses Tidak Diizinkan”.
- Penjelasan singkat bahwa akun tidak memiliki izin.
- Tombol kembali.
- Tombol ajukan akses hanya jika proses tersebut memang tersedia dalam PRD.
- Jangan membocorkan nama halaman/data yang tidak boleh diakses.

## 16.4 500 — System Error

- Ilustrasi abstrak broken connection/technical state.
- Judul “Terjadi Kesalahan”.
- Pesan yang tidak membocorkan detail internal.
- Tombol coba lagi jika aman.
- Tautan kembali ke halaman sebelumnya/beranda.
- Hindari menampilkan stack trace.

## 16.5 Empty state

Setiap domain memiliki ilustrasi/ikon yang sesuai: - Agenda kosong → calendar. - Surat kosong → file-text. - Transaksi kosong → receipt/wallet. - Proker kosong → folder. - Prestasi kosong → award. - Bisnis kosong → store. - Notifikasi kosong → bell. - Search tidak ditemukan → search. - Anggota kosong → users.

Empty state memuat: 1. ilustrasi/ikon; 2. judul; 3. deskripsi; 4. CTA hanya jika pengguna memiliki permission; 5. state tidak boleh tampak seperti error jika memang datanya belum ada.

## 16.6 Asset rule

- Gunakan asset ilustrasi dari repository jika tersedia.
- Jangan mengarang nama path.
- Jika tidak ada asset, gunakan komposisi icon Lucide + line art CSS/SVG yang tidak meniru logo resmi.
- `siluet.png` hanya untuk fallback foto profil manusia, bukan untuk error page atau empty state umum.

------------------------------------------------------------------------

# 17. PUBLIC WEBSITE PAGE VISUAL PATTERNS

Struktur dan isi setiap halaman tetap mengikuti PRD. Bagian ini menentukan pola visual yang digunakan.

## 17.1 Beranda

**Karakter:** paling editorial, paling kaya visual, tetapi tetap terkontrol.

Ritme yang direkomendasikan:

1.  **Floating public navbar** — capsule white/glass, logo HIPMI + wordmark Telkom, menu center, action kanan.
2.  **Hero Aurora** — Warm Ivory/Blush gradient lembut, headline serif besar, copy ringkas, CTA Burgundy, hero photo di kanan, floating glass callout.
3.  **Contour/ribbon divider** — satu flowing line sebagai transisi.
4.  **Value proposition** — heading serif di kiri, 3 value items di kanan, icon tiles.
5.  **Program highlights** — large glass block dengan feature text dan 2–3 program cards.
6.  **Impact/statistics** — panel angled/dark Burgundy di satu sisi dan metric cards di sisi lain.
7.  **Editorial insights** — headline serif, image-led article card, metadata.
8.  **Footer** — Dark Wine, identity, navigation, contact resmi, gold contour.

Hero: - jangan memakai data foto yang belum tersedia; - jangan mengarang angka statistik; - floating cards harus punya informasi yang relevan; - line orbit tidak menutupi foto/teks; - CTA menuju route yang ada di PRD.

## 17.2 Tentang Kami

- Section intro putih/ivory dengan heading serif.
- Narasi organisasi menggunakan Poppins.
- Foto kegiatan/organisasi dalam editorial split.
- Values/mission menggunakan icon tiles atau connected card.
- Sejarah/timeline menggunakan connected lines.
- Jangan mengubah isi resmi atau membuat sejarah fiktif.

## 17.3 Organisasi

- Heading serif untuk judul section.
- Organization chart menggunakan connected lines.
- Struktur Bidang–Kompartemen terlihat jelas.
- Card pimpinan menggunakan foto/aset resmi.
- Carousel pengurus dapat memakai image-led cards.
- Mobile menggunakan tree/accordion vertikal.
- Jangan mengubah struktur jabatan/relasi.

## 17.4 Aktivitas

- Page header dengan heading serif dan deskripsi Poppins.
- Filter dan tabs menggunakan sliding indicator.
- Agenda menggunakan event cards dengan poster/tanggal/status.
- Berita & Artikel menggunakan editorial cards.
- Media Partner menggunakan form/data-first surface.
- Bukti pembayaran dan data peserta tetap solid/terbaca, tidak memakai glass yang mengganggu.

## 17.5 Karya Kader

- Bisnis Kader menggunakan business cards/gallery.
- Prestasi Kader menggunakan achievement cards.
- Foto harus relevan dengan bisnis/prestasi yang benar.
- Filter kategori dapat memakai tab/segmented control.
- Statistik hanya dari data valid.
- Gunakan satu featured card, bukan semua card berukuran besar.

## 17.6 Kotak Suara

- Desain tenang, privat, dan tidak seperti halaman promosi.
- Form solid White.
- Instruksi jelas.
- Status pengajuan menggunakan badge + teks.
- Line art hanya sangat ringan di background.
- Tidak menampilkan identitas/isi aspirasi yang harus privat.

------------------------------------------------------------------------

# 18. PERSONAL AREA VISUAL PATTERNS

## 18.1 Prinsip

Personal Area harus terasa lebih sederhana daripada public website dan dashboard pengurus. Fokusnya adalah kebutuhan pengguna terhadap akun, profil, keanggotaan, aktivitas, notifikasi, dan pengaturan.

## 18.2 Layout

- Topbar sederhana.
- Sidebar/personal navigation mengikuti PRD.
- Profile header dengan avatar.
- Section content memakai White/Ivory.
- Tabs bergerak horizontal.
- Card radius 18–24 px.
- Form solid.
- Empty states sesuai domain.
- Jangan memakai hero dekoratif besar pada setiap halaman personal.

## 18.3 Profile card

- Foto 1:1.
- Nama.
- Status/role sesuai izin.
- Informasi profil yang memang boleh dilihat pemilik.
- Edit action sesuai permission.
- Fallback foto menggunakan `siluet.png` jika tersedia.

## 18.4 Membership and activity

- Status keanggotaan memakai badge dan label.
- Aktivitas menggunakan timeline.
- Daftar proker/agenda menggunakan card compact.
- Detail sensitif tidak boleh muncul hanya karena tersedia di dummy fixture; tampilkan sesuai permission PRD.

------------------------------------------------------------------------

# 19. ORGANIZATION MANAGEMENT VISUAL PATTERNS

## 19.1 Prinsip

Management area memiliki informasi yang lebih padat. Visual harus tegas, konsisten, dan berorientasi tindakan.

## 19.2 Shared dashboard shell

- Sidebar dark wine.
- Topbar glass/white.
- Page header dengan breadcrumb.
- Context/scope selector bila dibutuhkan.
- Summary cards.
- Data list/table.
- Detail drawer/modal bila sesuai.
- Tabs sliding indicator.
- Activity/history panel.

## 19.3 Role-aware navigation

Sidebar item, urutan, submenu, active state, dan visibility harus berasal dari konfigurasi role/permission PRD. `design.md` tidak membuat daftar menu role baru.

## 19.4 Approval queue

- Queue list menggunakan solid table/card.
- Status badge jelas.
- Detail dapat muncul di side panel/drawer.
- Action approval/destructive dipisahkan.
- Konfirmasi harus jelas.
- Tidak menggunakan gold sebagai teks kecil.
- Loading/error/empty state tersedia.

## 19.5 Calendar and scheduling

- Calendar surface solid.
- Event card memiliki status.
- Today/selected/disabled date dibedakan.
- Filter dan view switch memakai sliding/segmented control.
- Kalender mobile dapat berubah menjadi agenda list.
- Tidak menggunakan glass pada seluruh grid kalender.

------------------------------------------------------------------------

# 20. WORKSPACE VISUAL PATTERNS

## 20.1 Tiga konteks Workspace

PRD menetapkan tiga konteks: - Workspace Bidang; - Workspace Kompartemen; - Workspace Proker.

Ketiganya menggunakan sistem visual yang sama dengan konteks/isi yang mengikuti data dan permission PRD. Jangan menciptakan shell berbeda yang mengubah business flow.

## 20.2 Workspace header

- Nama workspace.
- Jenis/konteks workspace.
- Breadcrumb.
- Status.
- Context switcher.
- Action sesuai permission.
- Background line art ringan pada area header saja.

## 20.3 Workspace switcher

- Dropdown/command menu.
- Menampilkan pilihan workspace yang benar-benar tersedia untuk akun demo.
- Selected workspace memakai Burgundy pill/indicator.
- Transisi pergantian workspace menggunakan slide/fade halus.
- Tidak menampilkan workspace yang tidak memiliki akses.
- Deep link dan refresh harus menjaga konteks yang benar.

## 20.4 Roster and members

- Avatar, nama, jabatan/tugas sesuai data yang boleh dilihat.
- Card/list solid.
- Filter dan search.
- Jangan menampilkan seluruh roster kepada role yang hanya boleh melihat record dirinya.
- `siluet.png` sebagai fallback avatar.

## 20.5 Task/progress/document panels

- Gunakan card/table yang rapi.
- Status jelas.
- Progress hanya menampilkan nilai yang memang didefinisikan PRD.
- Jangan menambah PIC individual pada Task Board jika business rule melarangnya.
- Dokumen memakai file card dengan nama, tanggal, versi/status, dan action sesuai permission.
- Activity history menggunakan timeline.

------------------------------------------------------------------------

# 21. ADMIN PANEL VISUAL PATTERNS

## 21.1 Prinsip

Admin Panel mengutamakan kontrol, struktur, dan kejelasan. Visual premium tidak boleh mengurangi presisi pengelolaan data.

## 21.2 Layout

- Sidebar dark wine yang lebih compact.
- Topbar dengan search/notification/profile.
- Breadcrumb dan page title.
- Data table solid.
- Form section terkelompok.
- Role/permission matrix menggunakan grid yang dapat discan.
- Modal konfirmasi untuk tindakan berisiko.
- Audit/activity history menggunakan timeline.

## 21.3 Permission matrix

- Gunakan kolom dan row yang konsisten.
- Tampilkan role/permission label.
- Status on/off harus memiliki label atau icon.
- Jangan mengandalkan warna saja.
- Perubahan permission harus memiliki konfirmasi.
- Layout mobile berubah menjadi grouped permission cards atau horizontal scroll dengan label yang tetap terlihat.

## 21.4 Cabinet Center

- Cabinet card memakai logo/brand kabinet sesuai data.
- Periode dan status terlihat jelas.
- Current cabinet dapat diberi highlight Burgundy.
- Arsip kabinet mempertahankan identitas historis masing-masing.
- Jangan mengganti logo/foto kabinet lama menjadi ARTHAKARSA.

------------------------------------------------------------------------

# 22. MOTION SYSTEM — FRAMER MOTION / MOTION FOR REACT

## 22.1 Prinsip motion

Gunakan satu motion system terpusat. Implementasi mengikuti dependency Motion/Framer Motion yang tersedia di repository. Jangan memasang dua engine animasi yang mengontrol properti yang sama.

## 22.2 Motion tokens

| Token             | Duration baseline | Penggunaan                     |
|:------------------|------------------:|:-------------------------------|
| `motion-instant`  |        100–140 ms | Press/feedback cepat           |
| `motion-fast`     |        150–200 ms | Hover, icon, micro interaction |
| `motion-standard` |        220–300 ms | Dropdown, button, panel        |
| `motion-slide`    |        260–360 ms | Tabs, navbar indicator         |
| `motion-page`     |        320–450 ms | Page transition                |
| `motion-section`  |        400–600 ms | Section reveal                 |
| `motion-stagger`  |    40–80 ms delay | List/card reveal               |
| `motion-orbit`    |         2.4–4.0 s | Decorative orbit loop          |

## 22.3 Easing

Baseline easing: - `ease-out`: `cubic-bezier(0.22, 1, 0.36, 1)` - `ease-standard`: `cubic-bezier(0.2, 0.8, 0.2, 1)` - `ease-in-out`: `cubic-bezier(0.65, 0, 0.35, 1)`

Hindari overshoot berlebihan, elastic bounce, dan gerakan yang membuat elemen terlihat tidak stabil.

## 22.4 Motion registry

| ID       | Nama               | Trigger                | Perilaku                              |
|:---------|:-------------------|:-----------------------|:--------------------------------------|
| `MOT-01` | `nav-active-slide` | Route berubah          | Underline/pill bergerak ke item aktif |
| `MOT-02` | `tab-glide`        | Tab dipilih            | Indicator menggelinding ke samping    |
| `MOT-03` | `sidebar-pill`     | Sidebar route berubah  | Active background berpindah           |
| `MOT-04` | `dropdown-reveal`  | Dropdown dibuka        | Fade + y 8–14 px                      |
| `MOT-05` | `mega-menu-enter`  | Mega menu dibuka       | Fade + scale 0.98→1                   |
| `MOT-06` | `section-fade-up`  | Section masuk viewport | Fade + y 16–24 px                     |
| `MOT-07` | `card-stagger`     | List masuk viewport    | Card muncul bertahap                  |
| `MOT-08` | `card-hover-lift`  | Pointer hover          | Lift 1–4 px + shadow                  |
| `MOT-09` | `hero-image-enter` | Initial load           | Photo reveal/scale halus              |
| `MOT-10` | `line-draw`        | Section reveal         | Decorative SVG line tergambar         |
| `MOT-11` | `ribbon-reveal`    | Section reveal         | Ribbon fade/mask reveal               |
| `MOT-12` | `workspace-switch` | Workspace berubah      | Content crossfade/slide pendek        |
| `MOT-13` | `loading-orbit`    | Loading aktif          | Ring/orbit berputar                   |
| `MOT-14` | `notification-pop` | Notification muncul    | Fade/scale ringan                     |
| `MOT-15` | `modal-enter`      | Modal dibuka           | Fade + scale ringan                   |

## 22.5 Scroll reveal

- Trigger ketika section mendekati viewport.
- Gunakan once untuk konten yang tidak perlu muncul berulang.
- Jangan menyembunyikan konten utama sebelum animation engine siap.
- Jangan membuat user harus scroll pelan untuk melihat konten.
- Jangan memakai parallax berat pada semua section.
- Pada mobile, kurangi jarak gerak dan jumlah stagger.
- Konten tetap terlihat bila JavaScript/motion gagal.

## 22.6 Hover motion

- Card interaktif: lift 2–4 px.
- Button: lift 1–2 px.
- Arrow: translateX 2–4 px.
- Chevron: rotate 180°.
- Image: scale maksimal 1.02–1.04 di container overflow-hidden.
- Tidak semua card harus memiliki hover.
- Tidak ada hover-only content yang menyembunyikan informasi penting.

## 22.7 Page transition

- Fade 120–180 ms.
- Slide horizontal maksimal 8–14 px jika konteks mendukung.
- Tidak boleh mengganggu browser Back/Forward.
- Tidak boleh menahan navigasi.
- Deep link/refresh harus tetap bekerja.
- Reduced-motion menghilangkan slide besar.

## 22.8 Reduced motion

Jika pengguna mengaktifkan `prefers-reduced-motion`: - nonaktifkan orbit loop dekoratif; - nonaktifkan parallax; - hilangkan stagger panjang; - ganti slide besar dengan fade/instant; - pertahankan active state; - pertahankan informasi dan feedback; - jangan menghilangkan loader/status yang dibutuhkan.

------------------------------------------------------------------------

# 23. ICONOGRAPHY & ILLUSTRATION

## 23.1 UI icons

Gunakan Lucide sebagai library ikon UI utama sesuai dependency proyek.

- 16 px: inline/metadata.
- 20 px: navbar/sidebar/button.
- 24 px: card/action utama.
- 32 px: empty state.
- Stroke 1.5–2 px.
- Icon button wajib memiliki accessible label.
- Icon status selalu didampingi teks.
- Jangan mencampur beberapa library ikon untuk fungsi standar.

## 23.2 Brand illustration

- Gunakan ilustrasi yang sesuai dengan identitas ARTHAKARSA.
- Gunakan Burgundy, Ivory, Gold, Copper, Mauve.
- Hindari ilustrasi neon/cartoon yang tidak konsisten.
- Jangan meniru logo resmi melalui ilustrasi.
- Jangan menggunakan stok orang sebagai foto kegiatan organisasi.
- Gunakan asset ilustrasi yang benar-benar tersedia.

## 23.3 Dropdown illustrations

Mega menu dapat memiliki satu visual utama: - gedung/arsitektur; - abstract growth; - networking; - program/learning; - agenda/event; - business ecosystem.

Asset dipilih berdasarkan isi submenu, bukan random.

## 23.4 Error illustrations

Gunakan ilustrasi sesuai konteks: - 404: arah/jalan/signpost. - 403: shield/lock. - 500: broken connection/system. - Empty event: calendar. - Empty document: file. - Empty member: people. - Empty achievement: award.

------------------------------------------------------------------------

# 24. RESPONSIVE DESIGN

## 24.1 Breakpoints

Gunakan breakpoint proyek yang konsisten. Baseline:

| Breakpoint |        Lebar | Keterangan                |
|:-----------|-------------:|:--------------------------|
| `xs`       |   320–359 px | Small mobile              |
| `sm`       |   360–479 px | Mobile                    |
| `md`       |   480–767 px | Large mobile/small tablet |
| `lg`       |  768–1023 px | Tablet                    |
| `xl`       | 1024–1279 px | Small desktop             |
| `2xl`      | 1280–1535 px | Desktop                   |
| `3xl`      |     1536 px+ | Wide desktop              |

Nilai disesuaikan dengan Tailwind/config repository aktual.

## 24.2 Public navbar

- Desktop: full floating capsule.
- Tablet: menu dapat dipadatkan atau berubah ke drawer.
- Mobile: logo + hamburger + account CTA seperlunya.
- Dropdown desktop menjadi accordion/drawer di mobile.
- Tidak boleh ada horizontal overflow halaman.

## 24.3 Hero

- Desktop: text/photo split.
- Tablet: komposisi 45/55 atau stacked sesuai lebar.
- Mobile: headline dahulu, CTA, baru image.
- Floating cards dapat disusun ulang menjadi stack.
- Line art dikurangi.
- Jangan menutupi wajah atau headline.

## 24.4 Cards

- Desktop: 3–4 kolom sesuai konten.
- Tablet: 2 kolom.
- Mobile: 1 kolom atau horizontal carousel bila cocok.
- Semua informasi tetap dapat diakses tanpa hover.
- Card tidak boleh terlalu kecil untuk disentuh.

## 24.5 Dashboard

- Sidebar collapse atau drawer.
- Topbar tetap ringkas.
- Statistik menjadi 2 kolom/1 kolom.
- Activity dan agenda dapat ditumpuk.
- Tabel menjadi mobile card list atau horizontal scroll yang terkontrol.
- Filter menjadi sheet/select bila perlu.
- Tidak menghapus field penting hanya untuk menghemat ruang.

## 24.6 Motion on mobile

- Kurangi jarak slide.
- Hindari parallax.
- Kurangi continuous animation.
- Prioritaskan swipe dengan fallback tombol.
- Tab terpilih auto-scroll ke area terlihat.
- Tidak mengganggu vertical scroll.

------------------------------------------------------------------------

# 25. ACCESSIBILITY & USABILITY

## 25.1 General

- Semua elemen penting dapat digunakan dengan keyboard.
- Focus-visible jelas.
- Text contrast harus diuji pada background sebenarnya.
- Jangan mengandalkan warna saja.
- Semua image informatif memiliki alt.
- Decorative SVG memiliki `aria-hidden`.
- Icon-only button memiliki accessible name.
- Form label selalu tersedia.
- Error message terhubung ke field.
- Modal/drawer memiliki focus management.
- Semua menu dapat digunakan tanpa hover.
- Zoom browser tidak merusak layout.

## 25.2 Motion accessibility

- Hormati `prefers-reduced-motion`.
- Tidak ada flashing/strobing.
- Autoplay carousel harus dapat dihentikan/dikontrol.
- Animasi dekoratif tidak boleh menjadi satu-satunya indikator loading/status.
- Jangan membuat motion terus menerus tanpa tujuan.

## 25.3 Glass accessibility

- Uji teks pada glass di atas seluruh background.
- Jika kontras tidak cukup, tingkatkan opacity atau gunakan solid fallback.
- Jangan menempatkan teks kecil di atas garis gold.
- Hindari blur berlebihan yang membuat panel sulit dibedakan.

## 25.4 Target

Gunakan WCAG 2.2 AA sebagai target evaluasi. Jangan menyatakan sudah compliant sebelum dilakukan audit pada prototype dan implementasi aktual.

------------------------------------------------------------------------

# 26. PERFORMANCE & IMPLEMENTATION SAFETY

## 26.1 Performance

- Animasi mengutamakan `transform` dan `opacity`.
- Hindari animasi layout berat berulang.
- Hindari filter blur besar pada area fullscreen yang terus bergerak.
- Lazy-load media di bawah fold.
- Tetapkan aspect ratio gambar sebelum load.
- Gunakan ukuran gambar responsif.
- Jangan preload semua font.
- Jangan render dekorasi SVG yang sangat kompleks di setiap section.
- Jangan re-render seluruh dashboard setiap pixel scroll.
- Gunakan intersection observer untuk scroll state jika sesuai.
- Uji pada perangkat mobile kelas menengah/rendah.

## 26.2 Glass performance

- Blur besar digunakan hanya pada komponen penting.
- Hindari nested backdrop-filter bertingkat.
- Kurangi blur pada mobile.
- Sediakan fallback solid.
- Jangan membuat seluruh background menjadi video/animated canvas.

## 26.3 Asset performance

- Gunakan file master sebagai sumber.
- Buat optimized variant tanpa menimpa master.
- Lazy-load image.
- Preload hanya hero asset yang benar-benar penting.
- Pastikan font dan logo tidak menyebabkan layout shift.
- Tangani image error satu kali agar tidak terjadi fallback loop.

## 26.4 Implementation safety

- Jangan menambahkan dependency hanya untuk satu efek kecil jika CSS cukup.
- Gunakan Motion untuk shared layout/complex transition.
- Jangan mengontrol `transform` pada elemen yang sama melalui dua engine.
- Jangan mengubah permission berdasarkan state visual.
- Jangan membuat button yang hanya dekoratif tetapi tampak aktif.
- Jangan membuat fake progress bar yang menunjukkan angka palsu.

------------------------------------------------------------------------

# 27. COMPONENT REGISTRY

Komponen di bawah menjadi baseline visual reusable. Props teknis mengikuti implementasi dan kebutuhan PRD.

| Component                | Variants                                    | Visual responsibility                        |
|:-------------------------|:--------------------------------------------|:---------------------------------------------|
| `PublicNavbar`           | Default, Scrolled, Mobile                   | Floating capsule, active underline, dropdown |
| `PublicMegaMenu`         | Organization, Activity, Karya Kader         | Asset slot, feature panel, submenu list      |
| `MobileNavigationDrawer` | Open, Closed                                | Drawer/accordion                             |
| `DashboardShell`         | Standard, Compact                           | Sidebar + topbar + content                   |
| `Sidebar`                | Expanded, Collapsed                         | Dark wine, sliding active pill               |
| `Topbar`                 | Standard, SearchFocused                     | Glass/white surface                          |
| `WorkspaceSwitcher`      | Closed, Open, Selected                      | Context selector                             |
| `PageHeader`             | Public, Dashboard, Detail                   | Eyebrow, title, description, breadcrumb      |
| `SectionHeader`          | Editorial, Compact                          | Serif/Poppins hierarchy                      |
| `GlassPanel`             | Light, Dark, Floating                       | Selective glass                              |
| `Card`                   | Standard, Hoverable, Static                 | General content                              |
| `EditorialFeatureCard`   | Horizontal, Vertical, Featured              | Image-led editorial                          |
| `StatCard`               | Standard, Angled, Notched, Dark             | Metrics                                      |
| `ProfileCard`            | Compact, Portrait, Featured                 | Avatar, name, role                           |
| `ProgramCard`            | Standard, Featured                          | Program content                              |
| `EventCard`              | Standard, Featured, Compact                 | Poster, date, location, status               |
| `ArticleCard`            | Horizontal, Vertical, Featured              | Editorial content                            |
| `BusinessCard`           | Grid, Featured                              | Business showcase                            |
| `AchievementCard`        | Grid, Featured                              | Achievement showcase                         |
| `Tabs`                   | Underline, Pill, Scrollable                 | Sliding indicator                            |
| `SegmentedControl`       | Compact, Wide                               | Mode selection                               |
| `Dropdown`               | Standard, AssetMenu                         | Menu surface and motion                      |
| `Button`                 | Primary, Secondary, Ghost, CTA, Destructive | Actions                                      |
| `Input`                  | Text, Search, Date, Select                  | Form controls                                |
| `FormSection`            | Standard, Grouped                           | Form hierarchy                               |
| `DataTable`              | Standard, Dense, Responsive                 | Solid data display                           |
| `StatusBadge`            | Success, Warning, Error, Info, Neutral      | Text + semantic state                        |
| `ActivityTimeline`       | Compact, Detailed                           | Activity history                             |
| `AgendaList`             | Compact, Detailed                           | Upcoming agenda                              |
| `Modal`                  | Standard, Confirmation                      | Overlay/dialog                               |
| `Drawer`                 | Side, BottomSheet, Fullscreen               | Detail/mobile interaction                    |
| `Toast`                  | Success, Error, Warning, Info               | Feedback                                     |
| `Skeleton`               | Text, Card, Table, Avatar                   | Loading placeholder                          |
| `BrandLoader`            | Fullscreen, Overlay                         | Center logo + orbit                          |
| `ErrorState`             | 404, 403, 500                               | Illustration + recovery                      |
| `EmptyState`             | Domain-specific                             | Empty illustration + CTA                     |
| `DecorativeLineGroup`    | Contour, Ribbon, Orbit, Frame               | Background ornament                          |
| `BrandOrnament`          | Five approved brand fragments               | Semantic decoration                          |

Komponen serupa harus menggunakan satu primitive dengan variants, bukan salinan terpisah yang tidak konsisten.

------------------------------------------------------------------------

# 28. PAGE-TO-VISUAL MAPPING

Tabel ini bukan pengganti inventaris screen PRD. Tujuannya memetakan kelompok halaman ke pola visual utama.

| Area                    | Visual shell          | Komponen utama                         | Dekorasi |
|:------------------------|:----------------------|:---------------------------------------|:---------|
| Public Home             | Editorial Aurora      | Navbar, hero, feature, metric, article | L2–L3    |
| Public About            | Editorial split       | Section header, image/text, timeline   | L1–L2    |
| Public Organization     | Connected editorial   | Org tree, profile card, carousel       | L1–L2    |
| Public Activity         | Data/editorial hybrid | Filter, event, article, medpart        | L0–L1    |
| Public Karya Kader      | Image-led showcase    | Business, achievement, filters         | L1–L2    |
| Public Kotak Suara      | Form-first            | Form, status, instruction              | L0–L1    |
| Authentication          | Minimal clean         | Form, card, validation                 | L0–L1    |
| Personal Area           | Compact dashboard     | Profile, tabs, activity, settings      | L0–L1    |
| Organization Management | Data-first dashboard  | Sidebar, topbar, table, approval       | L0–L1    |
| Workspace Bidang        | Workspace shell       | Switcher, summary, unit content        | L1       |
| Workspace Kompartemen   | Workspace shell       | Members, progress, history             | L1       |
| Workspace Proker        | Workspace shell       | Roster, task, documents, status        | L1       |
| Admin Panel             | Control dashboard     | Permission matrix, table, forms        | L0–L1    |
| Loading                 | Branded immersive     | Logo, orbit, progress                  | L3       |
| Error/Empty             | Illustration-led      | Error state, CTA, icon                 | L1–L2    |

## 28.1 Public Home section template

| Section  | Pattern          | Dominant surface | Primary visual          |
|:---------|:-----------------|:-----------------|:------------------------|
| Navbar   | Floating capsule | White Glass      | Logo + navigation       |
| Hero     | Aurora split     | Warm Ivory/Blush | Serif headline + photo  |
| Values   | Editorial row    | White            | Icon tiles              |
| Programs | Glass block      | Glass/Blush      | Feature + program cards |
| Impact   | Angled statement | Burgundy + White | Metric                  |
| Articles | Editorial split  | Ivory/White      | Horizontal feature card |
| Footer   | Dark statement   | Dark Wine        | Brand identity + links  |

## 28.2 Dashboard template

| Section     | Pattern           | Surface                 |
|:------------|:------------------|:------------------------|
| Sidebar     | Fixed/collapsible | Dark Wine               |
| Topbar      | Floating/solid    | White Glass             |
| Page header | Editorial compact | White/Ivory             |
| Quick tabs  | Sliding pill      | White/Glass             |
| Statistics  | Card family       | White/Blush/Gold accent |
| Activity    | Timeline panel    | White                   |
| Agenda      | List/card panel   | White                   |
| Data table  | Solid table       | White                   |
| Footer      | Minimal           | Transparent/White       |

------------------------------------------------------------------------

# 29. DESIGN TOKEN REGISTRY

## 29.1 Token categories

Semua token disimpan terpusat: - color; - semantic color; - typography; - spacing; - container; - radius; - border; - shadow; - glass; - motion duration; - motion easing; - z-index; - responsive breakpoints.

Jangan menyimpan nilai yang sama dengan nama berbeda tanpa alasan.

## 29.2 CSS token baseline

``` css
:root {
  /* Color */
  --brand-primary: #5A1722;
  --brand-deep: #3D0F16;
  --brand-gold: #E8B577;
  --brand-copper: #AF7D66;
  --surface-ivory: #FDF7F2;
  --surface-white: #FFFFFF;
  --surface-neutral: #FAF8F6;
  --surface-blush: #F2E4DC;
  --text-primary: #171313;
  --text-secondary: #6B6260;
  --border-default: #E9E1DC;

  /* Typography */
  --font-display: "ARTHAKARSA Serif Display", Georgia, serif;
  --font-ui: "Poppins", Arial, sans-serif;

  /* Radius */
  --radius-sm: 10px;
  --radius-md: 14px;
  --radius-lg: 18px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --radius-3xl: 40px;
  --radius-pill: 999px;

  /* Glass */
  --glass-bg: rgba(255, 251, 247, 0.78);
  --glass-border: rgba(255, 255, 255, 0.65);
  --glass-blur: 20px;
  --glass-shadow: 0 8px 28px rgba(61, 15, 22, 0.08);

  /* Motion */
  --motion-fast: 180ms;
  --motion-standard: 260ms;
  --motion-slide: 320ms;
  --motion-page: 420ms;
  --motion-ease: cubic-bezier(0.22, 1, 0.36, 1);

  /* Layout */
  --container-content: 1200px;
  --container-wide: 1360px;
  --container-ultra: 1480px;
  --page-gutter: clamp(16px, 4vw, 64px);
}
```

## 29.3 Token governance

- Official colors tidak diubah.
- Extension colors hanya digunakan sesuai fungsi.
- Typography tidak ditambah tanpa persetujuan.
- Setiap token harus memiliki nama semantik.
- Token baru harus dicatat pada changelog.
- Jangan hardcode nilai berulang pada screen.
- Bila warna token gagal contrast test, sesuaikan state/surface atau gunakan solid fallback; jangan mengubah official brand color secara sepihak.

------------------------------------------------------------------------

# 30. IMPLEMENTATION RULES FOR AI AGENT

## 30.1 Wajib dibaca sebelum implementasi

AI Agent harus membaca: 1. PRD Frontend terbaru. 2. `design.md` ini. 3. Struktur repository. 4. Asset manifest/folder assets. 5. Package manifest dan lockfile. 6. Route/layout yang sudah ada.

Jangan mulai coding berdasarkan moodboard saja tanpa memahami PRD dan repository.

## 30.2 Prioritas implementasi visual

Urutan implementasi: 1. Font loading dan color tokens. 2. Global background, line art primitives, spacing, radius, shadow. 3. Public navbar dan dropdown. 4. Dashboard shell, sidebar, topbar. 5. Button, card, form, table, tabs, status. 6. Glass variants. 7. Motion registry. 8. Loading/error/empty states. 9. Responsive behavior. 10. Page-specific compositions berdasarkan PRD.

## 30.3 Larangan AI Agent

AI Agent dilarang: - mengganti font tanpa alasan dan persetujuan; - mengubah official logo; - mengarang path asset; - mengganti nama public menu; - mengubah route/Screen ID; - mengubah role/permission; - mengubah business flow; - membuat setiap halaman dengan layout yang tidak konsisten; - menggunakan glass pada seluruh komponen; - menambahkan warna baru secara acak; - membuat animasi berat tanpa fallback; - menampilkan dummy data seolah data organisasi asli; - menambahkan tombol yang tidak memiliki fungsi; - menghilangkan informasi penting pada mobile; - mengklaim visual sudah identik dengan moodboard sebelum diperiksa di browser.

## 30.4 Jika asset belum tersedia

1.  Periksa folder asset aktual.
2.  Cari nama file dan format.
3.  Cocokkan visualnya dengan kebutuhan.
4.  Catat asset yang hilang.
5.  Gunakan fallback yang sesuai.
6.  Jangan membuat path fiktif.
7.  Jangan mengganti logo dengan teks atau bentuk buatan.
8.  Jangan mengarang foto dokumentasi.

## 30.5 Jika ada konflik dokumen

- PRD menentukan kebutuhan, halaman, alur, role, permission, dan data.
- `design.md` menentukan visual.
- Keputusan pengguna terbaru yang eksplisit memperbarui bagian yang disebutkan.
- Perubahan visual tidak mengubah business rule.
- Jika konflik tidak dapat diselesaikan dari dokumen, tandai sebagai unresolved dan minta keputusan; jangan menebak.

------------------------------------------------------------------------

# 31. VISUAL QUALITY ASSURANCE CHECKLIST

## 31.1 Brand and identity

- [ ] Logo HIPMI memakai asset resmi.
- [ ] Wordmark Telkom University memakai asset resmi.
- [ ] Logo ARTHAKARSA memakai master asset.
- [ ] Tidak ada logo yang di-recolor/redraw/crop/stretch.
- [ ] Lima pecahan logo digunakan sesuai makna.
- [ ] Foto pengurus/kader sesuai sumber dan izin.

## 31.2 Typography

- [ ] Poppins tersedia dan termuat.
- [ ] ARTHAKARSA Serif Display tersedia dan termuat.
- [ ] Font fallback disiapkan.
- [ ] Heading tidak overflow.
- [ ] Body nyaman dibaca.
- [ ] Form/table tidak menggunakan serif display.
- [ ] Font tidak menyebabkan layout shift berlebihan.

## 31.3 Color and surface

- [ ] Official colors tidak berubah.
- [ ] Extension colors dicatat.
- [ ] Text contrast diuji.
- [ ] Gold tidak dipakai sebagai teks kecil di atas White.
- [ ] Semantic status memiliki label.
- [ ] Glass surface tetap readable.

## 31.4 Background and line art

- [ ] Contour lines tidak menutupi teks/foto.
- [ ] Ribbon tidak mengganggu scroll.
- [ ] Setiap section memilih pattern sesuai fungsi.
- [ ] Tidak semua section menggunakan bentuk yang sama.
- [ ] Mobile memiliki versi dekorasi yang lebih ringan.
- [ ] Ornamen tidak menyebabkan overflow horizontal.
- [ ] Dekorasi tidak dapat diklik dan tidak mengganggu screen reader.

## 31.5 Navbar and dropdown

- [ ] Public navbar mengikuti komposisi KPM-inspired.
- [ ] Identitas logo benar.
- [ ] Semua enam menu utama tersedia.
- [ ] Semua submenu mengikuti PRD.
- [ ] Active route benar.
- [ ] Sliding indicator bergerak halus.
- [ ] Dropdown dapat dibuka tanpa hover.
- [ ] Mobile drawer berfungsi.
- [ ] Escape/focus behavior benar.

## 31.6 Dashboard

- [ ] Sidebar sesuai role dari PRD.
- [ ] Topbar rapi.
- [ ] Workspace switcher sesuai scope.
- [ ] Statistik tidak terpotong.
- [ ] Activity dan agenda terbaca.
- [ ] Table solid, bukan glass.
- [ ] Layout mobile tidak rusak.

## 31.7 Components and motion

- [ ] Card variants konsisten.
- [ ] Button states lengkap.
- [ ] Tabs menggunakan sliding indicator.
- [ ] Dropdown dan modal memiliki exit state.
- [ ] Loading mempertahankan ukuran.
- [ ] Reduced motion tersedia.
- [ ] Tidak ada motion yang menghambat penggunaan.

## 31.8 Loading/error/responsive

- [ ] Loader menggunakan logo master ARTHAKARSA.
- [ ] Loader tidak membuat fake progress.
- [ ] 404/403/500 memiliki visual yang sesuai.
- [ ] Empty state per domain tersedia.
- [ ] Responsive 320 px ke atas diuji.
- [ ] Zoom 200% tidak merusak halaman.
- [ ] Tidak ada horizontal overflow.
- [ ] Tidak ada image broken.

------------------------------------------------------------------------

# 32. ACCEPTANCE CRITERIA — DESIGN BASELINE

Dokumen visual dianggap telah diterapkan dengan benar pada frontend apabila:

1.  Website menggunakan arah Aurora Glass Editorial yang konsisten.
2.  Warna primary `#5A1722` dan deep primary `#3D0F16` digunakan sebagai inti identitas.
3.  Poppins dan ARTHAKARSA Serif Display diterapkan sesuai peran.
4.  Background memiliki signature fine lines/contour/ribbon yang terkontrol.
5.  Section memiliki variasi bentuk yang terarah, bukan repetisi satu template.
6.  Public navbar menggunakan komposisi rounded floating capsule seperti referensi KPM tanpa menyalin identitas KPM.
7.  Navbar, dropdown, sidebar, dan tabs memiliki active/hover/focus state.
8.  Sliding tab indicator benar-benar bergerak horizontal.
9.  Glass digunakan selektif dengan fallback solid.
10. Card memiliki variasi yang tetap konsisten dalam satu card family.
11. Dashboard rapi, data-first, dan mudah dipindai.
12. Dropdown dapat menampilkan asset/illustration yang sesuai.
13. Loading screen memiliki logo di tengah dan motion yang halus.
14. Error/empty page memiliki artwork/asset yang sesuai atau fallback terarah.
15. Seluruh halaman tetap mengikuti route, data, role, permission, dan flow pada PRD.
16. Seluruh tampilan responsive dan tetap dapat digunakan dengan keyboard.
17. Tidak ada klaim lulus accessibility/performance sebelum pengujian aktual.

------------------------------------------------------------------------

# 33. OPEN ITEMS / PERLU VERIFIKASI

| Item                          | Status                                            | Tindakan                                         |
|:------------------------------|:--------------------------------------------------|:-------------------------------------------------|
| Logo ARTHAKARSA master        | Path disebut `public/assets/logo.png` pada sumber | Cocokkan file aktual                             |
| Logo HIPMI                    | File aktual perlu dicocokkan                      | Gunakan asset resmi                              |
| Wordmark Telkom University    | File aktual perlu dicocokkan                      | Gunakan asset resmi                              |
| Font Poppins                  | Perlu pemeriksaan asset/dependency                | Pastikan file/loading/lisensi                    |
| Font ARTHAKARSA Serif Display | Perlu pemeriksaan asset                           | Cari file font resmi; jangan mengganti diam-diam |
| Lima pecahan logo             | Perlu asset manifest                              | Cocokkan nama dan fungsi                         |
| `siluet.png`                  | Nama keputusan tersedia; path perlu diverifikasi  | Cocokkan file aktual                             |
| Ilustrasi dropdown            | Perlu asset manifest                              | Gunakan asset sesuai kategori                    |
| Ilustrasi 404/403/500         | Perlu asset manifest                              | Gunakan asset/fallback                           |
| Motion dependency             | Perlu cek package/lockfile                        | Gunakan satu engine                              |
| Glass fallback                | Perlu uji browser                                 | Sediakan solid fallback                          |
| Semantic colors               | Extension awal                                    | Contrast test                                    |
| Responsive                    | Belum diuji di build                              | QA seluruh breakpoint                            |
| Visual match                  | Belum diukur di browser                           | Review screenshot setelah implementasi           |

------------------------------------------------------------------------

# 34. CHANGELOG

## v1.0 — 17 November 2026

Arah visual Aurora Glass Editorial disusun berdasarkan moodboard yang disetujui pengguna.

Perubahan utama:

- Menggunakan Poppins + ARTHAKARSA Serif Display.
- Mempertahankan Burgundy `#5A1722` dan Dark Wine `#3D0F16`.
- Menetapkan Warm Ivory, Blush, Gold, Copper, Mauve, dan Cool Mist sebagai supporting palette.
- Menjadikan fine-line contour, flowing ribbon, arch/orbit, dan connected lines sebagai signature background.
- Menetapkan public navbar floating capsule terinspirasi KPM.
- Menetapkan dashboard glass editorial yang terstruktur.
- Menetapkan sliding horizontal tab indicator.
- Menetapkan card family dengan beberapa corner treatment.
- Menetapkan asset-supported mega dropdown.
- Menetapkan centered ARTHAKARSA branded loader.
- Menetapkan error/empty illustrations.
- Memperjelas responsive, accessibility, performance, asset manifest, dan AI Agent implementation rules.

**Catatan:** dokumen ini adalah spesifikasi visual. Implementasi, audit browser, pengujian font, accessibility, performance, dan kecocokan aset harus dilakukan pada tahap frontend.
