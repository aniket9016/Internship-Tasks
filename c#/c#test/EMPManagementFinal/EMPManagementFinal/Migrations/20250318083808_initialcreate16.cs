using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EMPManagementFinal.Migrations
{
    /// <inheritdoc />
    public partial class initialcreate16 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Cities_CityId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Departments_DeptId",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "CityId",
                table: "Employees",
                newName: "CityID");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Employees",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "EmpName",
                table: "Employees",
                newName: "EmployeeName");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Employees",
                newName: "EmailAddress");

            migrationBuilder.RenameColumn(
                name: "DeptId",
                table: "Employees",
                newName: "DepartmentID");

            migrationBuilder.RenameColumn(
                name: "DOB",
                table: "Employees",
                newName: "DateOfBirth");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_CityId",
                table: "Employees",
                newName: "IX_Employees_CityID");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_DeptId",
                table: "Employees",
                newName: "IX_Employees_DepartmentID");

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "Employees",
                type: "nvarchar(15)",
                maxLength: 15,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "EmployeeName",
                table: "Employees",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "EmailAddress",
                table: "Employees",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Cities_CityID",
                table: "Employees",
                column: "CityID",
                principalTable: "Cities",
                principalColumn: "CityId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Departments_DepartmentID",
                table: "Employees",
                column: "DepartmentID",
                principalTable: "Departments",
                principalColumn: "DeptId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Cities_CityID",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Departments_DepartmentID",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "CityID",
                table: "Employees",
                newName: "CityId");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Employees",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "EmployeeName",
                table: "Employees",
                newName: "EmpName");

            migrationBuilder.RenameColumn(
                name: "EmailAddress",
                table: "Employees",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "DepartmentID",
                table: "Employees",
                newName: "DeptId");

            migrationBuilder.RenameColumn(
                name: "DateOfBirth",
                table: "Employees",
                newName: "DOB");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_CityID",
                table: "Employees",
                newName: "IX_Employees_CityId");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_DepartmentID",
                table: "Employees",
                newName: "IX_Employees_DeptId");

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(15)",
                oldMaxLength: 15);

            migrationBuilder.AlterColumn<string>(
                name: "EmpName",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(150)",
                oldMaxLength: 150);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Cities_CityId",
                table: "Employees",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "CityId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Departments_DeptId",
                table: "Employees",
                column: "DeptId",
                principalTable: "Departments",
                principalColumn: "DeptId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
