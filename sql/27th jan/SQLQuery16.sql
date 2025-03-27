--Q-16. write a SQL query to find those rows where col1 contains the string ( _/ ). Return col1.
use assignment4
select *
from Tbl_UniqueIdentification
where col1 like '%[_]/%'