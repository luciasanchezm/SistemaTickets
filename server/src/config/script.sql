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
                     persona_id int not null,
					 categoria_id int not null,
                     estatus char(3) not null,
                     foreign key (persona_id) references personal(id),
					 foreign key (categoria_id) references categorias(id));