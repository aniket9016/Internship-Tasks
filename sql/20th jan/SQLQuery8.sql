--8. Write SQL query to fetch the total no of sports played in each olympics.
use assignment2
select distinct Games, count(distinct Sport) as NoOfsports
from athlete_events
group by Games
order by NoOfsports desc