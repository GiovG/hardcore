from flask import Flask
from flask_cors import CORS
from app.config import Config
# import sys
# sys.path.append('C:/Users/Beto/Desktop/BackEnd--Proyecto-Final---Programacion-4-main/Gimnasio/app')

# Ahora Python puede encontrar 'app.models.usuario'
# from app.models.usuario import Usuario


app = Flask(__name__)
app.config.from_object(Config)

from app.controllers.usuario_controller import usuario_bp
from app.controllers.actividad_controller import actividad_bp
from app.controllers.inscripcion_controller import inscripcion_bp
from app.controllers.empleado_controller import empleado_bp
from app.controllers.pago_controller import pago_bp

app.register_blueprint(usuario_bp, url_prefix='/usuarios')
app.register_blueprint(actividad_bp, url_prefix='/actividades')
app.register_blueprint(inscripcion_bp, url_prefix='/inscripciones')
app.register_blueprint(empleado_bp, url_prefix='/empleados')
app.register_blueprint(pago_bp, url_prefix='/pagos')

CORS(app)

if __name__ == "__main__":
    app.run(debug=True)
