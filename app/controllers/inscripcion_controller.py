from flask import Blueprint, request, jsonify
from app.models.inscripcion import Inscripcion
from datetime import datetime

inscripcion_bp = Blueprint('inscripciones', __name__)

# Inscribir a un socio en una actividad
@inscripcion_bp.route('/', methods=['POST'])
def inscribir():
    data = request.get_json()

    if not all(key in data for key in ['usuario_id', 'actividad_id', 'sesiones_restantes']):
        return jsonify({"msg": "Faltan datos necesarios"}), 400

    # Crear inscripcion
    inscripcion_data = {
        'usuario_id': data['usuario_id'],
        'actividad_id': data['actividad_id'],
        'fecha_inscripcion': datetime.now().strftime('%Y-%m-%d'),
        'sesiones_restantes': data['sesiones_restantes']
    }

    Inscripcion.create(inscripcion_data)

    return jsonify({"msg": "Inscripcion realizada con exito"}), 201

# Obtener inscripciones de un usuario
@inscripcion_bp.route('/<int:usuario_id>', methods=['GET'])
def get_inscripciones(usuario_id):
    inscripciones = Inscripcion.get_by_usuario(usuario_id)
    return jsonify(inscripciones), 200
