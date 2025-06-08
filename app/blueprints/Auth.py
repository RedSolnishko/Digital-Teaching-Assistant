# app/blueprints/auth.py
import datetime
import jwt
from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import check_password_hash, generate_password_hash
from flasgger import swag_from

from app.models import User
from extensions import db

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

@auth_bp.route('/login', methods=['POST'])
@swag_from({
    "tags": ["Auth"],
    "parameters": [
        {
            "in": "body",
            "name": "body",
            "required": True,
            "schema": {
                "type": "object",
                "properties": {
                    "email":   {"type": "string"},
                    "password":{"type": "string"}
                },
                "required": ["email", "password"]
            }
        }
    ],
    "responses": {
        "200": {
            "description": "Успешная аутентификация",
            "schema": {
                "type": "object",
                "properties": {
                    "token":   {"type": "string"},
                    "role":    {"type": "string"},
                    "user_id": {"type": "integer"}
                }
            }
        },
        "400": {"description": "Неверные email или пароль"},
        "500": {"description": "Ошибка сервера"}
    }
})
def login():
    data = request.get_json(force=True, silent=True)
    if not data or not data.get('email') or not data.get('password'):
        return jsonify(message="Неверные email или пароль"), 400

    user = User.query.filter_by(email=data['email']).first()
    if user is None or not check_password_hash(user.password_hash, data['password']):
        return jsonify(message="Неверные email или пароль"), 400

    try:
        payload = {
            'user_id': user.id,
            'role':    user.role,
            'exp':     datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }
        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
        if isinstance(token, bytes):
            token = token.decode('utf-8')
        return jsonify(token=token, role=user.role, user_id=user.id), 200
    except Exception as e:
        current_app.logger.error(f"Login error: {e}")
        return jsonify(message="Ошибка сервера"), 500

@auth_bp.route('/add_user', methods=['POST'])
@swag_from({
    "tags": ["Users"],
    "security": [{"Bearer": []}],
    "parameters": [
        {
            "in": "body",
            "name": "body",
            "required": True,
            "schema": {
                "type": "object",
                "properties": {
                    "email":       {"type": "string"},
                    "password":    {"type": "string"},
                    "role":        {"type": "string", "enum": ["admin", "user"]},
                    "name":        {"type": "string"},
                    "last_name":   {"type": "string"},
                    "first_name":  {"type": "string"},
                    "middle_name": {"type": "string"},
                    "photo":       {"type": "string"}
                },
                "required": ["email", "password", "role", "name"]
            }
        }
    ],
    "responses": {
        "201": {
            "description": "Пользователь создан",
            "schema": {
                "type": "object",
                "properties": {
                    "id":    {"type": "integer"},
                    "email": {"type": "string"},
                    "role":  {"type": "string"}
                }
            }
        },
        "400": {"description": "Неверные данные"},
        "401": {"description": "Требуется авторизация"},
        "403": {"description": "Доступ запрещён"},
        "500": {"description": "Ошибка сервера"}
    }
})
def add_user():
    # Temporarily disable token validation & role check for testing:
    # auth_header = request.headers.get("Authorization", "")
    # if not auth_header.startswith("Bearer "):
    #     return jsonify(message="Требуется авторизация"), 401
    # token = auth_header.split(" ", 1)[1]
    # try:
    #     payload = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
    # except jwt.ExpiredSignatureError:
    #     return jsonify(message="Требуется авторизация"), 401
    # except jwt.InvalidTokenError:
    #     return jsonify(message="Требуется авторизация"), 401
    #
    # if payload.get("role") != "admin":
    #     return jsonify(message="Доступ запрещён"), 403

    data = request.get_json(force=True, silent=True) or {}
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")
    name = data.get("name")
    if not all([email, password, role, name]):
        return jsonify(message="Неверные данные"), 400

    if User.query.filter_by(email=email).first():
        return jsonify(message="Пользователь с таким email уже существует"), 400

    try:
        user = User(
            email=email,
            password_hash=generate_password_hash(password),
            role=role,
            name=name,
            last_name=data.get("last_name"),
            first_name=data.get("first_name"),
            middle_name=data.get("middle_name"),
            photo=data.get("photo")
        )
        db.session.add(user)
        db.session.commit()
        return jsonify(id=user.id, email=user.email, role=user.role), 201
    except Exception as e:
        current_app.logger.error(f"Add user error: {e}")
        db.session.rollback()
        return jsonify(message="Ошибка сервера"), 500