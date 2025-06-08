import os
from flask import Flask
from flasgger import Swagger
from flask_cors import CORS

from app.models import User, Teacher, Topic, Task, CompletedTask 
from extensions import db, migrate, swagger
from config import config as default_config_instance
from app.blueprints import auth_bp


def create_app(config_object=default_config_instance) -> Flask:
    app = Flask(__name__)

    # Enable CORS for all domains on all routes
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Load configuration
    app.config.from_object(config_object)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    app.register_blueprint(auth_bp)

    # Flasgger configuration
    swagger_config = {
        "headers": [],
        "specs": [
            {
                "endpoint": "apispec",
                "route": "/apispec.json",
                "rule_filter": lambda rule: True,
                "model_filter": lambda tag: True,
            }
        ],
        "static_url_path": "/flasgger_static",
        "swagger_ui": True,
        "swagger_ui_url": "/docs",
        "specs_route": "/docs/"
    }
    # Apply swagger config via app.config, then init
    app.config['SWAGGER'] = swagger_config
    swagger.init_app(app)

    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "User": User,
            "Teacher": Teacher,
            "Topic": Topic,
            "Task": Task,
            "CompletedTask": CompletedTask
        }

    return app