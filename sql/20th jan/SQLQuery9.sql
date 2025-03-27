--9. SQL Query to fetch the details of the 
--oldest athletes to win a gold medal the olympics
use assignment2
select top(1)*
from athlete_events
where Medal='Gold'
order by Age desc;

