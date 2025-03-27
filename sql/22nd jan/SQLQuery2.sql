use assignment3
--Q2 Write a query to fetch the number of employees working in the 
--department 'HR'.
select Department,count(*) as NOOFEMPINHR 
from EmployeeInfo
where Department='HR'
group by Department
