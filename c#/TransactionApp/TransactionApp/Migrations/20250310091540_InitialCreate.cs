using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TransactionApp.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    TransactionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransactionAccountNumber = table.Column<string>(type: "varchar(14)", maxLength: 14, nullable: false),
                    TransactionBeneficiaryName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TransactionBankName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    BANKIFSCCode = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    TransactionAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TransactionDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.TransactionId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");
        }
    }
}
