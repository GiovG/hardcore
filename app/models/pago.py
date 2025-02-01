import mysql.connector
from app.config import Config

def get_db_connection():
    return mysql.connector.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DATABASE
    )

class Pago:
    def __init__(self, usuario_id, monto, fecha_pago):
        self.usuario_id = usuario_id
        self.monto = monto
        self.fecha_pago = fecha_pago

    @staticmethod
    def create(pago_data):
        conn = get_db_connection()
        cursor = conn.cursor()
        query = '''
            INSERT INTO pagos (usuario_id, monto, fecha_pago)
            VALUES (%s, %s, %s)
        '''
        cursor.execute(query, (
            pago_data['usuario_id'],
            pago_data['monto'],
            pago_data['fecha_pago']
        ))
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def get_by_usuario(usuario_id):
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM pagos WHERE usuario_id = %s"
        cursor.execute(query, (usuario_id,))
        pagos = cursor.fetchall()
        cursor.close()
        conn.close()
        return pagos
