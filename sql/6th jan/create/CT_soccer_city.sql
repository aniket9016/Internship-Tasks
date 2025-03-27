use DB_SOCCER_GAME create table soccer_city (city_id numeric(10) primary key identity(3001,1),
city varchar(25),country_id numeric(10) foreign key references soccer_country (country_id));