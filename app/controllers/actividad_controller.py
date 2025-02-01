from flask import Blueprint, request, jsonify
from app.models.actividad import Actividad

actividad_bp = Blueprint('actividades', __name__)

# Obtener todas las actividades activas
@actividad_bp.route('/', methods=['GET'])
def get_actividades():
    actividades = Actividad.get_all_actividades()
    return jsonify(actividades), 200
