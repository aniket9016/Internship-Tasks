--Q24 Write a query to retrieve the last 3 records from the EmployeeInfo table.
use assignment3

select top(3)* 
from EmployeeInfo
order by EmpID desc