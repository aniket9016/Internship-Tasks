--Q-8. write a SQL query to find the highest grade of the customers in each city. Return city, maximum grade.
use assignment4
select distinct city,max(grade) as max_grade 
from Tbl_Customer
group by city