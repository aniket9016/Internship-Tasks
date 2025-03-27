use assignment1
select DEPARTMENT,max(FIRST_NAME) as First_Name, max(SALARY) as Highest_Salary
from Tbl_Worker
group by DEPARTMENT
order by Highest_Salary desc
