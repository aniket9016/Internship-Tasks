--Q18 Write a query to calculate the even and odd records from a table.
--To retrieve the even records from a table, you have to use the MOD() 
--function as follows
--Similarly, to retrieve the odd records from a table, you can write a 
--query as follows
use assignment3
select count(*) as odd 
from EmployeeInfo
where EmpID%2<>0;
select count(*) as even
from EmployeeInfo
where EmpID%2=0;
