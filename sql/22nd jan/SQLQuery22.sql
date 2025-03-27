--Q22 Write a query to retrieve duplicate records from a table.
use assignment3
select EmpFname,EmpLname,count(*) as NoOfRecords
from EmployeeInfo
group by EmpFname, EmpLname
having count(*)>0