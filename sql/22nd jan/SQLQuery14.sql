--Q14 Write a query to fetch details of all employees excluding the employees 
--with first names, “Sanjay” and “Sonia” from the EmployeeInfo table.
use assignment3
select * 
from EmployeeInfo
where EmpFname not between 'Sanjay' and 'Sonia'