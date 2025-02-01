from flask import Blueprint, request, jsonify
from app.models.pago import Pago
from datetime import datetime

pago_bp = Blueprint('pagos', __name__)

# Registrar un pago
@pago_bp.route('/', methods=['POST'])
def registrar_pago():
    data = request.get_json()

    if not all(key in data for key in ['usuario_id', 'monto']):
        return jsonify({"msg": "Faltan datos necesarios"}), 400

    # Crear el pago
    pago_data = {
        'usuario_id': data['usuario_id'],
        'monto': data['monto'],
        'fecha_pago': datetime.now().strftime('%Y-%m-%d')
    }

    Pago.create(pago_data)

    return jsonify({"msg": "Pago registrado con exito"}), 201

# Obtener los pagos de un usuario
@pago_bp.route('/<int:usuario_id>', methods=['GET'])
def get_pagos(usuario_id):
    pagos = Pago.get_by_usuario(usuario_id)
    return jsonify(pagos), 200
