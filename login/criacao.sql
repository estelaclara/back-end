create database login;
use login;

create table usuario(
idusuario int not null primary key,
username varchar(20) not null,
password varchar(8) not null
);

insert into usuario (idusuario, username, password) values 
(1, 'estela', 123);