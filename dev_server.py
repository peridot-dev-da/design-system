import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler


class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")  # Allows all origins
        self.send_header(
            "Access-Control-Allow-Methods", "GET, POST, OPTIONS"
        )  # Specify allowed methods
        self.send_header(
            "Access-Control-Allow-Headers", "Content-Type"
        )  # Specify allowed headers
        super().end_headers()


if __name__ == "__main__":
    PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    Handler = CORSRequestHandler
    with HTTPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()
