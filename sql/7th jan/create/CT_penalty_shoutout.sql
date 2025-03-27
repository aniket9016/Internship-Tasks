use DB_SOCCER_GAME create table penalty_shoutout( kick_id numeric(10) primary key identity(301,1),match_no numeric(10) foreign key
references match_mast(match_no), player_id numeric(10) foreign key references player_mast(player_id),score_goal varchar(10),
kick_no numeric(10));