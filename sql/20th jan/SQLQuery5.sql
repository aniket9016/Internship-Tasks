use assignment2
--5. SQL query to fetch total no of countries participated in each olympic games.select distinct Games, count(distinct Team) as NoOfCountries
from athlete_events
group by Games
