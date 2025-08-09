from flask import Flask, jsonify, render_template, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, template_folder='dist', static_folder='dist')
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    """Serve the main page (index.html)."""
    return render_template('index.html')

@app.route('/static/<path:filename>')
def static_files(filename):
    """Serve static files."""
    return send_from_directory('static', filename)

@app.route('/dist/<path:filename>')
def dist_files(filename):
    """Serve dist files."""
    return send_from_directory('dist', filename)

@app.route('/api/projects')
def get_projects():
    """Provide project list in JSON format."""
    projects = [
        {
            "name": "API Server",
            "url": "https://api.fruatrecard.my.id",
            "icon": "fa-server",
            "description": "RESTful API server dengan multiple endpoints untuk berbagai kebutuhan",
            "tags": ["Node.js", "Express", "API"]
        },
        {
            "name": "Weather App",
            "url": "https://weather.fruatrecard.my.id",
            "icon": "fa-cloud-sun",
            "description": "Aplikasi cuaca real-time dengan forecast dan data lengkap",
            "tags": ["JavaScript", "API", "CSS"]
        },
        {
            "name": "YT Downloader",
            "url": "https://ytdownloader.fruatrecard.my.id",
            "icon": "fa-download",
            "description": "Tool download video YouTube dengan berbagai format dan kualitas",
            "tags": ["Python", "Web App", "Tool"]
        },
        {
            "name": "CDN Service",
            "url": "https://cdn-up.fruatrecard.my.id/",
            "icon": "fa-database",
            "description": "Content delivery network untuk hosting file dan media",
            "tags": ["CDN", "Storage", "Service"]
        },
        {
            "name": "WhatsApp Bot",
            "url": "#",
            "icon": "fa-robot",
            "description": "Bot WhatsApp cerdas dengan fitur AI dan automasi",
            "tags": ["Node.js", "WhatsApp", "Bot"]
        }
    ]
    return jsonify(projects)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


