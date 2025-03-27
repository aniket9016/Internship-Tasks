use DB_SOCCER_GAME create table player_mast(player_id numeric(10) identity(8001,1) primary key,team_id numeric(10) foreign key 
references soccer_team(team_id),jersey_no numeric(10),player_name varchar(40),posi_to_play varchar(50) foreign key references
playing_position(position_desc),dt_of_birth date,age numeric(15),playing_club varchar(40));