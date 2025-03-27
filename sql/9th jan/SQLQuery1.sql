use assignment1
select count(*) as Quantity, FIRST_NAME,year(JOINING_DATE) as OrderYear
from Tbl_Worker group by FIRST_NAME, year(JOINING_DATE)