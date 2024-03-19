-- Active: 1705366687777@@127.0.0.1@5432@postgres@public
create table tbl_rol 
(
    id serial PRIMARY key,
    nombre_rol varchar(200), 
    fecha_creacion TIMESTAMP DEFAULT current_timestamp, 
    activo BOOLEAN DEFAULT true
);

drop table tbl_usuarios;
create table tbl_usuarios 
(
    nombre_usuario  varchar(20) primary key,
    correo_electronico varchar(50),
    contrasena varchar(20),
    nombre varchar(200),
    apellido varchar(200),
    foto_perfil bytea,
    id_rol int,
    fecha_creacion TIMESTAMP DEFAULT current_timestamp, 
    activo BOOLEAN DEFAULT true, 
    constraint fk_id_rol FOREIGN key (id_rol) REFERENCES tbl_rol (id)
);

select * from tbl_usuarios;

drop table tbl_post_usuarios;

create table tbl_publicacion
(
    id SERIAL PRIMARY key,
    imagen bytea , 
    mime_type varchar(500), 
    nombre_archivo varchar(500),
    caption varchar(250), 
    nombre_usuario varchar(20) REFERENCES tbl_usuarios(nombre_usuario), 
    fecha_post TIMESTAMP DEFAULT current_timestamp, 
    activo bool DEFAULT true
);


select a.nombre_usuario ,
                        a.correo_electronico,
                        a.contrasena,
                        a.nombre,
                        a.apellido , 
                        a.id_rol , 
                        b.nombre_rol
                from    tbl_usuarios a 
                inner join  tbl_rol b  on a.id_rol = b.id;

select * from tbl_usuarios;

create table tbl_comentarios 
( 
    id SERIAL PRIMARY KEY, 
    contenido varchar(250), 
    id_publicacion int REFERENCES tbl_publicacion(id), 
    nombre_usuario varchar(20) REFERENCES tbl_usuarios(nombre_usuario), 
    fecha_comentario TIMESTAMP DEFAULT current_timestamp, 
    activo BOOLEAN DEFAULT true 
);

SELECT * FROM tbl_comentarios;
