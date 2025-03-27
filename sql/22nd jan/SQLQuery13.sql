--Q13 Write a query to fetch details of employees whose EmpLname ends with 
--an alphabet 'A' and contains five alphabets.
--To fetch details mathcing a certain value, you have to use 
--the LIKE operator in SQL.
use assignment3
select * 
from EmployeeInfo
where EmpLname like '____%A'