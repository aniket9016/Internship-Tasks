use assignment4
select * from Tbl_Salesman
select * from Tbl_Orders
select * from Tbl_Customer
select * from Tbl_CompanyMaster
select * from Tbl_ItemMaster
select * from Tbl_Department
select * from Tbl_EmpDetails

--Q-1. write a SQL query to find the salesperson and customer who reside in the same city. Return Salesman, cust_name 
--and city.
select s.name,c.cust_name,c.city
from Tbl_Customer c
join Tbl_Salesman s on s.salesman_id=c.salesman_id
where c.city=s.city

--Q-2. write a SQL query to find those orders where the order amount exists between 500 and 2000. Return ord_no,
--purch_amt, cust_name, city.
select o.ord_no,o.purch_amt,c.cust_name,c.city
from Tbl_Customer c
join Tbl_Orders o on o.customer_id=c.customer_id
where o.purch_amt between 500 and 2000
--Q-3. write a SQL query to find the salesperson(s) and the customer(s) he represents. Return Customer Name, city, 
--Salesman, commission.
select c.cust_name,c.city,s.salesman_id,s.commission
from Tbl_Customer  c
join Tbl_Salesman s on c.salesman_id=s.salesman_id

--Q-4. write a SQL query to find salespeople who received commissions of more than 12 percent from the company. 
--Return Customer Name, customer city, Salesman, commission.
select c.cust_name,c.city,s.salesman_id,s.commission
from Tbl_Customer  c
join Tbl_Salesman s on c.salesman_id=s.salesman_id
where s.commission > 0.12
--Q-5. write a SQL query to locate those salespeople who do not live in the same city where their customers live and 
--have received a commission of more than 12% from the company. Return Customer Name, customer city, Salesman, salesman 
--city, commission.
select c.cust_name,c.city,s.salesman_id,s.city,s.commission
from Tbl_Customer  c
join Tbl_Salesman s on c.salesman_id=s.salesman_id
where (s.commission > 0.12) and (s.city<>c.city)
--Q-6. write a SQL query to find the details of an order. Return ord_no, ord_date, purch_amt, Customer Name, grade, 
--Salesman, commission.
select o.ord_no,o.ord_date,o.purch_amt,c.cust_name,c.cust_name,c.grade,c.salesman_id,s.commission
from Tbl_Orders o
join Tbl_Customer c on c.customer_id=o.customer_id
join Tbl_Salesman s on s.salesman_id=c.salesman_id
--Q-7. Write a SQL statement to join the tables salesman, customer and orders so that the same column of each table 
--appears once and only the relational rows are returned.
select c.customer_id,s.salesman_id,o.ord_no
from Tbl_Orders o
join Tbl_Customer c on c.customer_id=o.customer_id
join Tbl_Salesman s on s.salesman_id=c.salesman_id
--Q-8. write a SQL query to display the customer name, customer city, grade, salesman, salesman city. 
--The results should be sorted by ascending customer_id.
select c.cust_name,c.city,c.grade,s.salesman_id,s.city
from Tbl_Customer c
join Tbl_Salesman s on s.salesman_id=c.salesman_id
order by c.customer_id
--Q-9. write a SQL query to find those customers with a grade less than 300. Return cust_name, customer city, grade, 
--Salesman, salesmancity. The result should be ordered by ascending customer_id.
select c.cust_name,c.city,c.grade,s.salesman_id,s.city
from Tbl_Customer c
join Tbl_Salesman s on s.salesman_id=c.salesman_id
where c.grade<300
order by c.customer_id
--Q-10. Write a SQL statement to make a report with customer name, city, order number, order date, and order amount in 
--ascending order according to the order date to determine whether any of the existing customers have placed an order
--or not.
select c.cust_name,c.city,o.ord_no,o.ord_date,o.purch_amt
from Tbl_Customer c
 join Tbl_Orders o on o.customer_id=c.customer_id
order by o.ord_date

--Q-11. SQL statement to generate a report with customer name, city, order number, order date, order amount, salesperson 
--name, and commission to determine if any of the existing customers have not placed orders or if they have placed orders
--through their salesman or by themselves.
select c.cust_name,c.city,o.ord_no,o.ord_date,o.purch_amt,s.name,s.commission
from Tbl_Customer c
join Tbl_Orders o on o.customer_id=c.customer_id
join Tbl_Salesman s on s.salesman_id=c.salesman_id
--Q-12. Write a SQL statement to generate a list in ascending order of salespersons who work either for one or more
--customers or have not yet joined any of the customers.
select *
from  Tbl_Salesman s
left join Tbl_Customer c on s.salesman_id=c.salesman_id
order by s.salesman_id
--Q-13. write a SQL query to list all salespersons along with customer name, city, grade, order number, date, and amount.
select s.salesman_id,c.cust_name,c.city,c.grade,o.ord_no,o.ord_date,o.purch_amt
from Tbl_Salesman s
join Tbl_Customer c on c.salesman_id=s.salesman_id
join Tbl_Orders o on o.customer_id=c.customer_id
order by s.salesman_id
--Q-14. Write a SQL statement to make a list for the salesmen who either work for one or more customers or yet to join 
--any of the customer. The customer may have placed, either one or more orders on or above order amount 2000 and must 
--have a grade, or he may not have placed any order to the associated supplier.
select distinct s.name
from Tbl_Salesman s
join Tbl_Customer c on c.salesman_id=s.salesman_id
join Tbl_Orders o on o.customer_id=c.customer_id
where (o.purch_amt>=2000 and c.grade is not null) or
o.ord_no is null
--Q-15. Write a SQL statement to generate a list of all the salesmen who either work for one or more customers or 
--have yet to join any of them. The customer may have placed one or more orders at or above order amount 2000, and 
--must have a grade, or he may not have placed any orders to the associated supplier.
select distinct s.name
from Tbl_Salesman s
left join Tbl_Customer c on c.salesman_id=s.salesman_id
left join Tbl_Orders o on o.customer_id=c.customer_id
where (o.purch_amt>=2000 and c.grade is not null) or
o.ord_no is null
--Q-16. Write a SQL statement to generate a report with the customer name, city, order no. order date, purchase amount 
--for only those customers on the list who must have a grade and placed one or more orders or which order(s) have been 
--placed by the customer who neither is on the list nor has a grade.
select c.cust_name,c.city,o.ord_no,o.ord_date,o.purch_amt
from Tbl_Customer c
join Tbl_Orders o on o.customer_id=c.customer_id
where c.grade is not null
--Q-17. Write a SQL query to combine each row of the salesman table with each row of the customer table.
select *
from Tbl_Salesman s
left join Tbl_Customer c on c.salesman_id=s.salesman_id
--Q-18. Write a SQL statement to create a Cartesian product between salesperson and customer, i.e. each salesperson 
--will appear for all customers and vice versa for that salesperson who belongs to that city.
select s.name,c.cust_name,c.city
from Tbl_Salesman s
cross join Tbl_Customer c
where s.city=c.city
--Q-19. Write a SQL statement to create a Cartesian product between salesperson and customer, i.e. each salesperson 
--will appear for every customer and vice versa for those salesmen who belong to a city and customers who require a grade.
select s.name,c.cust_name,c.city,c.grade
from Tbl_Salesman s
cross join Tbl_Customer c
where s.City IS NOT NULL AND c.Grade IS NOT NULL
--Q-20. Write a SQL statement to make a Cartesian product between salesman and customer i.e. each salesman will appear 
--for all customers and vice versa for those salesmen who must belong to a city which is not the same as his customer 
--and the customers should have their own grade.
select s.name,c.cust_name,c.city,c.grade
from Tbl_Salesman s
cross join Tbl_Customer c
where s.City <>c.city AND c.Grade IS NOT NULL
--Q-21. write a SQL query to select all rows from both participating tables as long as there is a match between pro_com 
--and com_id.
select *
from  Tbl_ItemMaster i
join Tbl_CompanyMaster c on i.PRO_COM=c.COM_ID
--Q-22. Write a SQL query to display the item name, price, and company name of all the products.
select i.PRO_NAME,i.PRO_PRICE,c.COM_NAME
from  Tbl_ItemMaster i
join Tbl_CompanyMaster c on i.PRO_COM=c.COM_ID

--Q-23. write a SQL query to calculate the average price of items of each company. Return average value and company name.
select c.COM_NAME,avg(i.PRO_PRICE) as Average
from  Tbl_ItemMaster i
join Tbl_CompanyMaster c on i.PRO_COM=c.COM_ID
group by c.COM_NAME
--Q-24. write a SQL query to calculate and find the average price of items of each company higher than or equal to Rs. 350.
--Return average value and company name.
select c.COM_NAME,avg(i.PRO_PRICE) as Average
from  Tbl_ItemMaster i
join Tbl_CompanyMaster c on i.PRO_COM=c.COM_ID
group by c.COM_NAME 
having avg(i.PRO_PRICE)>=350
--Q-25. write a SQL query to find the most expensive product of each company. Return pro_name, pro_price and com_name.
select max(i.PRO_PRICE) as PRO_PRICE,c.COM_NAME
from  Tbl_ItemMaster i
join Tbl_CompanyMaster c on i.PRO_COM=c.COM_ID
group by c.COM_NAME

--Q-26. write a SQL query to display all the data of employees including their department.
select *
from Tbl_EmpDetails e
left join Tbl_Department d on d.DPT_CODE=e.EMP_DEPT
--Q-27. write a SQL query to display the first and last names of each employee, as well as the department name and
--sanction amount.
select e.EMP_FNAME,e.EMP_LNAME,d.DPT_NAME,d.DPT_ALLOTMENT
from Tbl_EmpDetails e
left join Tbl_Department d on d.DPT_CODE=e.EMP_DEPT
--Q-28. write a SQL query to find the departments with budgets more than Rs. 50000 and display the first name and 
--last name of employees.
select e.EMP_FNAME,e.EMP_LNAME
from Tbl_EmpDetails e
left join Tbl_Department d on d.DPT_CODE=e.EMP_DEPT
where d.DPT_ALLOTMENT > 50000
--Q-29. write a SQL query to find the names of departments where more than two employees are employed. Return dpt_name.
select d.DPT_NAME
from Tbl_EmpDetails e
join Tbl_Department d on d.DPT_CODE=e.EMP_DEPT
group by e.EMP_DEPT, d.DPT_NAME
having count(e.EMP_DEPT)>2
