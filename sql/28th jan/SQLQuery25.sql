--Q-25. write a SQL query to count the number of employees in each department. Return department code and number 
--of employees.
use assignment4
select EMP_DEPT,count(*) as "number of employees"
from Tbl_EmpDetails
group by EMP_DEPT
