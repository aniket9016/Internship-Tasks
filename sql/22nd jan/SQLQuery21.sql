--Q21 Write a query to find the Nth highest salary from the table without 
--using TOP/limit keyword.
use assignment3
select ROW_NUMBER() over (order by salary desc) as rowno,*
from EmployeePosition;

select * 
from EmployeePosition
order by Salary
offset 4 rows
fetch next 1 rows only;