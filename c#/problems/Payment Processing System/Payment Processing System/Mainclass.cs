using System;

// Base class
class Payment
{
    public double Amount { get; set; }
    public string Recipient { get; set; }

    public Payment(double amount, string recipient)
    {
        Amount = amount;
        Recipient = recipient;
    }

    // Virtual method with parameters
    public virtual void ProcessPayment()
    {
        Console.WriteLine($"Processing payment of {Amount:C} to {Recipient}...");
    }
}

// Credit Card Payment
class CreditCardPayment : Payment
{
    public string CardNumber { get; set; }

    public CreditCardPayment(double amount, string recipient, string cardNumber)
        : base(amount, recipient)
    {
        CardNumber = cardNumber;
    }

    public override void ProcessPayment()
    {
        Console.WriteLine($"Processing Credit Card payment of {Amount:C} to {Recipient} using card {CardNumber}.");
    }
}

// PayPal Payment
class PayPalPayment : Payment
{
    public string PayPalEmail { get; set; }

    public PayPalPayment(double amount, string recipient, string email)
        : base(amount, recipient)
    {
        PayPalEmail = email;
    }

    public override void ProcessPayment()
    {
        Console.WriteLine($"Processing PayPal payment of {Amount:C} to {Recipient} using PayPal email {PayPalEmail}.");
    }
}

// UPI Payment
class UPIPayment : Payment
{
    public string UpiId { get; set; }

    public UPIPayment(double amount, string recipient, string upiId)
        : base(amount, recipient)
    {
        UpiId = upiId;
    }

    public override void ProcessPayment()
    {
        Console.WriteLine($"Processing UPI payment of {Amount:C} to {Recipient} using UPI ID {UpiId}.");
    }
}

class Program
{
    static void Main()
    {
        // Polymorphism: Different payment types using base class reference
        Payment payment1 = new CreditCardPayment(100.50, "Alice", "1234-5678-9876-5432");
        Payment payment2 = new PayPalPayment(75.25, "Bob", "bob@example.com");
        Payment payment3 = new UPIPayment(50.00, "Charlie", "charlie@upi");

        // Calling overridden methods dynamically
        payment1.ProcessPayment();
        payment2.ProcessPayment();
        payment3.ProcessPayment();
        Console.ReadLine();
    }
}
