using DSIN.Bussiness.Models;

namespace DSIN.Bussiness.Interfaces.IRepositories;

public interface IVehicleRepository
{
    Task<Vehicle?> GetByPlateAsync(string plate, CancellationToken ct);
    Task AddAsync(Vehicle vehicle, CancellationToken ct);
}