--Q8 Write a query to find the names of employees that begin with 'S'
use assignment3
select * 
from EmployeeInfo 
where EmpFname like 'S%'