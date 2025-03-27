use	assignment1
select * from (select *,ROW_NUMBER() over (order by SALARY desc) as rownum
from Tbl_Worker) as sub where rownum=5;

