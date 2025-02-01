import mysql.connector
from app.config import Config

def get_db_connection():
    return mysql.connector.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DATABASE
    )

class Actividad:
    def __init__(self, nombre, dias_habilitados, horario, sesiones_por_mes, max_participantes, participantes_actuales, estado, precio):
        self.nombre = nombre
        self.dias_habilitados = dias_habilitados
        self.horario = horario
        self.sesiones_por_mes = sesiones_por_mes
        self.max_participantes = max_participantes
        self.participantes_actuales = participantes_actuales
        self.estado = estado
        self.precio = precio

    @staticmethod
    def get_all_actividades():
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM actividades WHERE estado = 'Activo'"
        cursor.execute(query)
        actividades = cursor.fetchall()
        cursor.close()
        conn.close()
        return actividades
