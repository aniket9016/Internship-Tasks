use assignment3
--Q1 Write a query to fetch the EmpFname from the EmployeeInfo table 
--in upper case and use the ALIAS name as EmpName.
select upper(EmpFname) as EmpName
from EmployeeInfo;