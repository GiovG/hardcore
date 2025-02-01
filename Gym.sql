drop database Gym;

CREATE DATABASE Gym;


-- Usar la base de datos
USE Gym;

-- Tabla Socios
CREATE TABLE Socios (
    id_socio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    telefono VARCHAR(15),
    fecha_registro DATE NOT NULL DEFAULT (CURRENT_DATE),
    estado ENUM('Activo', 'Inactivo', 'Deudor') NOT NULL DEFAULT 'Inactivo',
    notificaciones BOOLEAN DEFAULT TRUE
);

-- Tabla Cuotas
CREATE TABLE Cuotas (
    id_cuota INT AUTO_INCREMENT PRIMARY KEY,
    id_socio INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado ENUM('Pagada', 'Vencida', 'Deudor') NOT NULL DEFAULT 'Vencida',
    FOREIGN KEY (id_socio) REFERENCES Socios(id_socio)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Tabla Actividades Primarias
CREATE TABLE ActividadesPrimarias (
    id_actividad INT AUTO_INCREMENT PRIMARY KEY,
    nombre_actividad_pri ENUM('Pesas', 'Cardio') NOT NULL,
    dias_habilitados VARCHAR(50),
    horario TIME NOT NULL,
    sesiones_mensuales INT NOT NULL,
    cupo_maximo INT NOT NULL,
    participantes_actuales INT NOT NULL DEFAULT 0,
    estado ENUM('Disponible', 'Completa') NOT NULL DEFAULT 'Disponible'
);

-- Tabla Actividades Secundarias
CREATE TABLE ActividadesSecundarias (
    id_actividad INT AUTO_INCREMENT PRIMARY KEY,
    nombre_actividad_sec ENUM('Zumba', 'Cycle', 'Functional Boxing', 'Dodgeball') NOT NULL,
    dias_habilitados VARCHAR(50),
    horario TIME NOT NULL,
    sesiones_mensuales INT NOT NULL,
    cupo_maximo INT NOT NULL,
    participantes_actuales INT NOT NULL DEFAULT 0,
    estado ENUM('Disponible', 'Completa') NOT NULL DEFAULT 'Disponible'
);

-- Tabla Inscripciones a Actividades
CREATE TABLE InscripcionesActividades (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
    id_socio INT NOT NULL,
    id_actividad_primaria INT,
    id_actividad_secundaria INT,
    sesiones_restantes INT NOT NULL,
    fecha_inscripcion DATE NOT NULL DEFAULT (CURRENT_DATE),
    FOREIGN KEY (id_socio) REFERENCES Socios(id_socio)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_actividad_primaria) REFERENCES ActividadesPrimarias(id_actividad)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_actividad_secundaria) REFERENCES ActividadesSecundarias(id_actividad)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Tabla Asistencias
CREATE TABLE Asistencias (
    id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    id_socio INT NOT NULL,
    fecha DATE NOT NULL DEFAULT (CURRENT_DATE),
    tipo_ingreso ENUM('Normal', 'Dia de Gracia') NOT NULL,
    FOREIGN KEY (id_socio) REFERENCES Socios(id_socio)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Tabla Empleados
CREATE TABLE Empleados (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    telefono VARCHAR(15),
    rol ENUM('Administrador', 'Recepcionista') NOT NULL,
    fecha_contratacion DATE NOT NULL DEFAULT (CURRENT_DATE)
    );
    
-- Insertar más Datos en la Tabla Empleados
INSERT INTO Empleados (nombre, apellido, email, telefono, rol, fecha_contratacion) 
VALUES 
('Mario', 'Sánchez', 'mario.sanchez@email.com', '555444333', 'Administrador', '2024-11-01'),
('Claudia', 'López', 'claudia.lopez@email.com', '888777666', 'Recepcionista', '2025-01-10'),
('Ricardo', 'Torres', 'ricardo.torres@email.com', '999888777', 'Recepcionista', '2025-01-20');

-- Insertar más Datos en la Tabla Socios
INSERT INTO Socios (nombre, apellido, email, telefono, estado, notificaciones) 
VALUES 
('Andrés', 'González', 'andres.gonzalez@email.com', '1234598760', 'Activo', TRUE),
('Sofia', 'Martínez', 'sofia.martinez@email.com', '0987423561', 'Inactivo', TRUE),
('Elena', 'Pérez', 'elena.perez@email.com', '1122456789', 'Deudor', FALSE),
('Luis', 'Fernández', 'luis.fernandez@email.com', '2233445566', 'Activo', TRUE),
('Paola', 'Jiménez', 'paola.jimenez@email.com', '3344556677', 'Deudor', TRUE);

-- Insertar 5 Datos más en la Tabla Socios
INSERT INTO Socios (nombre, apellido, email, telefono, estado, notificaciones) 
VALUES 
('Martín', 'Vázquez', 'martin.vazquez@email.com', '3456789012', 'Activo', TRUE),
('Carla', 'Ramírez', 'carla.ramirez@email.com', '4567890123', 'Inactivo', FALSE),
('Diego', 'Hernández', 'diego.hernandez@email.com', '5678901234', 'Deudor', TRUE),
('Ana', 'García', 'ana.garcia@email.com', '6789012345', 'Activo', TRUE),
('Javier', 'Morales', 'javier.morales@email.com', '7890123456', 'Deudor', FALSE);