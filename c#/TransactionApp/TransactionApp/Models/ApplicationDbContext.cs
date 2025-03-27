﻿using Microsoft.EntityFrameworkCore;

namespace TransactionApp.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Transaction1> Transactions { get; set; }
    }
}
