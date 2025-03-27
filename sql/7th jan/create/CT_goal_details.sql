use DB_SOCCER_GAME create table goal_details(goal_id numeric(10) primary key identity(301,1),match_no numeric(10) foreign key 
references match_mast(match_no),player_id numeric(10) foreign key references player_mast(player_id),
team_id numeric(10) foreign key references soccer_team(team_id), goal_time numeric(10),goal_type varchar(10),play_stage varchar(10),
goal_schedule varchar(10), goal_half numeric(10));