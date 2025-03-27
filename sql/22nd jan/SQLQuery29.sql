--Q29 Write a query to retrieve EmpPostion along with total salaries paid for each of them.
use assignment3

select EmpPosition,sum(Salary) as Total
from EmployeePosition
group by EmpPosition