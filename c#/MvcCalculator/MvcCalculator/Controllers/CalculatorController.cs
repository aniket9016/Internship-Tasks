using System.Web.Mvc;
using MvcCalculator.Models;

namespace MvcCalculator.Controllers
{
    public class CalculatorController : Controller
    {
        public ActionResult Index()
        {
            return View(new CalculatorModel());
        }

        [HttpPost]
        public ActionResult Index(CalculatorModel model, string operation)
        {
            if (ModelState.IsValid)
            {
                model.Operation = operation; 

                switch (operation)
                {
                    case "+":
                        model.Result = model.Number1 + model.Number2;
                        break;
                    case "-":
                        model.Result = model.Number1 - model.Number2;
                        break;
                    case "*":
                        model.Result = model.Number1 * model.Number2;
                        break;
                    case "/":
                        model.Result = model.Number2 != 0 ? model.Number1 / model.Number2 : 0;
                        break;
                    default:
                        model.Result = 0;
                        break;
                }
            }
            return View(model);
        }
    }
}
