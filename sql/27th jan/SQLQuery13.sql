--Q-13. write a SQL query to identify those rows where col1 does not contain the escape character underscore ( _ ). 
--Return col1.
use assignment4
select *
from Tbl_UniqueIdentification
where col1 not like '%_%'