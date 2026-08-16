import os
import re
from flask import Flask, jsonify
from flask_cors import CORS
from app.config import Config
from app.database import db
from app.routes.auth import auth_bp
from app.routes.resume import resume_bp
from app.routes.jobs import jobs_bp
from app.routes.admin import admin_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Dynamic CORS origin support (Localhost, Vercel deployments, Render)
    frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:5173')
    allowed_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        frontend_url,
        re.compile(r"^https://.*\.vercel\.app$")
    ]

    CORS(
        app,
        resources={r"/api/*": {"origins": allowed_origins}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )

    # Initialize extensions
    db.init_app(app)

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(resume_bp)
    app.register_blueprint(jobs_bp)
    app.register_blueprint(admin_bp)

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            "status": "healthy",
            "service": "ResumeIQ Backend API",
            "version": "1.0.0",
            "database_mode": "MongoDB" if db.is_mongo else "Local Document Store"
        }), 200

    @app.errorhandler(413)
    def file_too_large(e):
        return jsonify({"error": "File size exceeds the 5MB maximum limit."}), 413

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "API route not found."}), 404

    @app.errorhandler(500)
    def internal_error(e):
        return jsonify({"error": "An internal server error occurred."}), 500

    return app
