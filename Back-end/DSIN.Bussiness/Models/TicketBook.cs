namespace DSIN.Bussiness.Models;

public sealed class TicketBook
{
    public Guid Id { get; private set; }
    public Guid AgentId { get; private set; }
    public Guid DriverId { get; private set; }
    public Guid VehicleId { get; private set; }

    public string ViolationCode { get; private set; } = default!; // ex: “ESTACIONAR_FAIXA_AMARELA”
    public string ViolationDescription { get; private set; } = default!;
    public DateTimeOffset OccurredAt { get; private set; }
    public string? Location { get; private set; }

    public Agent? Agent { get; private set; }
    public Driver? Driver { get; private set; }
    public Vehicle? Vehicle { get; private set; }

    private TicketBook() { }
    public TicketBook(Guid id, Guid agentId, Guid driverId, Guid vehicleId,
                      string violationCode, string violationDescription,
                      DateTimeOffset occurredAt, string? location)
    {
        Id = id; AgentId = agentId;
        DriverId = driverId;
        VehicleId = vehicleId;
        ViolationCode = violationCode;
        ViolationDescription = violationDescription;
        OccurredAt = occurredAt;
        Location = location;
    }
}