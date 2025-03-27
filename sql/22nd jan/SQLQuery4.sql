--Q4 Write a query to retrieve the first four characters of EmpLname from
--the EmployeeInfo table.
use assignment3
select left(EmpLname,4) as First4CharOfEmpLname
from EmployeeInfo