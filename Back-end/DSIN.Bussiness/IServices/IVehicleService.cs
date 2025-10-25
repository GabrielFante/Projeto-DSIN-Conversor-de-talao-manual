using DSIN.Bussiness.Models;

namespace DSIN.Bussiness.Services
{
    public interface IVehicleService
    {
        public Vehicle FindVehicleByPlate(string plate);
        Vehicle FindVehicleByPlate(Vehicle plate);
    }
}
