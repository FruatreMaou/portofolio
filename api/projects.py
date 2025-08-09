import json
from http.server import BaseHTTPRequestHandler
from main import get_projects  # fungsi ini harus ada di main.py kamu

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Ambil data dari fungsi main.py
            projects_data = get_projects()

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(projects_data).encode("utf-8"))

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
