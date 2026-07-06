# inventory_system_UAS_WebPro2_23552011205

# Inventory System

## Deskripsi

Inventory System adalah aplikasi berbasis web yang digunakan untuk mengelola data inventaris barang. Aplikasi ini memiliki fitur autentikasi pengguna, manajemen data barang, pembuatan QR Code untuk setiap barang, pemindaian QR Code, serta sistem peminjaman barang.

Project ini dikembangkan menggunakan arsitektur **Frontend (React + Vite)** dan **Backend (Express.js + PostgreSQL)** dengan autentikasi menggunakan **JSON Web Token (JWT)**.

---

## Fitur

### Authentication

* Login
* Register
* JWT Authentication
* Protected Route

### Dashboard

* Menampilkan seluruh data inventaris
* Statistik jumlah barang
* Pencarian barang
* Tambah barang
* Edit barang
* Hapus barang

### Inventory

* Kode Barang
* Nama Barang
* Kategori
* Kondisi
* Lokasi
* Jumlah Barang
* Status Barang

### QR Code

* Generate QR Code otomatis saat barang ditambahkan
* Scan QR Code menggunakan kamera
* Menampilkan detail barang dari hasil scan

### Borrowing

* Peminjaman barang
* Perubahan status barang menjadi **Borrowed**
* Penyimpanan riwayat peminjaman

---

# Teknologi yang Digunakan

## Frontend

* React
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* html5-qrcode

## Backend

* Node.js
* Express.js
* PostgreSQL
* JWT
* bcrypt
* QRCode

---

# Struktur Project

```text
inventory-system
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── server.js
│   │   └── ...
│   │
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── ...
│   │
│   └── package.json
│
└── README.md
```

---

# Database

## users

| Field      | Type      |
| ---------- | --------- |
| id         | SERIAL    |
| name       | VARCHAR   |
| email      | VARCHAR   |
| password   | VARCHAR   |
| role       | VARCHAR   |
| created_at | TIMESTAMP |

---

## items

| Field      | Type      |
| ---------- | --------- |
| id         | SERIAL    |
| code       | VARCHAR   |
| name       | VARCHAR   |
| category   | VARCHAR   |
| condition  | VARCHAR   |
| location   | VARCHAR   |
| quantity   | INTEGER   |
| status     | VARCHAR   |
| qr_code    | TEXT      |
| created_at | TIMESTAMP |

---

## borrowings

| Field       | Type      |
| ----------- | --------- |
| id          | SERIAL    |
| user_id     | INTEGER   |
| item_id     | INTEGER   |
| borrow_date | TIMESTAMP |
| return_date | TIMESTAMP |
| status      | VARCHAR   |

---

# Cara Menjalankan Project

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend

Masuk ke folder backend

```bash
cd backend
```

Install dependency

```bash
npm install
```

Buat file `.env`

```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=inventory_system
JWT_SECRET=your_secret_key
```

Jalankan backend

```bash
npm run dev
```

Backend berjalan di

```
http://localhost:5000
```

---

## Frontend

Masuk ke folder frontend

```bash
cd frontend
```

Install dependency

```bash
npm install
```

Jalankan frontend

```bash
npm run dev
```

Frontend berjalan di

```
http://localhost:5173
```

---

# API Endpoint

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| GET    | /api/profile       |

---

## Inventory

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/items     |
| GET    | /api/items/:id |
| POST   | /api/items     |
| PUT    | /api/items/:id |
| DELETE | /api/items/:id |

---

## Borrowing

| Method | Endpoint        |
| ------ | --------------- |
| POST   | /api/borrowings |

---

# Alur Sistem

1. User melakukan login.
2. JWT Token disimpan pada Local Storage.
3. User masuk ke Dashboard.
4. User dapat menambah, mengubah, menghapus, dan melihat data barang.
5. Setiap barang akan memiliki QR Code secara otomatis.
6. QR Code dapat dipindai untuk melihat detail barang.
7. Barang dapat dipinjam melalui fitur Borrow Item.
8. Status barang berubah menjadi **Borrowed** dan riwayat peminjaman disimpan pada database.

---

# Pengembang

**Nama:** Ichsan Pratama Putra

Universitas Teknologi Bandung

Mata Kuliah: Web Programming 2

---

# Lisensi

Project ini dibuat untuk tugas akhir mata kuliah Web Programming 2.
