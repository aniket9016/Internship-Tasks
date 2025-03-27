use DB_SOCCER_GAME create table soccer_team (team_id numeric(10) primary key identity(6001,1),
team_group varchar(25),match_played numeric(10),won numeric(10),draw numeric(10),lost numeric(10),
goal_for numeric(10),goal_agnst numeric(10),goal_diff numeric(10),points numeric(10) ,group_position numeric(10));