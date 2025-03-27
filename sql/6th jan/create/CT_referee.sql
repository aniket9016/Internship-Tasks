use DB_SOCCER_GAME create table referee (referee_id numeric(10) primary key identity(4001,1),
referee_name varchar(25),country_id numeric(10) foreign key references soccer_country (country_id));