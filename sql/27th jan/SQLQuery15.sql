--Q-15. write a SQL query to identify those rows where col1 does not contain the forward slash character ( / ). 
--Return col1.
use assignment4
select *
from Tbl_UniqueIdentification
where col1 not like '%/%'