--Q-22. write a SQL query to locate the employees whose last name begins with the letter 'D'. 
--Return emp_idno, emp_fname, emp_lname and emp_dept.
use assignment4
select * 
from Tbl_EmpDetails
where EMP_LNAME like 'D%'