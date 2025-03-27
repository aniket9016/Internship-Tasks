--Q-5. write a SQL query to determine the number of customers who received at least one grade for their activity.
use assignment4
select count(*) as NoOfCustomers
from Tbl_Customer 
where grade >0