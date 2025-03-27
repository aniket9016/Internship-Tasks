--11. SQL query to fetch the top 5 athletes who have won the most gold medals.
use assignment2
select top(5) name,count(Medal) as noom
from athlete_events
where medal='Gold'
group by Medal,name
order by noom desc;
