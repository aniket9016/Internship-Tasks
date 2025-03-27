use assignment1
select department, count(*) as Noofworker
from Tbl_Worker
group by DEPARTMENT
having count(*)>5;