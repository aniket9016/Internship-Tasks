--Q17 Write a query to fetch the department-wise count of employees sorted by
--department's count in ascending order.
use assignment3
select Department,count(*) as Noofemp 
from EmployeeInfo 
group by Department
order by Noofemp
