import mysql.connector
from app.config import Config

def get_db_connection():
    return mysql.connector.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DATABASE
    )

class Inscripcion:
    def __init__(self, usuario_id, actividad_id, fecha_inscripcion, sesiones_restantes):
        self.usuario_id = usuario_id
        self.actividad_id = actividad_id
        self.fecha_inscripcion = fecha_inscripcion
        self.sesiones_restantes = sesiones_restantes

    @staticmethod
    def create(inscripcion_data):
        conn = get_db_connection()
        cursor = conn.cursor()
        query = '''
            INSERT INTO inscripciones (usuario_id, actividad_id, fecha_inscripcion, sesiones_restantes)
            VALUES (%s, %s, %s, %s)
        '''
        cursor.execute(query, (
            inscripcion_data['usuario_id'],
            inscripcion_data['actividad_id'],
            inscripcion_data['fecha_inscripcion'],
            inscripcion_data['sesiones_restantes']
        ))
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def get_by_usuario(usuario_id):
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM inscripciones WHERE usuario_id = %s"
        cursor.execute(query, (usuario_id,))
        inscripciones = cursor.fetchall()
        cursor.close()
        conn.close()
        return inscripciones
