use assignment2
select distinct Games,count(*) as No_of_countries
from athlete_events
group by Games;