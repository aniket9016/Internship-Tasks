--Q20 Write a query to retrieve two minimum and maximum salaries from the 
--EmployeePosition table.
--To retrieve two minimum salaries, you can write a query as below

use assignment3
select top(2)* from EmployeePosition
order by Salary;
use assignment3
select top(2)* from EmployeePosition
order by Salary desc;