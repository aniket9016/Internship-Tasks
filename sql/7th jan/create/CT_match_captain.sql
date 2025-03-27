use DB_SOCCER_GAME create table match_captain( match_no numeric(10) foreign key references match_mast(match_no),
team_id numeric(10) foreign key references soccer_team(team_id),
player_captain numeric(10) foreign key references player_mast(player_id));