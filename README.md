# 🗣️ NgobrolDB - Antarmuka PostgreSQL dengan Bahasa Natural

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

NgobrolDB adalah aplikasi web modern yang memungkinkan Anda berinteraksi dengan database PostgreSQL menggunakan bahasa sehari-hari. Cukup mengobrol dengan database Anda menggunakan bahasa yang natural, dan NgobrolDB akan menerjemahkan permintaan Anda menjadi query SQL!

## ✨ Fitur Utama

- 🤖 Konversi bahasa natural ke SQL
- 💾 Integrasi dengan database PostgreSQL
- 🎨 Tampilan modern dengan Tailwind CSS dan komponen shadcn
- 🔄 Eksekusi query secara real-time
- 🌐 Dibangun dengan Next.js untuk performa optimal
- 🛠️ Didukung oleh Drizzle ORM untuk operasi database yang type-safe

## 🚀 Memulai

### Prasyarat

- [Bun](https://bun.sh)
- Docker dan Docker Compose
- Database PostgreSQL

### Instalasi

1. Clone repository:

```bash
git clone https://github.com/yourusername/ngobroldb.git
cd ngobroldb
```

2. Install dependensi:

```bash
bun install
```

3. Jalankan database PostgreSQL:

```bash
docker-compose up -d
```

4. Siapkan environment variables:

```bash
cp .env.example .env
# Edit file .env dengan kredensial database dan API key Anda
```

5. Jalankan migrasi database:

```bash
bun run db:push
```

6. Jalankan server development:

```bash
bun run dev
```

Kunjungi `http://localhost:3000` untuk mulai menggunakan NgobrolDB!

## 🛠️ Teknologi yang Digunakan

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL, Drizzle ORM
- **Development**: Docker, ESLint, TypeScript
