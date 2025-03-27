--Q25 Write a query to find the third-highest salary from the EmpPosition table.
use assignment3

select * 
from EmployeePosition
order by Salary desc
offset 2 rows
fetch next 1 rows only;
