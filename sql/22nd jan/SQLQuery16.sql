--Q16 Write a query to fetch all employees who also hold the managerial 
--position.

use assignment3
select * 
from EmployeePosition
where EmpPosition='Manager'