--Q28 Write a query to retrieve Departments who have less than 2 employees 
--working in it.
use assignment3
select Department,count(*) as NoOfEmployees
from EmployeeInfo
group by Department
having count(*)<2