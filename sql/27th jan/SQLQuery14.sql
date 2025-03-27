--Q-14. write a SQL query to find rows in which col1 contains the forward slash character ( / ). Return col1.
use assignment4
select *
from Tbl_UniqueIdentification
where col1 like '%/%'