using System;

namespace Online_Banking_System
{
    public class Account
    {
        public string AccountHolder { get; set; }
        public string AccountType { get; set; }
        public decimal Balance { get; set; }

        public Account(string accountHolder, string accountType, decimal balance = 0)
        {
            AccountHolder = accountHolder;
            AccountType = accountType;
            Balance = balance;
        }

        public decimal GetBalance()
        {
            return Balance;
        }

        public string GetAccountDetails()
        {
            return $"Account Holder: {AccountHolder}, Account Type: {AccountType}, Balance: {Balance}";
        }

        public virtual void Deposit(decimal amount)
        {
            if (amount > 0)
            {
                Balance += amount;
                Console.WriteLine($"Deposited {amount}. New Balance: {Balance}");
            }
            else
            {
                Console.WriteLine("Deposit amount must be positive!");
            }
        }

        public virtual void Withdraw(decimal amount)
        {
            if (amount > 0)
            {
                if (Balance >= amount)
                {
                    Balance -= amount;
                    Console.WriteLine($"Withdrew {amount}. New Balance: {Balance}");
                }
                else
                {
                    Console.WriteLine("Insufficient funds!");
                }
            }
            else
            {
                Console.WriteLine("Withdrawal amount must be positive!");
            }
        }
    }

    public class SavingsAccount : Account
    {
        public SavingsAccount(string accountHolder, decimal balance = 0)
            : base(accountHolder, "Savings", balance)
        {
        }

        public override void Withdraw(decimal amount)
        {
            if (Balance - amount < 100)
            {
                Console.WriteLine("Cannot withdraw. Minimum balance of 100 required.");
            }
            else
            {
                base.Withdraw(amount);
            }
        }
    }

    public class CurrentAccount : Account
    {
        public decimal OverdraftLimit { get; set; }

        public CurrentAccount(string accountHolder, decimal balance = 0, decimal overdraftLimit = 500)
            : base(accountHolder, "Current", balance)
        {
            OverdraftLimit = overdraftLimit;
        }

        public override void Withdraw(decimal amount)
        {
            if (Balance + OverdraftLimit >= amount)
            {
                Balance -= amount;
                Console.WriteLine($"Withdrew {amount}. New Balance: {Balance}. Overdraft limit left: {OverdraftLimit + Balance}");
            }
            else
            {
                Console.WriteLine($"Cannot withdraw. The amount exceeds the available balance and overdraft limit.");
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to the Online Banking System!");

            Console.Write("Enter your name: ");
            string accountHolder = Console.ReadLine();

            Console.Write("Enter account type (Savings/Current): ");
            string accountType = Console.ReadLine().Trim();

            decimal initialBalance = 0;
            while (true)
            {
                Console.Write("Enter initial balance: ");
                if (decimal.TryParse(Console.ReadLine(), out initialBalance) && initialBalance >= 0)
                    break;
                else
                    Console.WriteLine("Please enter a valid initial balance.");
            }

            Account account;

            if (accountType.Equals("Savings", StringComparison.OrdinalIgnoreCase))
            {
                account = new SavingsAccount(accountHolder, initialBalance);
            }
            else if (accountType.Equals("Current", StringComparison.OrdinalIgnoreCase))
            {
                Console.Write("Enter overdraft limit: ");
                decimal overdraftLimit = Convert.ToDecimal(Console.ReadLine());
                account = new CurrentAccount(accountHolder, initialBalance, overdraftLimit);
            }
            else
            {
                Console.WriteLine("Invalid account type. Exiting.");
                return;
            }

            while (true)
            {
                Console.WriteLine("\nSelect an option:");
                Console.WriteLine("1. View Account Details");
                Console.WriteLine("2. Deposit");
                Console.WriteLine("3. Withdraw");
                Console.WriteLine("4. Exit");
                Console.Write("Enter your choice (1-4): ");

                string choice = Console.ReadLine();

                switch (choice)
                {
                    case "1":
                        Console.WriteLine(account.GetAccountDetails());
                        break;

                    case "2":
                        Console.Write("Enter the amount to deposit: ");
                        decimal depositAmount = Convert.ToDecimal(Console.ReadLine());
                        account.Deposit(depositAmount);
                        break;

                    case "3":
                        Console.Write("Enter the amount to withdraw: ");
                        decimal withdrawAmount = Convert.ToDecimal(Console.ReadLine());
                        account.Withdraw(withdrawAmount);
                        break;

                    case "4":
                        Console.WriteLine("Exiting the system...");
                        return;

                    default:
                        Console.WriteLine("Invalid choice. Please select a valid option.");
                        break;
                }
            }
        }
    }
}
