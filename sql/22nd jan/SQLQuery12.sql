--Q12 Write a query to fetch all the records from the EmployeeInfo table 
--ordered by EmpLname in descending order and Department in the ascending 
--order.
--To order the records in ascending and descnding order, you have to use 
--the ORDER BY statement in SQL.
use assignment3

select *
from EmployeeInfo
order by EmpLname desc,Department