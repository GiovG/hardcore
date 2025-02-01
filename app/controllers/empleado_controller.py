from flask import Blueprint, request, jsonify
from app.models.empleado import Empleado

empleado_bp = Blueprint('empleados', __name__)

# Crear un nuevo empleado
@empleado_bp.route('/', methods=['POST'])
def create_empleado():
    data = request.get_json()

    if not all(key in data for key in ['usuario_id', 'fecha_inicio', 'puesto']):
        return jsonify({"msg": "Faltan datos necesarios"}), 400

    # Crear nuevo empleado
    empleado_data = {
        'usuario_id': data['usuario_id'],
        'fecha_inicio': data['fecha_inicio'],
        'puesto': data['puesto']
    }

    Empleado.create(empleado_data)

    return jsonify({"msg": "Empleado registrado con exito"}), 201

# Obtener datos de un empleado por usuario_id
@empleado_bp.route('/<int:usuario_id>', methods=['GET'])
def get_empleado(usuario_id):
    empleado = Empleado.get_by_usuario(usuario_id)
    if not empleado:
        return jsonify({"msg": "Empleado no encontrado"}), 404
    return jsonify(empleado), 200
