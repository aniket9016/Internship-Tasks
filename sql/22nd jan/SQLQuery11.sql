--Q11 Write a query find number of employees whose DOB is between 
--02/05/1970 to 31/12/1975 and are grouped according to gender

use assignment3
select count(*) as male
from EmployeeInfo
where DOB between '1970-05-02' and '1975-12-31' and Gender='M';
select count(*) as female
from EmployeeInfo
where DOB between '1970-05-02' and '1975-12-31' and Gender='F';