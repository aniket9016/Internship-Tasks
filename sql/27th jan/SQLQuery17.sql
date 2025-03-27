--Q-17. write a SQL query to find those rows where col1 does not contain the string ( _/ ). Return col1.
use assignment4
select *
from Tbl_UniqueIdentification
where col1 not like '%[_]/%'