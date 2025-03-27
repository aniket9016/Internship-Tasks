use DB_SOCCER_GAME create table player_booked(match_no numeric(10) foreign key references match_mast(match_no),
team_id numeric(10) foreign key references soccer_team(team_id),
player_id numeric(10) foreign key references player_mast(player_id),
booking_time varchar(40),sent_off varchar(10),play_schedule varchar(10),play_half numeric(10));