use DB_SOCCER_GAME create table match_details(match_no numeric(10) foreign key references match_mast(match_no),
play_stage varchar(2), team_id numeric(10) foreign key references soccer_team(team_id),win_loos varchar(10),
decided_by varchar(10),goal_score numeric(10), penalty_score numeric(10), ass_ref numeric(10) 
foreign key references referee(referee_id),player_gk numeric(10) foreign key references player_mast(player_id));