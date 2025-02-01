import mysql.connector
from app.config import Config

def get_db_connection():
    return mysql.connector.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DATABASE
    )

class Empleado:
    def __init__(self, usuario_id, fecha_inicio, puesto):
        self.usuario_id = usuario_id
        self.fecha_inicio = fecha_inicio
        self.puesto = puesto

    @staticmethod
    def create(empleado_data):
        conn = get_db_connection()
        cursor = conn.cursor()
        query = '''
            INSERT INTO empleados (usuario_id, fecha_inicio, puesto)
            VALUES (%s, %s, %s)
        '''
        cursor.execute(query, (
            empleado_data['usuario_id'],
            empleado_data['fecha_inicio'],
            empleado_data['puesto']
        ))
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def get_by_usuario(usuario_id):
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM empleados WHERE usuario_id = %s"
        cursor.execute(query, (usuario_id,))
        empleado = cursor.fetchone()
        cursor.close()
        conn.close()
        return empleado
