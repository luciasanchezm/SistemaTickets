create database tickets_system;

use tickets_system;

create table categorias(id int auto_increment primary key, 
					    nombre varchar(50) not null);
                       
create table personal(id int auto_increment primary key, 
					  nombre varchar(50) not null,
                      apellidos varchar(80) not null,
                      telefono char(10),
                      direccion varchar(150));
                      
create table tickets(id int auto_increment primary key,
					 nombre varchar(50) not null,
                     descripcion varchar(100),
					 prioridad char(1) not null,
                     foreign key (id) references personas(id),
					 foreign key (id) references categorias(id),
                     estatus char(3));
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'luri';