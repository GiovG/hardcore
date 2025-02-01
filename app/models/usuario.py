import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
from app.config import Config

def get_db_connection():
    return mysql.connector.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DATABASE
    )

class Usuario:
    def __init__(self, nombre, email, password, rol, fecha_registro, estado_pago=None, fecha_baja=None, fecha_ultimo_pago=None, cuota_pagada=None):
        self.nombre = nombre
        self.email = email
        self.password = password
        self.rol = rol
        self.fecha_registro = fecha_registro
        self.estado_pago = estado_pago
        self.fecha_baja = fecha_baja
        self.fecha_ultimo_pago = fecha_ultimo_pago
        self.cuota_pagada = cuota_pagada

    @staticmethod
    def create(usuario_data):
        hashed_password = generate_password_hash(usuario_data['password'])
        conn = get_db_connection()
        cursor = conn.cursor()
        query = '''
            INSERT INTO usuarios (nombre, email, password, rol, estado_pago, fecha_registro, fecha_baja, fecha_ultimo_pago, cuota_pagada)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        cursor.execute(query, (
            usuario_data['nombre'],
            usuario_data['email'],
            hashed_password,
            usuario_data['rol'],
            usuario_data['estado_pago'],
            usuario_data['fecha_registro'],
            usuario_data['fecha_baja'],
            usuario_data['fecha_ultimo_pago'],
            usuario_data['cuota_pagada']
        ))
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def get_by_email(email):
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM usuarios WHERE email = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        return user

    @staticmethod
    def verify_password(stored_password, provided_password):
        return check_password_hash(stored_password, provided_password)
