using DSIN.Business.Interfaces.IRepositories;
using DSIN.Business.Models;
using DSIN.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DSIN.Data.Repositories;

public class VehicleRepository : IVehicleRepository
{
    private readonly TicketingDbContext _context;
    public VehicleRepository(TicketingDbContext context) => _context = context;

    public Task<Vehicle?> GetByPlateAsync(string plate, CancellationToken ct)
        => _context.Vehicles.FirstOrDefaultAsync(v => v.Plate == plate, ct);

    public async Task AddAsync(Vehicle vehicle, CancellationToken ct)
        => await _context.Vehicles.AddAsync(vehicle, ct);
}
