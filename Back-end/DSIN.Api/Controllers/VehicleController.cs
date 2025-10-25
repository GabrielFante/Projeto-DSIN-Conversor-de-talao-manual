using Microsoft.AspNetCore.Mvc;
using DSIN.Bussiness.Models;
using DSIN.Bussiness.Services;

namespace DSIN.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleController : Controller
    {
        private IVehicleService _vehicleService;

        public VehicleController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }
        [HttpGet(Name = "FindVehicleByPlate")]
        public IActionResult FindVehicleByPlate(Vehicle plate)
        {
            Vehicle vehicle = _vehicleService.FindVehicleByPlate(plate);
            return Ok(vehicle);
        }
    }
}