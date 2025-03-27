--Q-19. write a SQL query to count the number of salespeople in a city. Return number of salespeople.
use assignment4
select city,count(*) as no_of_people
from Tbl_Salesman
group by city