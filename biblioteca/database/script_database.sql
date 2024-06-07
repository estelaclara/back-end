use biblioteca;

alter table usuario add column password varchar(50) not null;
alter table usuario  modify column id_usuario int not null primary key auto_increment;



