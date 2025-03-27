--1. From the following table return complete information about the employees. 
use exam
select * from Employees
--2. write a SQL query to find the salaries of all employees. Return salary 
select emp_name,salary
from Employees
--3. write a SQL query to find the unique designations of the employees. Return job name. 
select distinct job_name 
from Employees
--4. write a SQL query to list the employees’ name, increased their salary by 15%, and expressed as number of Dollars.
select emp_name,salary+(salary*15)/100 as number_of_Dollars
from Employees
--5. write a SQL query to list the employee's name and job name as a format of "Employee & Job" 
select emp_name+SPACE(1)+job_name "Employee & Job"
from Employees
--6. Write a query in SQL to produce the output of employees as follows. 
--Employee 
--JONAS(manager). 
select emp_name+QUOTENAME(job_name,'()') "Employee & Job"
from Employees
--7. write a SQL query to find those employees with hire date in the format like February 22, 1991.
--Return employee ID, employee name, salary, hire date. 
select emp_id,emp_name,salary,FORMAT( hire_date,'MMMM ')+FORMAT( hire_date,'dd')+FORMAT( hire_date,' ,yyyy' ) "hire date"
from Employees
--8. write a SQL query to count the number of characters except the spaces for each 
--employee name. Return employee name length.
select emp_name,len(emp_name) "employee name length"
from Employees
--9. write a SQL query to find the employee ID, salary, and commission of all the employees.
select emp_id,salary,commission
from Employees
--10. write a SQL query to find the unique department with jobs. Return department ID, Job name. 
select distinct dep_id,job_name
from Employees
--11. write a SQL query to find those employees who do not belong to the department 
--2001. Return complete information about the employees.
select *
from Employees
where dep_id <>2001
--12. write a SQL query to find those employees who joined before 1991. Return complete 
--information about the employees. 
select *
from Employees
where year(hire_date) < 1991
--13. write a SQL query to calculate the average salary of employees who work as analysts. 
--Return average salary. 
select avg(salary) "average salary"
from Employees
where job_name='analyst'
--14. write a SQL query to find the details of the employee ‘BLAZE’. 
select *
from Employees
where emp_name='BLAZE'
--15. write a SQL query to identify employees whose commissions exceed their salaries. 
--Return complete information about the employees.
select *
from Employees
where commission is not NULL and commission >0
--16. write a SQL query to identify those employees whose salaries exceed 3000 after 
--receiving a 25% salary increase. Return complete information about the employees. 
select *
from Employees
where salary+(salary*25/100)>3000
--17. write a SQL query to find the names of the employees whose length is six. Return 
--employee name
select emp_name
from Employees
where len(emp_name)=6
--18. write a SQL query to find out which employees joined in the month of January. 
--Return complete information about the employees. 
select *
from Employees
where month(hire_date)=1
--19. write a SQL query to separate the names of employees and their managers by the 
--string 'works for'.
select emp_name+' works for ' +cast(manager_id as nvarchar) "emp works for manager"
from Employees
--20. write a SQL query to find those employees whose designation is ‘CLERK’. Return 
--complete information about the employees. 
select *
from Employees
where job_name='CLERK'
--21. write a SQL query to identify employees with more than 27 years of experience. 
--Return complete information about the employees. 
select *,DATEDIFF( year,hire_date,GETDATE()) as "experience"
from Employees
where DATEDIFF( year,hire_date,GETDATE())>27
--22. write a SQL query to find those employees whose salaries are less than 3500. Return 
--complete information about the employees. 
select *
from Employees where salary<3500
--23. write a SQL query to find the employee whose designation is ‘ANALYST’. Return 
--employee name, job name and salary. 
select emp_name,job_name,salary
from Employees 
where job_name='ANALYST'
--24. write a SQL query to identify those employees who joined the company in 1991. 
--Return complete information about the employees. 
select *
from Employees
where year(hire_date)=1991
--25. write a SQL query to find those employees who joined before 1st April 1991. Return 
--employee ID, employee name, hire date and salary.
select emp_id,emp_name,hire_date,salary
from Employees
where hire_date<'1991-04-01'
--26. write a SQL query identify the employees who do not report to a manager. Return 
--employee name, job name. 
select *
from Employees
where manager_id is null
--27. write a SQL query to find the employees who joined on the 1st of May 1991. Return 
--complete information about the employees. 
select * 
from Employees
where hire_date='1991-05-01'
--28. write a SQL query to identify the experience of the employees who work under the 
--manager whose ID number is 68319. Return employee ID, employee name, salary, experience. 
select emp_id,emp_name,salary,DATEDIFF( year,hire_date,GETDATE()) as "experience"
from Employees
where manager_id=68319
--29. write a SQL query to find out which employees earn more than 100 per day as a 
--salary. Return employee ID, employee name, salary, and experience. 
select emp_id,emp_name,salary,DATEDIFF( year,hire_date,GETDATE()) as "experience"
from Employees
where (salary*12/365)>100
--30. write a SQL query to identify those employees who retired after 31-Dec-99, 
--completing eight years of service. Return employee name. 
select emp_name
from Employees
where DATEDIFF( year,hire_date,('1999-12-31'))=8
--31. write a SQL query to identify the employees whose salaries are odd. Return complete 
--information about the employees. 
select *
from Employees
where salary%2=0
--32. write a SQL query to identify employees whose salaries contain only three digits. 
--Return complete information about the employees. 
select * 
from Employees
where len(floor(salary))=3
--33. write a SQL query to find out which employees joined the company before the 19th of 
--the month. Return complete information about the employees. 
select *
from Employees
where day(hire_date)=19
--34. write a SQL query to identify those employees who have been working as a 
--SALESMAN and month portion of the experience is more than 10. Return complete 
--information about the employees. 
select *,DATEDIFF( year,hire_date,GETDATE()) as "experience"
from Employees
where DATEDIFF( year,hire_date,GETDATE()) >10 and job_name='SALESMAN'
--35. write a SQL query to find those employees of department id 3001 or 1001 and joined 
--in the year 1991. Return complete information about the employees 
select *
from Employees
where (dep_id=3001 or dep_id=1001 )and year(hire_date)=1991
--36. write a SQL query to find the employees who are working for the department ID 1001 
--or 2001. Return complete information about the employees. 
select *
from Employees
where dep_id in (1001,2001)
--37. write a SQL query to find those employees whose designation is ‘CLERK’ and work 
--in the department ID 2001. Return complete information about the employees. 
select *
from Employees
where job_name='CLERK' and dep_id =2001
--38. write a query in SQL to find those employees where - 
--1. the employees receive some commission which should not be more than the salary 
--and annual salary including commission is below 34000. 
--2. Designation is ‘SALESMAN’ and working in the department ‘3001’. Return 
--employee ID, employee name, salary and job name. 
select *
from Employees where salary>commission and 12*(salary+commission)<34000
select emp_id,emp_name,salary,job_name 
from Employees where job_name='SALESMAN' and dep_id=3001
--39. write a SQL query to identify those employees who joined in any month other than 
--February. Return complete information about the employees. 
select *
from Employees
where month(hire_date) <> 2
--40. write a SQL query to search for all employees with an annual salary between 24000 
--and 50000 (Begin and end values are included.). Return complete information about 
--the employees. 
select *
from Employees
where 12*(salary) between 24000 and 50000
--41. write a SQL query to identify all employees who joined the company on 1st May, 
--20th February, and 3rd December 1991. Return complete information about the 
--employees. 
select *
from Employees 
where hire_date in ('1991-05-01','1991-02-20','1991-12-03')
--42. write a SQL query to find which employees joined the company after the month of 
--June in 1991 and within this year. Return complete information about the employees. 
select * 
from Employees where year(hire_date)=1991 and month(hire_date)>6
--43. write a SQL query to find those employees who joined in 90's. Return complete 
--information about the employees. 
select *
from Employees
where year(hire_date)=1990
--44. write a SQL query to identify employees who joined in the month of FEBRUARY 
--with a salary range of 1001 to 2000 (Begin and end values are included.). Return 
--complete information about the employees. 
select *
from Employees
where (salary between 1001 and 2000 )and month(hire_date)=2
--45. write a SQL query to find those employees who joined before or after the year 1991. 
--Return complete information about the employees.
select *
from Employees
where year(hire_date) <>1991
