from flask import Flask, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__, template_folder='.', static_folder='dist')
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    """Menyajikan halaman utama (index.html)."""
    return render_template('index.html')

@app.route('/api/projects')
def get_projects():
    """Menyediakan daftar proyek dalam format JSON."""
    projects = [
        {
            "name": "API",
            "url": "https://api.fruatrecard.my.id",
            "icon": "bi-hdd-stack"
        },
        {
            "name": "Weather App",
            "url": "https://weather.fruatrecard.my.id",
            "icon": "bi-cloud-sun"
        },
        {
            "name": "YT Downloader",
            "url": "https://ytdownloader.fruatrecard.my.id",
            "icon": "bi-youtube"
        },
        {
            "name": "Old Portfolio",
            "url": "https://fruatre.42web.io",
            "icon": "bi-briefcase"
        },
        {
            "name": "CDN",
            "url": "https://cdn-up.fruatrecard.my.id/",
            "icon": "bi-server"
        }
    ]
    return jsonify(projects)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


