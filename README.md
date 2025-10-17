
# 📝 TO-DO LIST API ASSIGNMENT

Sebuah RESTful API sederhana untuk mengelola daftar tugas (To-Do List), dibangun menggunakan **Node.js, Express.js, dan MongoDB**. API ini dilengkapi dengan sistem **Authentication (JWT)** dan **Authorization** untuk memastikan setiap pengguna hanya dapat mengelola tugasnya sendiri.

## ✨ Fitur Utama

  * **Autentikasi Aman:** Menggunakan JSON Web Tokens (JWT) untuk *login* dan otentikasi sesi.
  * **Otorisasi Berbasis Kepemilikan:** Setiap Todo yang dibuat secara otomatis terikat pada `owner` (pemilik) sehingga pengguna lain tidak dapat mengakses, mengubah, atau menghapusnya.
  * **CRUD Penuh:** Fungsionalitas lengkap untuk membuat, membaca, memperbarui, dan menghapus tugas.

## 🚀 Instalasi dan Menjalankan Proyek

### Prasyarat

  * Node.js (LTS Version)
  * MongoDB
  * Postman atau *tool* serupa untuk menguji API

### Langkah-Langkah

1.  **Clone Repositori:**

    ```bash
    git clone [LINK_REPOSITORY_ANDA]
    cd [NAMA_FOLDER_PROJECT]
    ```

2.  **Instal Dependensi:**

    ```bash
    npm install
    ```

3.  **Konfigurasi Variabel Lingkungan (`.env`):**
    Buat file `.env` di *root* proyek dan isi dengan konfigurasi berikut. Pastikan `JWT_SECRET` **sama** dengan yang digunakan di *controller* Anda.

    ```dotenv
    PORT=5001
    MONGO_URI=mongodb://localhost:27017/todo-db
    JWT_SECRET=your_jwt_secret_yang_panjang_dan_aman
    ```

4.  **Jalankan Server:**

    ```bash
    npm start
    # atau nodemon index.js (jika Anda menggunakannya)
    ```

Server akan berjalan di `http://localhost:5001`.

## 🔑 Endpoint API

Semua *endpoint* yang berada di bawah `/todos` memerlukan *header* **`Authorization: Bearer <TOKEN>`**.

### Authentication (Auth Routes)

| Metode | URL | Deskripsi | Status Code |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Membuat akun pengguna baru. | `201 Created` |
| `POST` | `/auth/login` | *Login* dan mendapatkan **JWT Token**. | `200 OK` |

### To-Do List (Protected Routes)

| Metode | URL | Deskripsi | Middleware |
| :--- | :--- | :--- | :--- |
| `GET` | `/todos` | **Melihat semua** Todo **milik sendiri** | `verifyToken` |
| `POST` | `/todos` | **Membuat** Todo baru (otomatis terikat pada `ownerId` dari token) | `verifyToken` |
| `GET` | `/todos/:_id` | **Melihat detail** Todo berdasarkan ID | `verifyToken` |
| `PUT` | `/todos/:_id` | **Memperbarui** Todo berdasarkan ID (hanya jika Anda pemiliknya) | `verifyToken` |
| `DELETE` | `/todos/:_id` | **Menghapus** Todo berdasarkan ID (hanya jika Anda pemiliknya) | `verifyToken` |
| `DELETE` | `/todos` | Menghapus **semua** Todo **milik sendiri** | `verifyToken` |

## 💡 Panduan Pengujian (Postman)

Untuk menguji *endpoint* Todo, ikuti langkah-langkah ini:

1.  **Register:** Buat akun baru via `POST /auth/register`.
2.  **Login:** Lakukan `POST /auth/login` dan **salin** seluruh *string* token dari respons.
3.  **Otorisasi:**
      * Buka *request* `/todos` (misalnya `POST /todos`).
      * Buka *tab* **Authorization**.
      * Pilih **Type: `Bearer Token`**.
      * **Paste** token yang sudah disalin ke *field* **Token**.
4.  **Gunakan API:** Sekarang Anda dapat mengakses semua *endpoint* `/todos` untuk *user* tersebut.

## 🤝 Kontributor

  * Andin - Implementasi dan Pengecekan Keamanan.
