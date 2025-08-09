# Portfolio Project - Fruatre Maou

Portfolio website yang telah diperbaiki dan disederhanakan.

## Perubahan yang Dilakukan

### 1. Struktur Aplikasi Disederhanakan
- **Menghapus duplikasi**: File `main.py` dan `app.py` yang duplikat telah dihapus
- **Satu entry point**: Sekarang hanya menggunakan `app.py` sebagai file utama
- **Konsistensi**: Semua komponen menggunakan sumber data yang sama

### 2. File yang Dihapus
- `main.py` (duplikat dari app.py)
- `venv/` directory (virtual environment tidak perlu di-commit)

### 3. Perbaikan Konfigurasi
- Template folder diatur ke `dist/` untuk konsistensi
- Static folder diatur ke root directory
- CORS diaktifkan untuk semua routes
- Port diubah ke 5000 (standar Flask)

### 4. Struktur File Akhir
```
portfolio_project/
├── app.py                 # Main Flask application
├── requirements.txt       # Dependencies
├── index.html            # Backup HTML file
├── dist/
│   ├── index.html        # Main template
│   ├── main.js           # JavaScript functionality
│   └── styles.css        # Styling
├── static/               # Static assets
└── templates/            # Additional templates
```

## Cara Menjalankan

1. Buat virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Jalankan aplikasi:
```bash
python app.py
```

4. Akses di browser: `http://localhost:5000`

## API Endpoints

- `GET /` - Halaman utama portfolio
- `GET /api/projects` - Data projects dalam format JSON
- `GET /static/<filename>` - Static files
- `GET /dist/<filename>` - Dist files

## Fitur

- Responsive design
- Dynamic project loading via API
- Interactive navigation
- Real-time clock
- Dynamic greeting
- Smooth scrolling effects
- Mobile-friendly menu

## Teknologi

- **Backend**: Flask, Flask-CORS
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS dengan animasi
- **Icons**: Font Awesome, Bootstrap Icons

# portofolio
