--Q-24. write a SQL query to compute the sum of the allotment amount of all departments. 
--Return sum of the allotment amount.
use assignment4
select sum(DPT_ALLOTMENT) as "sum of the allotment amount"
from Tbl_Department