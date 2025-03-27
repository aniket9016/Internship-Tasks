use assignment1
select FIRST_NAME, count(*) as Noofduplicatevalues
from Tbl_Worker
group by FIRST_NAME
having count(*)>1
