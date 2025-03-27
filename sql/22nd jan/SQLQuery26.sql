--Q26 Write a query to display the first and the last record from the 
--EmployeeInfo table.
--To display the first record from the EmployeeInfo table,
--you can write a query as follows
--To display the last record from the EmployeeInfo table,
--you can write a query as follows

use assignment3
select top(1)*
from EmployeeInfo
order by EmpID;
use assignment3
select top(1)*
from EmployeeInfo
order by EmpID desc;