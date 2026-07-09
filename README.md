# Lab Inventory System - UAS Web Programming 2

## Deskripsi Aplikasi

**Inventory System** adalah aplikasi berbasis web yang digunakan untuk mengelola data inventaris barang laboratorium atau instansi. Aplikasi ini dibangun menggunakan **React.js** sebagai frontend, **Node.js + Express.js** sebagai backend, serta **PostgreSQL** sebagai database.

Aplikasi menyediakan fitur autentikasi menggunakan **JSON Web Token (JWT)** sehingga hanya pengguna yang telah login yang dapat mengakses sistem.

### Fitur Aplikasi

- Login menggunakan JWT Authentication
- Dashboard Inventaris
- Menambah data barang
- Mengubah data barang
- Menghapus data barang
- Mencari data barang
- Melihat detail barang
- Generate QR Code untuk setiap barang
- Scan QR Code
- Peminjaman (Borrow Item)
- Penyimpanan data menggunakan PostgreSQL

---

# Teknologi yang Digunakan

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- html5-qrcode

### Backend

- Node.js
- Express.js
- JSON Web Token (JWT)
- bcrypt
- PostgreSQL

### Database

- PostgreSQL

---

# Cara Menjalankan Aplikasi

## 1. Clone Repository

```bash
git clone https://github.com/Ichsanpratamap/inventory_system_UAS_WebPro2_23552011205.git
```

Masuk ke folder project

```bash
cd inventory_system_UAS_WebPro2_23552011205
```

---

# Menjalankan Backend

Masuk ke folder backend

```bash
cd backend
```

Install dependency

```bash
npm install
```

Pastikan PostgreSQL sudah berjalan dan file **.env** telah dikonfigurasi.

Contoh konfigurasi:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=inventory_db

JWT_SECRET=your_secret_key
```

Jalankan backend

```bash
npm run dev
```

Apabila berhasil akan muncul

```text
Server running on port 5000
Connected to PostgreSQL
```

---

# Menjalankan Frontend

Buka terminal baru kemudian masuk ke folder frontend

```bash
cd frontend
```

Install dependency

```bash
npm install
```

Jalankan aplikasi React

```bash
npm run dev
```

Apabila berhasil akan muncul

```text
Local: http://localhost:5173
```

Buka browser kemudian akses

```
http://localhost:5173
```

---

# Alur Penggunaan Aplikasi

1. Login menggunakan akun yang telah terdaftar.
2. Setelah berhasil login akan masuk ke Dashboard.
3. Tambahkan data inventaris baru menggunakan form Add Item.
4. Data barang akan tampil pada Dashboard.
5. Gunakan fitur:
   - Detail
   - Update
   - Delete
6. Scan QR Code untuk membuka halaman detail barang.
7. Lakukan proses Borrow Item apabila barang dipinjam.
8. Status barang akan berubah menjadi **Borrowed**.

---
## Tampilan Aplikasi

### Login
<img width="959" height="476" alt="image" src="https://github.com/user-attachments/assets/db7810a2-88bd-4f07-a5b3-ba08843d48db" />

### Dashboard

<img width="958" height="439" alt="image" src="https://github.com/user-attachments/assets/8e9f7ee1-0302-47a8-91f5-277d959c1878" />

<img width="959" height="440" alt="image" src="https://github.com/user-attachments/assets/a86a4b6c-3658-47af-818d-75a463e8b496" />


### Detail Barang

<img width="198" height="389" alt="image" src="https://github.com/user-attachments/assets/9fbb0da1-e0ca-4c7b-8cdd-c81179185130" />
<img width="221" height="407" alt="image" src="https://github.com/user-attachments/assets/c3651d07-ba00-4fe4-bba1-db9b31986eb1" />



### Scan QR Code

<img width="452" height="478" alt="image" src="https://github.com/user-attachments/assets/f302cd60-f92a-4c00-8650-a244f986d9e0" />

# Author

**Nama :** Ichsan Pratama Putra

**NPM :** 23552011205

**Mata Kuliah :** Web Programming 2

**Universitas Teknologi Bandung**
