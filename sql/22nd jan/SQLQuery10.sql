--Q10 Write a query to retrieve the EmpFname and EmpLname in a single column
--as “FullName”. The first name and the last name must be separated with space.

use assignment3
select concat(EmpFname,' ',EmpLname) as FullName
from EmployeeInfo;