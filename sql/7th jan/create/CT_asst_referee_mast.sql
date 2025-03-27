use DB_SOCCER_GAME create table asst_referee_mast(ass_ref_id numeric(10) identity(201,1),ass_ref_name varchar(40),country_id numeric(10)
foreign key references soccer_country(country_id));