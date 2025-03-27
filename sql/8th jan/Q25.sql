use assignment1
select DEPARTMENT, sum(SALARY) as TOTALSALARY
from Tbl_Worker
group by DEPARTMENT
