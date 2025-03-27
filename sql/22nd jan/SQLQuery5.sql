--Q5 Write a query to fetch only the place name(string before brackets) 
--from the Address column of EmployeeInfo table.
--Using SUBSTRING

use	assignment3
select SUBSTRING(Address,1,LEN(Address)-5) as Placename
from EmployeeInfo;