use assignment1
select FIRST_NAME,
replace(FIRST_NAME,'a' , 'A') as updated_first_name
from Tbl_Worker