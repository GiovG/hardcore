-- Crea la base de datos
CREATE DATABASE IF NOT EXISTS gimnasio;
USE gimnasio;

-- Crea la tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,          
    nombre VARCHAR(100) NOT NULL,         
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL,
    rol ENUM('Socio', 'Empleado', 'Administrador') NOT NULL DEFAULT 'Socio',
    estado_pago ENUM('Pagado', 'No pagado') DEFAULT 'No pagado',
    fecha_registro DATE NOT NULL,    
    fecha_baja DATE,                           
    fecha_ultimo_pago DATE,  
    cuota_pagada DECIMAL(10, 2) 
);

-- Crea la tabla de actividades
CREATE TABLE IF NOT EXISTS actividades (
    id INT AUTO_INCREMENT PRIMARY KEY,     
    nombre VARCHAR(100) NOT NULL,              
    dias_habilitados VARCHAR(100) NOT NULL, 
    horario TIME NOT NULL,                      
    sesiones_por_mes INT NOT NULL,               
    max_participantes INT NOT NULL,             
    participantes_actuales INT DEFAULT 0,      
    estado ENUM('Activo', 'Deshabilitado') DEFAULT 'Activo', 
    precio DECIMAL(10, 2) NOT NULL            
);

-- Tabla intermedia para registrar la inscripcion de los socios a actividades
CREATE TABLE IF NOT EXISTS inscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,     
    usuario_id INT,                          
    actividad_id INT,                    
    fecha_inscripcion DATE NOT NULL,       
    sesiones_restantes INT NOT NULL,           
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (actividad_id) REFERENCES actividades(id) ON DELETE CASCADE
);

-- Tabla de empleados
CREATE TABLE IF NOT EXISTS empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,                             
    fecha_inicio DATE NOT NULL,                 
    puesto VARCHAR(100) NOT NULL,          
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Crea la tabla de pagos para registrar pagos de socios
CREATE TABLE IF NOT EXISTS pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,                             
    monto DECIMAL(10, 2) NOT NULL,     
    fecha_pago DATE NOT NULL,            
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);



-- Insertar usuarios (socios, empleados, administrador)
INSERT INTO usuarios (nombre, email, password, rol, estado_pago, fecha_registro, fecha_ultimo_pago, cuota_pagada)
VALUES 
('Juan Perez', 'juan.perez@gmail.com', 'contraseña1', 'Socio', 'No Pagado', '2025-01-01', NULL, 0),
('Ana Gomez', 'ana.gomez@gmail.com', 'contraseña2', 'Socio', 'Pagado', '2025-01-15', '2025-01-15', 13000.00),
('Carlos Lopez', 'carlos.lopez@gmail.com', 'contraseña3', 'Empleado', 'Pagado', '2025-01-10', '2025-01-10', 0),
('Marta Ruiz', 'marta.ruiz@gmail.com', 'contraseña4', 'Administrador', 'Pagado', '2025-01-01', '2025-01-01', 0);

-- Inserta usuario no detallen su pago (socios, empleados, administradores)
INSERT INTO usuarios (nombre, email, password, rol, fecha_registro, fecha_ultimo_pago, cuota_pagada)
VALUES
('Pedro Arias', 'pedro.arias@gmail.com', 'contraseña1', 'Socio', '2025-01-01', NULL, 0.00);

-- Insertar actividades
INSERT INTO actividades (nombre, dias_habilitados, horario, sesiones_por_mes, max_participantes, precio)
VALUES
('Yoga', 'Lunes, Miércoles, Viernes', '08:00:00', 12, 20, 10000.00),
('Boxeo', 'Martes, Jueves', '10:00:00', 8, 15, 15000.00),
('Zumba', 'Lunes, Miércoles, Viernes', '19:00:00', 12, 25, 5000.00),
('Funcional Hard', 'Lunes a Viernes', '07:00:00', 20, 10, 12000.00);

-- Insertar inscripciones
INSERT INTO inscripciones (usuario_id, actividad_id, fecha_inscripcion, sesiones_restantes)
VALUES
(1, 1, '2025-01-02', 12),
(2, 2, '2025-01-16', 8),
(3, 3, '2025-01-11', 12),
(1, 4, '2025-01-05', 20);

-- Insertar empleados
INSERT INTO empleados (usuario_id, fecha_inicio, puesto)
VALUES
(3, '2025-01-10', 'Instructor de Boxeo'),
(4, '2025-01-01', 'Administrador del gimnasio');

-- Insertar pagos
INSERT INTO pagos (usuario_id, monto, fecha_pago)
VALUES
(2, 10000.00, '2025-01-15'),
(1, 15000.00, '2025-01-20');