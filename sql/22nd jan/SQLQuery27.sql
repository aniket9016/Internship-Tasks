--Q27 Write a query to add email validation to your database
use assignment3
select * from newtable;

alter table newtable add email varchar(20) constraint checkemail check(email like '%_@__%.__%');

update newtable set email='aniket' where empid=1

update newtable set email='aniket@gmail.com' where EmpID=2