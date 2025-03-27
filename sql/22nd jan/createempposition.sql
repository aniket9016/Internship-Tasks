use assignment3
create table EmployeePosition(EmpID int foreign key references EmployeeInfo(EmpID),
EmpPosition nvarchar(50),DateOfJoining date,Salary bigint);