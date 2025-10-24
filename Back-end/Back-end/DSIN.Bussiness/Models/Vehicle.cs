namespace DSIN.Bussiness.Models;

public sealed class Vehicle
{
    public Guid Id { get; private set; }
    public string Plate { get; private set; } = default!;
    public string Model { get; private set; } = default!;
    public string Color { get; private set; } = default!;

    private Vehicle() { }

    public Vehicle(Guid id, string plate, string model, string color)
    {
        Id = id;
        Plate = plate;
        Model = model;
        Color = color;
    }
}