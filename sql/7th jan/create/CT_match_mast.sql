use DB_SOCCER_GAME create table match_mast(match_no numeric(10) identity(9001,1) primary key,play_stage varchar(10),play_date date,
results varchar(10), decided_by varchar(10),goal_score varchar(10),venue_id numeric(10) foreign key references soccer_venue(venue_id)
,referee_id numeric(10) foreign key references referee(referee_id),audence numeric(10),plr_of_match numeric(10) foreign key references player_mast(player_id),
stop1_sec numeric(10),stop_sec numeric(10));
