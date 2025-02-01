from flask import Blueprint, request, jsonify
from app.models.usuario import Usuario
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime

usuario_bp = Blueprint('usuarios', __name__)

# Registro de usuario
@usuario_bp.route('/registro', methods=['POST'])
def registro():
    data = request.get_json()

    if not all(key in data for key in ['nombre', 'email', 'password', 'rol', 'fecha_registro']):
        return jsonify({"msg": "Faltan datos necesarios"}), 400

    # Crear nuevo usuario
    usuario_data = {
        'nombre': data['nombre'],
        'email': data['email'],
        'password': data['password'],
        'rol': data['rol'],
        'estado_pago': data.get('estado_pago', 'No pagado'),
        'fecha_registro': data['fecha_registro'],
        'fecha_baja': data.get('fecha_baja', None),
        'fecha_ultimo_pago': data.get('fecha_ultimo_pago', None),
        'cuota_pagada': data.get('cuota_pagada', None)
    }

    # Verificar si el email ya existe
    if Usuario.get_by_email(usuario_data['email']):
        return jsonify({"msg": "El correo ya esta registrado"}), 400

    # Crear usuario en la base de datos
    Usuario.create(usuario_data)

    return jsonify({"msg": "Usuario registrado con exito"}), 201

# Iniciar sesion
@usuario_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Correo y contraseña son requeridos"}), 400

    usuario = Usuario.get_by_email(email)

    if usuario and Usuario.verify_password(usuario['password'], password):
        # Crear el token de acceso
        access_token = create_access_token(identity=usuario['id'])
        return jsonify({"msg": "Inicio de sesion exitoso", "access_token": access_token}), 200

    return jsonify({"msg": "Credenciales incorrectas"}), 401

# Obtener detalles del usuario (debe estar logueado)
@usuario_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    current_user_id = get_jwt_identity()
    usuario = Usuario.get_by_email(current_user_id)

    if not usuario:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify(usuario), 200
