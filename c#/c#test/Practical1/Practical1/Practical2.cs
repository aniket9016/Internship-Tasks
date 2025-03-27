using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PracticalTest
{
    //SRP
    interface IProductService
    {
        void AddProduct(Product product);
        void UpdateProduct(int id, Product product);
        void DeleteProduct(int id);
        void DisplayProducts();
    }
    // OCP
    abstract class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal BasePrice { get; set; }
        public abstract string Category { get; }
        public abstract decimal GetPrice();
    }
    // LSP
    class Electronics : Product
    {
        public override string Category => "Electronics";
        public override decimal GetPrice() => BasePrice * 1.15m;
    }
    class Clothing : Product
    {
        public override string Category => "Clothing";
        public override decimal GetPrice() => BasePrice * 1.10m; 
    }
    class Groceries : Product
    {
        public override string Category => "Groceries";
        public override decimal GetPrice() => BasePrice; 
    }
    //DIP
    class ProductService : IProductService
    {
        private readonly List<Product> _products = new List<Product>();

        public void AddProduct(Product product)
        {
            _products.Add(product);
            Console.WriteLine("Product added successfully.");
        }
        public void UpdateProduct(int id, Product updatedProduct)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product != null)
            {
                product.Name = updatedProduct.Name;
                product.BasePrice = updatedProduct.BasePrice;
                Console.WriteLine("Product updated successfully.");
            }
            else
            {
                Console.WriteLine("Product not found.");
            }
        }
        public void DeleteProduct(int id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product != null)
            {
                _products.Remove(product);
                Console.WriteLine("Product deleted successfully.");
            }
            else
            {
                Console.WriteLine("Product not found.");
            }
        }
        public void DisplayProducts()
        {
            foreach (var product in _products)
            {
                Console.WriteLine($"ID: {product.Id}, Name: {product.Name}, Category: {product.Category}, Price: {product.GetPrice()}");
            }
        }
    }
    class Practical2
    {
        static void Main()
        {
            IProductService productService = new ProductService();
            while (true)
            {
                Console.WriteLine("\n1. Add Product\n2. Update Product\n3. Delete Product\n4. Display Products\n5. Exit");
                Console.Write("Choose an option: ");
                int choice = int.Parse(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        Console.Write("Enter Product ID: ");
                        int id = int.Parse(Console.ReadLine());
                        Console.Write("Enter Product Name: ");
                        string name = Console.ReadLine();
                        Console.Write("Enter Base Price: ");
                        decimal price = decimal.Parse(Console.ReadLine());
                        Console.Write("Enter Category (1. Electronics, 2. Clothing, 3. Groceries): ");
                        int category = int.Parse(Console.ReadLine());

                        Product product;
                        if (category == 1)
                            product = new Electronics { Id = id, Name = name, BasePrice = price };
                        else if (category == 2)
                            product = new Clothing { Id = id, Name = name, BasePrice = price };
                        else if (category == 3)
                            product = new Groceries { Id = id, Name = name, BasePrice = price };
                        else
                        {
                            Console.WriteLine("Invalid category!");
                            break;
                        }

                        productService.AddProduct(product);
                        break;
                    case 2:
                        Console.Write("Enter Product ID to update: ");
                        int updateId = int.Parse(Console.ReadLine());
                        Console.Write("Enter New Name: ");
                        string newName = Console.ReadLine();
                        Console.Write("Enter New Base Price: ");
                        decimal newPrice = decimal.Parse(Console.ReadLine());

                        productService.UpdateProduct(updateId, new Electronics { Id = updateId, Name = newName, BasePrice = newPrice });
                        break;
                    case 3:
                        Console.Write("Enter Product ID to delete: ");
                        int deleteId = int.Parse(Console.ReadLine());
                        productService.DeleteProduct(deleteId);
                        break;
                    case 4:
                        productService.DisplayProducts();
                        break;
                    case 5:
                        return;
                    default:
                        Console.WriteLine("Invalid choice! Try again.");
                        break;
                }
            }
        }
    }
}