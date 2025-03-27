use assignment1
select count(*) as Quantity, FIRST_NAME,year(JOINING_DATE) as OrderYear
from Tbl_Worker 
where FIRST_NAME like '[A-K]%' AND JOINING_DATE BETWEEN '2014-01-01' AND '2022-01-01'
group by FIRST_NAME, year(JOINING_DATE) 