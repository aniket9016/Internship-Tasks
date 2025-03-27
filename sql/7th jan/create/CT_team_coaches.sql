use DB_SOCCER_GAME create table team_coaches (team_id numeric(10) foreign key references soccer_team(team_id),
coach_id numeric(10) foreign key references coach_mast(coach_id));