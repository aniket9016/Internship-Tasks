--Q-3. write a SQL query that counts the number of unique salespeople. Return number of salespeople.
use assignment4
select count(distinct salesman_id) as number_of_salespeople
from Tbl_Salesman