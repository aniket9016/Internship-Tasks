--Q19 Write a SQL query to retrieve employee details from EmployeeInfo table
--who have a date of joining in the EmployeePosition table.
use assignment3
select distinct emp.EmpID,emp.EmpFname,emp.EmpLname,emp.Department,emp.Project,emp.Address,emp.DOB,emp.Gender
from EmployeeInfo emp
join EmployeePosition empp on emp.EmpID=empp.EmpID
where empp.EmpID=emp.EmpID
