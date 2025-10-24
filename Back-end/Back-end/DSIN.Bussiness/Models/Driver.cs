namespace DSIN.Bussiness.Models;

public sealed class Driver
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = default!;
    public string Cnh { get; private set; } = default!;

    private Driver() { }
    public Driver(Guid id, string name, string cnh)
    {
        Id = id; Name = name;
        Cnh = cnh;
    }
}